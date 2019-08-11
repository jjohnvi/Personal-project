SELECT p.*, u.username, u.profile_pic FROM posts p
JOIN users u ON p.user_id = u.user_id
WHERE u.username = $1
ORDER BY date DESC;