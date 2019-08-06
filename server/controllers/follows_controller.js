const follow = async (req, res, next) => {
  const db = req.app.get("db");
  const { id } = req.session.user;
  const { user_id, following_id } = req.params;

  db.follow_user([id, following_id])
    .then(() => {
      res.sendStatus(200);
    })
    .catch(err => console.log(err));
};

const unfollow = async (req, res, next) => {
  const db = req.app.get("db");
  const { id } = req.session.user;
  const { user_id, following_id } = req.params;

  db.unfollow([id, following_id])
    .then(() => {
      res.sendStatus(200);
    })
    .catch(err => {
      console.log(err);
      res.sendStatus(500);
    });
};

const getFollowPosts = async (req, res, next) => {
  const db = req.app.get("db");
  const { id } = req.session.user;
  const results = await db.get_follows_posts([id]);
  // let ids = []; //keeps a list of all the post ids so far
  // let posts = []; //a list of unique posts
  // for (let i = 0; i < results.length; i++) { //we go through each post
  //   if (!ids.includes(results[i].post_id)) { //if we havent already come across a post with this post id
  //     posts.push(results[i]); //we'll add our post to the post array
  //   }
  //   ids.push(results[i].post_id); //at the end we always add the post id to the id list
  // }
  // console.log(posts);
  // res.status(200).json(posts);
  res.status(200).json(results);
};

const followCount = async (req, res, next) => {
  const db = req.app.get("db");
};

module.exports = { follow, getFollowPosts, unfollow };
