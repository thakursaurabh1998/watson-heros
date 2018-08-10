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
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.post("/comic", (req, res) => {
  const params = {
    url: req.body.heroURL,
    classifier_ids: "marvel_vs_dc_1889700289",
    threshold: 0.5
  };
  // const temp = `{"images":[{"classifiers":[{"classifier_id":"marvel_vs_dc_1889700289","name":"marvel_vs_dc","classes":[{"class":"dc","score":0.918}]}],"source_url":"https://i1.wp.com/batman-news.com/wp-content/uploads/2015/06/aquaman.jpg?resize=696%2C1043&quality=80&strip=info&ssl=1","resolved_url":"https://i1.wp.com/batman-news.com/wp-content/uploads/2015/06/aquaman.jpg?resize=696%252C1043&quality=80&strip=info&ssl=1"}],"images_processed":1,"custom_classes":2}`
  // res.status(200).send(JSON.parse(temp));

  visualRecognition.classify(params, (err, response) => {
    if (!err) {
      res.status(200).send(response);
    } else {
      res.status(404).send(err);
    }
  });
});

let port = process.env.PORT;
// port = 4000;

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
