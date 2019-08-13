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

const updatePic = (req, res, next) => {
  const db = req.app.get("db");
  const { id } = req.session.user;
  const { body } = req;

  db.update_pic([id, body.profile_pic])
    .then(picture => {
      res.status(200).json(picture);
    })
    .catch(err => {
      res.status(500).send({ error: "Can't update picture." });
      console.log(err);
    });
};

const getUserBio = (req, res, next) => {
  const db = req.app.get("db");
  const { username } = req.params;

  db.get_user_bio(username)
    .then(bio => {
      res.json(bio);
    })
    .catch(err => console.log(err));
};

const editUserBio = (req, res, next) => {
  const db = req.app.get("db");
  const { params, body } = req;

  db.update_user_bio([params.id, body.bio])
    .then(bio => {
      res.status(200).json(bio);
    })
    .catch(err => {
      res.status(500).send({ errorMessage: "Can't update the bio. " });
      console.log(err);
    });
};

module.exports = { getUsers, getUserId, updatePic, getUserBio, editUserBio };
