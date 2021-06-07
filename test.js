let fetch = require('node-fetch')
let fs = require('fs')

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
    waitFor: 'firstParagrap'
}

fetch("http://0.0.0.0:3000/v1/generate", {
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