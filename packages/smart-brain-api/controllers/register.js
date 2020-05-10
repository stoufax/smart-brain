const handleRegister = (req, res, db, bcrypt, saltRounds) => {
  const { name, email, password } = req.body
  const salt = bcrypt.genSaltSync(saltRounds)
  const hash = bcrypt.hashSync(password, salt)
  if (!name || !email || !password) {
    return res.status(400).json('incorrect submission')
  }
  db.transaction((trx) => {
    trx
      .insert({
        hash: hash,
        email: email
      })
      .into('login')
      .returning('email')
      .then((loginEmail) => {
        return db('users')
          .returning('*')
          .insert({ name, email: loginEmail[0], joined: new Date() })
          .then((user) => res.json(user[0]))
      })
      .then(trx.commit)
      .catch(trx.rollback)
  }).catch(() => res.status(400).json('UNABLE TO REGISTER'))
}

module.exports = {
  handleRegister: handleRegister
}
