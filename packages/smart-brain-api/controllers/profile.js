const getProfile = (req, res, db) => {
  const { id } = req.params;
  db.select('*')
    .from('users')
    .where({ id })
    .then((user) => {
      1;
      if (user.length) {
        res.json(user);
      } else {
        res.status(400).json('no user found');
      }
    })
    .catch(() => res.status(400).json('error user'));
};

const updateProfile = (req, res, db) => {
  const { id } = req.params;
  const { name, email } = req.body;
  db.transaction((trx) => {
    trx
      .select('*')
      .from('login')
      .where({ id })
      .update({ email }, ['*'])
      .returning('email')
      .then((loginEmail) => {
        return db('users')
          .where({ id })
          .update({ email: loginEmail[0], name })
          .then((user) => res.json(user[0]));
      })
      .then(trx.commit)
      .catch(trx.rollback);
  }).catch(() => res.status(400).json('UNABLE TO UPDATE PROFILE'));
};

module.exports = {
  getProfile,
  updateProfile
};
