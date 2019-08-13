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
import Loader from "../Loader/Loader";

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
        <Loader loading={this.props.loading} />
        <div className="home">
          <button onClick={this.handleLogout}>Logout</button>
          {this.props.posts.length < 1 && (
            <div className="no__post">
              Welcome to mello. Get started by following other users and making
              posts.
            </div>
          )}
          <Posts />
        </div>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    posts: state.postsReducer.posts,
    loading: state.postsReducer.loading
  };
};

export default connect(
  mapStateToProps,
  { updateState, addPost, getPost, getAllPosts, checkUserLoggedIn, logoutUser }
)(Home);
