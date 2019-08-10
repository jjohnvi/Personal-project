UPDATE posts
SET 
image_url = $2, 
content = $3, 
title = $4
WHERE post_id = $1;

SELECT p.*, u.username FROM posts p
JOIN users u ON u.user_id = p.user_id
WHERE p.post_id = $1;
