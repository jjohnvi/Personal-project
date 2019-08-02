const getPosts = async (req, res, next) => {
  const db = req.app.get("db");
  db.get_posts()
    .then(posts => {
      res.json(posts);
    })
    .catch(err => console.log(err));
};

const createPost = async (req, res, next) => {
  const db = req.app.get("db");
  const { image_url, content, title, date } = req.body;
  const { id } = req.session.user;

  const userPost = await db.create_post([image_url, content, title, date], id);
  res.status(200).json(userPost);
};

const getPost = async (req, res, next) => {
  const db = req.app.get("db");
  const { id } = req.session.user;
  const results = await db.get_post(id);
  res.status(200).json(results);
};

module.exports = { getPosts, createPost, getPost };
