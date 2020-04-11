const handleProfile = (req, res, db) => {
  const { id } = req.params
  db.select('*')
    .from('users')
    .where({ id })
    .then((user) => {
      1
      if (user.length) {
        res.json(user)
      } else {
        res.status(400).json('no user found')
      }
    })
    .catch((err) => res.status(400).json('error user'))
}

module.exports = {
  handleProfile: handleProfile
}
