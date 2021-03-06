import React from "react";
import { Switch, Route } from "react-router-dom";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Home from "./components/Home/Home";
import Profile from "./components/Profile/Profile";
import Post from "./components/Post/Post";
import Navbar from "./components/Navbar/Navbar";

export default (
  <>
    <Navbar />
    <Switch>
      <Route exact path="/" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/home" component={Home} />
      <Route exact path="/post/:id" component={Post} />
      <Route path="/posts/:username" component={Profile} />
    </Switch>
  </>
);
