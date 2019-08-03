const getPostsByUserId = async (req, res, next) => {
  const db = req.app.get("db");
  const { id } = req.session.user;
  db.get_posts([id])
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

module.exports = { getPostsByUserId, createPost, getPost };
