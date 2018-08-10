require("./config");
const express = require("express");
const bodyParser = require("body-parser");
const VisualRecognitionV3 = require("watson-developer-cloud/visual-recognition/v3");
const details = require("./details");
const visualRecognition = new VisualRecognitionV3({
  url: details.url,
  version: details.version,
  iam_apikey: details.apikey
});

let app = express();

app.use((req, res, next) => {
  const now = new Date().toString();

  console.log(`${now} ${req.method} ${req.url}`);
  next();
});

app.use(bodyParser.json());

app.post("/comic", (req, res) => {
  const params = {
    url: req.body.heroURL,
    classifier_ids: "marvel_vs_dc_1889700289",
    threshold: 0.5
  };

  visualRecognition.classify(params, (err, response) => {
    if (!err) {
      res.status(200).send(response);
    } else {
      res.status(404).send(err);
    }
  });
});

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
