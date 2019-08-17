SELECT u.username, COUNT(f.following_id) FROM follows f
JOIN users u ON u.user_id = f.following_id
WHERE u.username = $1
GROUP BY username;