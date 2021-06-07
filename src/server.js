const express = require('express');
const app = express();
const { Cluster } = require('puppeteer-cluster');
const delay = require('delay');

(async () => {
    const cluster = await Cluster.launch({
        concurrency: Cluster.CONCURRENCY_CONTEXT,
        maxConcurrency: 2,
    });

    const generatePdf = async ({ page, data }) => {

        console.log('url = ',data.url)
        await page.goto(data.url);

        if(data.waitFor)
        {
            await page.waitForSelector('#'+data.waitFor, {visible: true})
        }
       
        const pdf = await page.pdf({ format: 'A4' });

        let response = {
            code: 200,
            headers: {
                
                    'Content-Type': 'application/pdf',
                    'Content-Length': pdf.length
                
            },
            buffer: pdf
        }
        return response;
    };

    const generateScreenshot = async ({ page, data }) => {

        console.log('url = ',data.url)
        await page.goto(data.url);

        if(data.waitFor)
        {
            await page.waitForSelector('#'+data.waitFor, {visible: true})
        }
       
        const screen = await page.screenshot();

        let response = {
            code: 200,
            headers: {
                
                    'Content-Type': 'image/jpg',
                    'Content-Length': screen.length
                
            },
            buffer: screen

        }
        return response;
    };

    // setup server
    app.get('/image', async function (req, res) {
        if (!req.query.url) {
            return res.end('Please specify url like this: ?url=https://example.com');
        }
        try {
            const response = await cluster.execute({url: req.query.url, waitFor: req.query.waitFor}, generateScreenshot);

            console.log('send response')

            res.writeHead(response.code, response.headers);
            res.end(response.buffer);
        } catch (err) {
            // catch error
            res.end('Error: ' + err);
        }
    });

    app.get('/pdf', async function (req, res) {
        if (!req.query.url) {
            return res.end('Please specify url like this: ?url=https://example.com');
        }
        try {
            const response = await cluster.execute({url: req.query.url, waitFor: req.query.waitFor}, generatePdf);

            console.log('send response')

            res.writeHead(response.code, response.headers);
            res.end(response.buffer);
        } catch (err) {
            // catch error
            res.end('Error: ' + err);
        }
    });

    app.listen(3000, function () {
        console.log('Screenshot server listening on port 3000.');
    });
})();