SELECT p.*, u.username FROM posts p
JOIN users u ON p.user_id = u.user_id
WHERE u.user_id = $1;