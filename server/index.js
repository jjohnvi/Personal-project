require("dotenv").config();
const express = require("express");
const massive = require("massive");
const session = require("express-session");
const app = express();
const AC = require("./controllers/auth_controller");
const PC = require("./controllers/posts_controller");
const AM = require("./middlewares/auth_middleware");
const GM = require("./middlewares/get_middleware");
const FC = require("./controllers/follows_controller");
const UC = require("./controllers/users_controller");
const LC = require("./controllers/likes_controller");
const CC = require("./controllers/comments_controller");
const { SERVER_PORT, CONNECTION_STRING, SESSION_SECRET } = process.env;

app.use(express.json());

massive(CONNECTION_STRING)
  .then(db => {
    app.set("db", db);
    console.log("DB is certainly connected :)");
  })
  .catch(err => console.log(err));

app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: SESSION_SECRET,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7
    }
  })
);

//auth
app.post("/auth/register", AM.checkForUser, AC.registerUser);
app.post("/auth/login", AM.checkForUser, AC.loginUser);
app.get("/auth/user", AM.checkForUser, AC.getUser);
app.get("/auth/logout", AM.checkForUser, AC.logoutUser);

//posts
app.post("/api/posts", PC.createPost);
app.get("/api/posts", GM.time, PC.getPostsByUserId);
app.delete("/api/posts/:id", PC.deletePost);
app.get("/api/posts/:id", GM.time, PC.getPost);
app.get("/api/allposts", GM.time, PC.getAllPosts);
app.get("/api/:username/posts", GM.time, PC.getPostsByProfile);
app.put("/api/posts/:id", PC.editPost);

//follows
app.post("/api/follow/:following_id", GM.time, FC.follow);
app.get("/api/follow/", GM.time, FC.getFollowPosts);

//users
app.get("/api/users/", GM.time, UC.getUsers);
app.get("/api/users/:username", UC.getUserId);
app.put("/api/users/", UC.updatePic);
app.get("/api/user/:username", UC.getUserBio);
app.put("/api/users/:id", UC.editUserBio);

//likes
app.post("/api/likes/:post_id", LC.addLike);
app.get("/api/likes/:post_id", LC.getLikesForPost);
app.get("/api/likes/", GM.time, LC.getLikes);

//comments
app.post("/api/comments/:post_id", GM.time, CC.addComment);
app.get("/api/comments/:post_id", GM.time, CC.getComments);
app.delete("/api/comments/:id", GM.time, CC.deleteComment);
app.put("/api/comments/:id", GM.time, CC.updateComment);

app.listen(SERVER_PORT, () => {
  console.log(`Listening on Port ${SERVER_PORT}`);
});
