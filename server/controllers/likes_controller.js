const addLike = async (req, res) => {
  const db = req.app.get("db");
  const { id } = req.session.user;
  const { post_id } = req.params;

  await db.check_likes([id, post_id]).then(like => {
    if (like.length > 0) {
      db.unlike_post([id, post_id]).then(() => {
        res.json({ liked: false });
      });
    } else {
      db.like_post([id, post_id]).then(() => {
        res.json({ liked: true });
      });
    }
  });
};

const getLikesForPost = (req, res) => {
  const db = req.app.get("db");
  const { id } = req.session.user;
  const { post_id } = req.params;

  db.get_likes_post([post_id]).then(likes => {
    console.log(likes);
    db.check_likes([id, post_id]).then(like => {
      if (like.length > 0) {
        res.json({ liked: true, likes: likes });
      } else {
        res.json({ liked: false, likes: likes });
      }
    });
  });
};

const getLikes = (req, res) => {
  const db = req.app.get("db");

  db.get_likes().then(likes => res.json(likes));
};

module.exports = {
  addLike,
  getLikesForPost,
  getLikes
};
