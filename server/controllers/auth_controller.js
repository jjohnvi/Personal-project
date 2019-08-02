const bcrypt = require("bcryptjs");

const registerUser = async (req, res, next) => {
  const { username, firstname, lastname, password } = req.body;
  const db = req.app.get("db");

  const checkedUser = await db.get_user([username]);
  if (checkedUser.length === 0) {
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    const user = await db.create_user([
      username,
      firstname,
      lastname,
      hashedPassword
    ]);

    req.session.user = {
      username,
      firstname,
      lastname
    };
    res.json(user);
  } else {
    res.status(409).json({ error: "Username taken, please try another." });
  }
};

const getUsers = async (req, res, next) => {
  const db = req.app.get("db");
  db.get_users()
    .then(users => {
      res.json(users);
    })
    .catch(err => console.log(err));
};

const loginUser = async (req, res, next) => {
  const db = req.app.get("db");
  const { username, password, firstname, lastname } = req.body;

  const checkedUser = await db.get_user([username]);
  if (checkedUser.length === 0) {
    res.status(401).json({ error: "Wrong username and password." });
  }
  console.log(checkedUser);

  const isMatching = await bcrypt.compare(password, checkedUser[0].password);

  if (isMatching) {
    req.session.user = {
      username,
      firstname,
      lastname
    };
    return res.json(req.session.user);
  } else {
    return res.status(403).json({ error: "Wrong username and password." });
  }
};

const logoutUser = async (req, res) => {
  req.session.destroy();
  console.log(req.session);
  return res.sendStatus(200);
};

module.exports = {
  registerUser,
  getUsers,
  loginUser,
  logoutUser
};
