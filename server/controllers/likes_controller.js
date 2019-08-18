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

const getLikes = async (req, res) => {
  const db = req.app.get("db");
  const { id } = req.session.user;
  const posts = await db.get_likes();

  //map through each post
  let newResponse = posts.map(async post => {
    const like = await db.check_likes([id, post.post_id]);
    if (like.length > 0) {
      // check if the current user likes this post
      post.liked = true;
    } else {
      // if true, put { liked: true }, otherwise { liked: false }
      post.liked = false;
    }
    return post;
  });

  // promise.all([array of promises]) => this will return an array of the information we actually need
  newResponse = await Promise.all(newResponse);

  res.json(newResponse);
};

module.exports = {
  addLike,
  getLikesForPost,
  getLikes
};
