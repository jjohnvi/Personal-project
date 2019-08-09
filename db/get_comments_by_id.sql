SELECT c.*, u.username FROM comments c
JOIN users u ON c.user_id = u.user_id
JOIN posts p ON c.post_id = p.post_id
WHERE p.post_id = $1
ORDER BY date ASC;
