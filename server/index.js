require("dotenv").config();
const express = require("express");
const massive = require("massive");
const session = require("express-session");
const app = express();
const AC = require("./controllers/auth_controller");
const PC = require("./controllers/posts_controller");
const AM = require("./middlewares/auth_middleware");
const FC = require("./controllers/follows_controller");
const UC = require("./controllers/users_controller");
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
app.get("/api/posts", PC.getPostsByUserId);
app.delete("/api/posts/:id", PC.deletePost);
app.get("/api/posts/:id", PC.getPost);
app.get("/api/allposts", PC.getAllPosts);
app.get("/api/:username/posts", PC.getPostsByProfile);
app.put("/api/posts/:id", PC.editPost);

//follows
app.post("/api/follow/:following_id", FC.follow);
app.get("/api/follow/", FC.getFollowPosts);
app.delete("/api/follow/:following_id", FC.unfollow);

//users
app.get("/api/users/", UC.getUsers);

app.listen(SERVER_PORT, () => {
  console.log(`Listening on Port ${SERVER_PORT}`);
});
