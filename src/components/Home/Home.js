import React, { Component } from "react";
import { connect } from "react-redux";
import {
  addPost,
  getAllPosts,
  getPost
} from "../../redux/PostsReducer/PostsReducer";
import {
  checkUserLoggedIn,
  updateState,
  logoutUser
} from "../../redux/UserReducer/UserReducer";
import Posts from "../Posts/Posts";
import "./Home.scss";

class Home extends Component {
  constructor() {
    super();
    this.state = {
      image_url: "",
      content: "",
      title: ""
    };
  }

  componentDidMount() {
    this.props.checkUserLoggedIn().catch(() => this.props.history.push("/"));
  }

  handleLogout = () => {
    this.props.logoutUser().then(() => this.props.history.push("/"));
  };

  updateState = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
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
    posts: state.postsReducer.posts
  };
};

export default connect(
  mapStateToProps,
  { updateState, addPost, getPost, getAllPosts, checkUserLoggedIn, logoutUser }
)(Home);
