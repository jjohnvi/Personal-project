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

deleteComment = (req, res, next) => {
  const db = req.app.get("db");
  const { id } = req.params;
  console.log(id);
  db.delete_comment(id)
    .then(() => res.sendStatus(200))
    .catch(err => {
      res.status(500).send({ error: "Can't delete comment." });
      console.log(err);
    });
};

updateComment = (req, res, next) => {
  const db = req.app.get("db");
  const { params, body } = req;

  db.update_comment([params.id, body.comment])
    .then(comment => {
      res.status(200).json(comment);
    })
    .catch(err => {
      res.status(500).send({ errorMessage: "Can't update, bro." });
      console.error(err);
    });
};

module.exports = {
  addComment,
  getComments,
  deleteComment,
  updateComment
};
