let fetch = require("node-fetch");
let fs = require("fs");

let start = async () => {
  let paramsImage = {
    format: "image",
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
    const dest = fs.createWriteStream(__dirname + "/output.jpg");
    res.body.pipe(dest);

    res.body.on("end", () => console.log("it worked"));
    dest.on("error", (error) => console.log("error", error));
  });
};

start();
