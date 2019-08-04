import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { updateState } from "../../redux/UserReducer/UserReducer";
import Posts from "../Posts/Posts";
import "./Home.scss";
import Navbar from "../Navbar/Navbar";
import { Link } from "react-router-dom";
import {
  addPost,
  getPost,
  getAllPosts
} from "../../redux/PostsReducer/PostsReducer";

class Home extends Component {
  constructor() {
    super();
    this.state = {
      image_url: "",
      content: "",
      title: ""
    };
  }

  handleLogout = () => {
    axios.get("/auth/logout").then(() => this.props.history.push("/"));
  };

  updateState = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    console.log(this.props);
    return (
      <>
        <div className="home">
          <button onClick={this.handleLogout}>Logout</button>
          <Posts />
        </div>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    username: state.userReducer.username,
    posts: state.postsReducer.posts
  };
};

export default connect(
  mapStateToProps,
  { updateState, addPost, getPost, getAllPosts }
)(Home);
