DELETE FROM follows
WHERE user_id = $1 AND following_id = $2
