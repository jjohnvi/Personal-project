INSERT INTO posts (image_url, content, title, date)
VALUES ($1, $2, $3, $4)
RETURNING *;