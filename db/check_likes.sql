SELECT * from likes
WHERE user_id = $1 AND post_id = $2;