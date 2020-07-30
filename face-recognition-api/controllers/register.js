const handleRegister = (req, res, bcrypt, db) => {
  const { email, password, name } = req.body;
  if (!email || !name || !password) {
    return res.status(400).json('Incorrect form submission')
  }
  const hash = bcrypt.hashSync(password);
  
  db.transaction((trx) => {
    trx
      .insert({
        hash: hash,
        email: email,
      })
      .into("login")
      .returning("email")
      .then((loginEmail) => {
        return trx("users")
          .returning("*")
          .insert({
            email: loginEmail[0],
            name: name,
            joined: new Date(),
          })
          .then((user) => {
            // console.log(user[0]);
            res.json(user[0]);
          });
      })
      .then(trx.commit)
      .catch(trx.rollback);
  }).catch((err) => res.status(400).json(console.log(err)));
};

module.exports = {
  handleRegister: handleRegister,
};
