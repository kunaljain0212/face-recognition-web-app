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

// const handleSignin = (req, res, bcrypt, db) => {
//   const { email, password } = req.body;
//   if (!email || !password) {
//     return res.status(400).json("Incorrect form submission");
//   }
//   db.select("email", "hash")
//     .from("login")
//     .where("email", "=", email)
//     .then((data) => {
//       const isValid = bcrypt.compareSync(password, data[0].hash);
//       if (isValid) {
//         return db
//           .select("*")
//           .from("users")
//           .where("email", "=", email)
//           .then((user) => {
//             // console.log(user[0]);
//             res.json(user[0]);
//           })
//           .catch((err) => res.status(400).json("Unable to get user"));
//       } else {
//         res.status(400).json("Wrong Credentials");
//       }
//     })
//     .catch((err) => res.status(400).json("Wrong Credentials"));
// };
