SELECT u.user_id
FROM users u
JOIN posts p ON p.user_id = u.user_id
JOIN follows f ON f.user_id = u.user_id