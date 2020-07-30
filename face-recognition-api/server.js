const express = require("express");
const bodyParser = require("body-parser");
const { json } = require("body-parser");
const bcrypt = require("bcryptjs");
const cors = require("cors");
const knex = require("knex");
const { response } = require("express");
const register = require("./controllers/register");
const signin = require("./controllers/signin");
const profile = require("./controllers/profile");
const image = require("./controllers/image");

const db = knex({
  client: "pg",
  connection: {
    host: "ec2-52-22-216-69.compute-1.amazonaws.com",
    user: "obyhssnchuewwx",
    password:
      "d3a028f0067317adbb9311033a1a986e1fcdfe30b4dc145b2b52e8c85cd089bb",
    database: "ddj0fdg8hme593",
    ssl: {
      rejectUnauthorized: false,
    },
  },
  connectionPassthrough: true,
});

// db.select('*').from('users')
// .then(data => {
// console.log(data);
// })

const app = express();
app.use(json()); //if not destructured above (bodyParser.json())
app.use(cors());

app.get("/", (req, res) => {
  res.send("It is working!!");
});
app.post("/signin", (req, res) => {
  signin.handleSignin(req, res, bcrypt, db);
});
app.post("/register", (req, res) => {
  register.handleRegister(req, res, bcrypt, db);
});
app.get("/profile/:id", (req, res) => {
  profile.handleProfile(req, res, db);
});
app.put("/image", (req, res) => {
  image.handleImage(req, res, db);
});
app.post("/imageurl", (req, res) => {
  image.handleApiCall(req, res);
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`running on port ${process.env.PORT}...`);
});
