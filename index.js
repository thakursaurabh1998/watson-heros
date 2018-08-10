const VisualRecognitionV3 = require("watson-developer-cloud/visual-recognition/v3");
const fs = require("fs");
const config = require("./config")

const visualRecognition = new VisualRecognitionV3({
  url: config.url,
  version: config.version,
  iam_apikey: config.apikey
});

const params = {
  classifier_ids: ["marvel_vs_dc_1889700289"],
  images_file: fs.createReadStream("./i.jpg")
};

visualRecognition.classify(params, function(error, response) {
  if (!error) {
    const stringresponse = JSON.stringify(response, null, 2);
    console.log(stringresponse);
  } else {
    console.log("Error: " + error);
  }
});

module.exports = {
    visualRecognition
}