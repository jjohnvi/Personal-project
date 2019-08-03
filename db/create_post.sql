INSERT INTO posts (user_id, image_url, content, title)
VALUES ($1, $2, $3, $4)
RETURNING *;