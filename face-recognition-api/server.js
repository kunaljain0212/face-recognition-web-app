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
    host: "john.db.elephantsql.com",
    user: "wnjxqejh",
    password:
      "1BZ4GEl_Gjj_3rSS7UyLCrjSboSxB8ZC",
    database: "wnjxqejh",
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

app.listen(3001, () => {
  console.log(`running on port ${process.env.PORT}...`);
});
