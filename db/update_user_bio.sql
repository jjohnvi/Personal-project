UPDATE users SET bio = $2
WHERE username = $1
RETURNING *;
