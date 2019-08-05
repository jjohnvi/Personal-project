SELECT p.*, u.username FROM posts p
JOIN users u ON p.user_id = u.user_id
WHERE p.post_id = $1;