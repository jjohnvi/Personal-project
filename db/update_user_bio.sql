UPDATE users SET bio = $2
WHERE user_id = $1
RETURNING *;
