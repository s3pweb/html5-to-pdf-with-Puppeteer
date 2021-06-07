let fetch = require('node-fetch')
let fs = require('fs')

const AbortController = require("abort-controller")

const controller = new AbortController();
const timeout = setTimeout(
  () => { controller.abort(); },
  20000,
);

let paramsImage = {
    format: 'image',
    html: fs.readFileSync('test.html').toString()
}

fetch("http://0.0.0.0:3000/v1/generate", {
    "headers": {
        "accept": "*/*",
        "content-type": "application/json"
    },
    "body": JSON.stringify(paramsImage),
    "method": "POST"
}).then(res => {
    const dest = fs.createWriteStream('./image.jpg');
    res.body.pipe(dest);
});


let paramsPdf = {
    format: 'pdf',
    html: fs.readFileSync('test.html').toString(),
    waitFor: 'firstParagrap1'
}

fetch("http://0.0.0.0:3000/v1/generate", {
    signal: controller.signal,
    "headers": {
        "accept": "*/*",
        "content-type": "application/json"
    },
    "body": JSON.stringify(paramsPdf),
    "method": "POST"
}).then(res => {
    const dest = fs.createWriteStream('./image.pdf');
    res.body.pipe(dest);
});