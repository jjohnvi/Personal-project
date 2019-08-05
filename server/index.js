require("dotenv").config();
const express = require("express");
const massive = require("massive");
const session = require("express-session");
const app = express();
const AC = require("./controllers/auth_controller");
const PC = require("./controllers/posts_controller");
const AM = require("./middlewares/auth_middleware");
const FC = require("./controllers/follows_controller");
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
app.post("/auth/register", AC.registerUser);
app.post("/auth/login", AC.loginUser);
app.get("/auth/user", AC.getUser);
app.get("/auth/logout", AC.logoutUser);

//posts
app.post("/api/posts", PC.createPost);
app.get("/api/posts", PC.getPostsByUserId);
app.delete("/api/posts/:id", PC.deletePost);
app.get("/api/posts/:id", PC.getPost);
app.get("/api/allposts", PC.getAllPosts);
app.get("api/:id/posts", PC.getPostsByProfile);
app.get("/api/follows/posts", FC.getFollowersPost);

//Auth Endpoints
app.use(AM.checkForUser);

app.listen(SERVER_PORT, () => {
  console.log(`Listening on Port ${SERVER_PORT}`);
});
