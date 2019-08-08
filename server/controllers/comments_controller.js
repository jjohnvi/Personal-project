const addComment = async (req, res, next) => {
  const db = req.app.get("db");
  const { id } = req.session.user;
  const { post_id } = req.params;
  const { comment } = req.body;

  db.add_comment([id, post_id, comment]);
  res.sendStatus(200);
};

const getComments = async (req, res, next) => {
  const db = req.app.get("db");
  const { post_id } = req.params;

  await db
    .get_comments_by_id([post_id])
    .then(comments => {
      res.json(comments);
    })
    .catch(err => console.log(err));
};

module.exports = {
  addComment,
  getComments
};
