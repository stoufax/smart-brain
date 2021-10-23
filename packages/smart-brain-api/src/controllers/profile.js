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
  const { name } = req.body;

  db.transaction((trx) => {
    trx
      .update('name', name)
      .where('id', id)
      .from('users')
      .then(trx.commit)
      .then((user) => res.json(user[0]))
      .catch(trx.rollback);
  }).catch((error) => {
    console.log(`error =>`, error);
    res.status(400).json('UNABLE TO UPDATE PROFILE');
  });
};

module.exports = {
  getProfile,
  updateProfile
};
