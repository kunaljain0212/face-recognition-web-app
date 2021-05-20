require("./configs/dotenv");
const express = require("express");
const cors = require("cors");
const client = require("./configs/db");
const authRoutes = require("./routes/auth");
const imageRoutes = require("./routes/image");

const app = express();

app.use(express.json());
app.use(cors());

const port = process.env.PORT || 8000;

client.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Connected to database!");
  }
});

app.get("/", (req, res) => {
  res.send("It is working!!");
});
app.use("/auth", authRoutes);
app.use("/image", imageRoutes);
// app.post("/signin", (req, res) => {
//   signin.handleSignin(req, res, bcrypt, db);
// });
// app.post("/register", (req, res) => {
//   register.handleRegister(req, res, bcrypt, db);
// });
// app.get("/profile/:id", (req, res) => {
//   profile.handleProfile(req, res, db);
// });
// app.put("/image", (req, res) => {
//   image.handleImage(req, res, db);
// });
// app.post("/imageurl", (req, res) => {
//   image.handleApiCall(req, res);
// });

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
