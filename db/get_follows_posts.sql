-- SELECT p.*, u.username, f.user_id FROM posts p
-- JOIN users u ON p.user_id = u.user_id
-- JOIN follows f ON f.following_id = u.user_id
-- WHERE f.user_id = $1 OR u.user_id = $1
-- ORDER BY date DESC;

SELECT p.*, u.username FROM posts p
JOIN users u ON p.user_id = u.user_id
WHERE u.user_id = $1
UNION
SELECT p.*, u.username FROM posts p
JOIN follows f ON f.following_id = p.user_id
JOIN users u ON f.following_id = u.user_id
WHERE f.user_id = $1
ORDER BY date desc;