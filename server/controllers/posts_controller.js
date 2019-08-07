const getPostsByUserId = async (req, res, next) => {
  const db = req.app.get("db");
  const { id } = req.session.user;
  db.get_posts([id])
    .then(posts => {
      res.json(posts);
    })
    .catch(err => console.log(err));
};

const getPostsByProfile = async (req, res, next) => {
  const db = req.app.get("db");
  const { username } = req.params;
  db.get_profile_posts([username])
    .then(posts => {
      res.json(posts);
    })
    .catch(err => console.log(err));
};

const getAllPosts = async (req, res, next) => {
  const db = req.app.get("db");
  // const { id } = req.session.user;
  db.get_all_posts()
    .then(posts => {
      res.json(posts);
    })
    .catch(err => console.log(err));
};

const createPost = async (req, res, next) => {
  const db = req.app.get("db");
  const { image_url, content, title } = req.body;
  const { id } = req.session.user;

  const userPost = await db.create_post([id, image_url, content, title]);
  res.status(200).json(userPost);
};

const getPost = async (req, res, next) => {
  const db = req.app.get("db");
  const { id } = req.params;
  const results = await db.get_post([id]);
  res.status(200).json(results);
};

const deletePost = async (req, res, next) => {
  const db = req.app.get("db");
  const { id } = req.params;

  db.delete_post(id)
    .then(posts => res.status(200).json(posts))
    .catch(err => {
      res.status(500).send({ errorMessage: "Can't delete post." });
      console.log(err);
    });
};

const editPost = (req, res, next) => {
  const db = req.app.get("db");
  const { params, body } = req;

  console.log(body);

  db.change_post([params.id, body.image_url, body.content, body.title])
    .then(post => {
      console.log(post);
      res.status(200).json(post);
    })
    .catch(err => {
      res.status(500).send({ errorMessage: "Can't update, bro." });
      console.error(err);
    });
};

module.exports = {
  getPostsByUserId,
  createPost,
  getPost,
  deletePost,
  getAllPosts,
  getPostsByProfile,
  editPost
};
