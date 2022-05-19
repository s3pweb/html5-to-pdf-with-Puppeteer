let fetch = require("node-fetch");
let fs = require("fs");
let Mustache = require("mustache");

let start = async () => {
  let html = fs.readFileSync(__dirname + "/test.html").toString();
  let json = fs.readFileSync(__dirname + "/test.json").toString();

  let htmlWithJson = Mustache.render(html, { params: json });

  let paramsImage = {
    format: "pdf",
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
    const dest = fs.createWriteStream(__dirname + "/output.pdf");
    res.body.pipe(dest);

    res.body.on("end", () => console.log("it worked"));
    dest.on("error", (error) => console.log("error", error));
  });
};

start();
