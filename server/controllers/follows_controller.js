const getFollowersPost = async (req, res, next) => {
  const db = req.app.get("db");
  db.follow_post()
    .then(posts => {
      res.json(posts);
    })
    .catch(err => console.log(err));
};

module.exports = { getFollowersPost };
