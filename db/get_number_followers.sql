SELECT u.username, COUNT(f.follower_id) FROM follows f
JOIN users u ON u.user_id = f.user_id
WHERE u.username = $1
GROUP BY username;