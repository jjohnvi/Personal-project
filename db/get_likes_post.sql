SELECT COUNT(user_id) from likes
WHERE post_id = $1;