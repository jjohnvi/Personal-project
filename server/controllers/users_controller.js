const getUsers = (req, res, next) => {
  const db = req.app.get("db");
  const { username } = req.query;

  db.get_users(`%${username}%`)
    .then(users => {
      res.json(users);
    })
    .catch(err => console.log(err));
};

const getUserId = (req, res, next) => {
  const db = req.app.get("db");
  const { username } = req.params;

  db.get_user_id(username)
    .then(id => {
      res.json(id);
    })
    .catch(err => console.log(err));
};

module.exports = { getUsers, getUserId };
