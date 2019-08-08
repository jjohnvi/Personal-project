SELECT c.*, u.username FROM comments c
JOIN posts p ON c.user_id = p.user_id
JOIN users u ON p.user_id = u.user_id
WHERE p.post_id = $1
ORDER BY date DESC;
