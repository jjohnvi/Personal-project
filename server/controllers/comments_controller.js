const addComment = (req, res, next) => {
  const db = req.app.get("db");
  const { id } = req.session.user;
  const { post_id } = req.params;
  const { comment } = req.body;
  console.log(id, post_id, comment);

  db.add_comment([id, post_id, comment]).then(() => res.sendStatus(200));
};

const getComments = (req, res, next) => {
  const db = req.app.get("db");
  const { post_id } = req.params;

  db.get_comments_by_id([post_id])
    .then(comments => {
      console.log(comments);
      res.json(comments);
    })
    .catch(err => console.log(err));
};

module.exports = {
  addComment,
  getComments
};
