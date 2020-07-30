const Clarifai = require("clarifai");

const app = new Clarifai.App({
  apiKey: "c3c35a0bc14c47f8b14d3bee023b543c",
});

const handleApiCall = (req, res) => {
  app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
  .then(data => {
    // console.log(data);
    res.json(data)
  })
  .catch(err => res.status(400).json('Unable to work with API'))
};

const handleImage = (req, res, db) => {
  const { id } = req.body;
  db("users")
    .where("id", "=", id)
    .increment("entries", 1)
    .returning("entries")
    .then((entries) => {
      res.json(entries[0]);
    })
    .catch((err) => res.status(400).json("Could not update"));
};

module.exports = {
  handleImage: handleImage,
  handleApiCall: handleApiCall,
};
