SELECT post_id, COUNT(post_id) from likes
GROUP BY post_id;