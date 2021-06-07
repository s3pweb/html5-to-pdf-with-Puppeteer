let fetch = require('node-fetch')
let fs = require('fs')

let paramsImage = {
    format: 'image',
    html: '<!DOCTYPE html> <html> <body> <h1>First Heading</h1> <p>First paragraph.</p></body> </html>'
}



fetch("http://localhost:3000/v1/generate", {
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
    html: '<!DOCTYPE html> <html> <body> <h1>First Heading</h1> <p>First paragraph.</p></body> </html>'
}

fetch("http://localhost:3000/v1/generate", {
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