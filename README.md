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
let Mustache = require("mustache");

let start = async () => {
  let html = fs.readFileSync(__dirname + "/test.html").toString();
  let json = fs.readFileSync(__dirname + "/test.json").toString();

  let htmlWithJson = Mustache.render(html, { params: json });

  let paramsImage = {
    format: "image",
    html: htmlWithJson,
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
    const dest = fs.createWriteStream(__dirname + "/output.jpg");
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
docker run -p 80:80 html5-to-pdf-with-puppeteer

swagger : http://localhost:80/swagger

test : node test/test-image.js

##
