const getUsers = async (req, res, next) => {
  const db = req.app.get("db");
  const { username } = req.query;

  db.get_users(`%${username}%`)
    .then(users => {
      res.json(users);
    })
    .catch(err => console.log(err));
};

module.exports = { getUsers };
