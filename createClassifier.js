var VisualRecognitionV3 = require("watson-developer-cloud/visual-recognition/v3");
var fs = require("fs");

var visualRecognition = new VisualRecognitionV3({
  url: "https://gateway.watsonplatform.net/visual-recognition/api",
  version: "2018-03-19",
  iam_apikey: "EVjVNF4ztQ4gqT3DY9RWV5Z73Tlonemsa93YVK7ANFQI"
});

var params = {
  classifier_ids: ["marvel_vs_dc_1889700289"],
  name: "marvel_vs_dc",
  dc_positive_examples: fs.createReadStream("./dc.zip"),
  marvel_positive_examples: fs.createReadStream("./marvel.zip")
};

visualRecognition.createClassifier(params, (err, res) => {
  if (err) console.log(err);
  else console.log(JSON.stringify(response, null, 2));
  console.log(res);
});
