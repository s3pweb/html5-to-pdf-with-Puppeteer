# html5-to-pdf-with-Puppeteer

Convert HTML5 page to pdf or image with Puppeteer

## Start the server for production

node index.js

## Start the server for developpement

DEBUG=html5-to-pdf node index.js

node test/test-pdf.js

```js
let fetch = require("node-fetch");
let fs = require("fs");

let start = async () => {
  let paramsImage = {
    format: "pdf",
    html: fs.readFileSync(__dirname + "/test.html").toString(),
    waitFor: "dynamic-form",
  };

  fetch("http://0.0.0.0:80/v1/generate", {
    headers: {
      accept: "*/*",
      "content-type": "application/json",
    },
    body: JSON.stringify(paramsImage),
    method: "POST",
  }).then((res) => {
    const dest = fs.createWriteStream(__dirname + "/output.pdf");
    res.body.pipe(dest);

    res.body.on("end", () => console.log("it worked"));
    dest.on("error", (error) => console.log("error", error));
  });
};

start();
```

node test/test-image.js

## DOCKER MODE

docker build . -t html5-to-pdf-with-puppeteer
docker run -p 15001:80 html5-to-pdf-with-puppeteer

swagger : http://localhost:15001/swagger

##
