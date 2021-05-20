const bcrypt = require("bcrypt");
const client = require("../configs/db");

exports.handleRegister = (req, res) => {
  const { email, password, name } = req.body;

  if (!email || !name || !password) {
    return res.status(400).json({ message: "Incorrect form submission" });
  }
  client
    .query(`SELECT * FROM users WHERE email = '${email}';`)
    .then((data) => {
      isValid = data.rows;
      if (isValid.length !== 0) {
        res.status(400).json({
          error: "User already exists.",
        });
      } else {
        bcrypt.hash(password, 10, (err, hash) => {
          if (err) {
            res.status(500).json({
              error: "Internal server error.",
            });
          } else {
            const user = {
              name,
              email,
              password: hash,
            };

            client
              .query(
                `INSERT INTO users (name, email, password) VALUES ('${user.name}', '${user.email}' , '${user.password}');`
              )
              .then((data) => {
                client
                  .query(`SELECT * FROM users WHERE email = '${email}';`)
                  .then((data) => {
                    res.status(200).json(data.rows[0]);
                  })
                  .catch((err) => res.status(400).json(err));
              })
              .catch((err) => {
                res.status(500).json({
                  error: "Database error occurred!",
                });
              });
          }
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        error: "Database error occurred!",
      });
    });
};

exports.handleSignin = (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Incorrect form submission" });
  }
  client
    .query(`SELECT * FROM users WHERE email = '${email}';`)
    .then((data) => {
      userData = data.rows;
      if (userData.length === 0) {
        res.status(400).json({
          error: "User does not exist, signup instead!",
        });
      } else {
        bcrypt.compare(password, userData[0].password, (err, result) => {
          if (err) {
            res.status(500).json({
              error: "Server error!",
            });
          } else if (result === true) {
            userData[0].password = null;
            res.status(200).json(userData[0]);
          } else {
            res.status(400).json({
              error: "Enter correct password!",
            });
          }
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        error: "Database error occurred!",
      });
    });
};

exports.handleProfile = (req, res) => {
  const { id } = req.params;
  client
    .query(`SELECT * FROM users WHERE id = '${id}';`)
    .then((data) => {
      isValid = data.rows;
      if (isValid.length !== 0) {
        isValid[0].password = null;
        res.status(200).json(isValid[0]);
      } else {
        res.status(400).json({ error: "Database error occurred" });
      }
    })
    .catch((err) => res.status(400).json({ error: "error getting user" }));
};
