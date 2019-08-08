SELECT c.*, u.username FROM comments c
JOIN users u ON c.user_id = u.user_id
WHERE u.user_id = $1
UNION
SELECT c.*, u.username FROM comments c
JOIN posts p ON p.user_id = c.user_id
JOIN users u ON p.user_id = u.user_id
WHERE p.user_id = $1
ORDER BY date desc;