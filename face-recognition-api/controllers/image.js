const Clarifai = require("clarifai");
const client = require("../configs/db");

const app = new Clarifai.App({
  apiKey: process.env.CLARIFAI_API_KEY,
});

exports.handleApiCall = (req, res) => {
  app.models
    .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => res.status(400).json({ error: "Unable to work with API" }));
};

exports.handleImage = (req, res) => {
  const { id } = req.body;

  client
    .query(`SELECT * FROM users WHERE id = '${id}';`)
    .then((data) => {
      isValid = data.rows;
      if (isValid.length !== 0) {
        isValid[0].password = null;
        console.log(Number(isValid[0].entries));
        isValid[0].entries = Number(isValid[0].entries) + 1;
        console.log(isValid[0].entries);
        client
          .query(
            `UPDATE users SET entries='${isValid[0].entries}' WHERE id = '${id}';`
          )
          .then((data) => {
            res.status(200).json(isValid[0].entries);
          })
          .catch((err) => {
            res.status(400).json({
              message: "Database error occured while updating entries",
            });
          });
      } else {
        res.status(400).json({ error: "Database error occurred finding user" });
      }
    })
    .catch((err) => res.status(400).json({ error: "error getting user" }));
};
