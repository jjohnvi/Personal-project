UPDATE comments SET comment = $2
WHERE comment_id = $1
RETURNING *;
