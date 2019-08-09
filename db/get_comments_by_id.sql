SELECT c.*, u.username FROM comments c
JOIN posts p ON c.post_id = p.post_id
JOIN users u ON p.user_id = u.user_id
WHERE p.post_id = $1
ORDER BY date ASC;
