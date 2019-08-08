UPDATE posts
SET 
image_url = $2, 
content = $3, 
title = $4
WHERE post_id = $1
RETURNING *;
