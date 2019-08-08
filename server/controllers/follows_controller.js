const follow = async (req, res, next) => {
  const db = req.app.get("db");
  const { id } = req.session.user;
  const { following_id } = req.params;

  db.check_follow([id, following_id]) // checking relationship between users using user_id and following_id from sql
    .then(relationship => {
      // relationship is an array, so youre checking if it has anything
      if (relationship.length > 0) {
        // if it has something, then you take unfollow.
        db.unfollow([id, following_id]).then(() => {
          // using another sql method to take action if the user has not already followed
          res.json({ followed: false }); // sending back an object with boolean called followed representing if user is following or not. this means unfollowing was successsful.
        });
      } else {
        db.follow_user([id, following_id]).then(() => {
          res.json({ followed: true }); // this means following the user was successful.
        });
      }
    })
    .catch(err => console.log(err));
};

const getFollowPosts = async (req, res, next) => {
  const db = req.app.get("db");
  const { id } = req.session.user;
  const results = await db.get_follows_posts([id]);
  // let ids = []; //keeps a list of all the post ids so far
  // let posts = []; //a list of unique posts
  // for (let i = 0; i < results.length; i++) { //we go through each post
  //   if (!ids.includes(results[i].post_id)) { //if we havent already come across a post with this post id
  //     posts.push(results[i]); //we'll add our post to the post array
  //   }
  //   ids.push(results[i].post_id); //at the end we always add the post id to the id list
  // }
  // console.log(posts);
  // res.status(200).json(posts);
  res.status(200).json(results);
};

const followCount = async (req, res, next) => {
  const db = req.app.get("db");
};

module.exports = { follow, getFollowPosts };
