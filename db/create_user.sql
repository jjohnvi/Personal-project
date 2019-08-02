INSERT INTO users (username, first_name, last_name, password)
VALUES ($1, $2, $3, $4)
RETURNING *;