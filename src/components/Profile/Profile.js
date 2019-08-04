import axios from "axios";
import React, { Component } from "react";
import { connect } from "react-redux";
import Posts from "../Posts/Posts";
import "./Profile.scss";
import {
  addPost,
  getPosts,
  getPost,
  removePost
} from "../../redux/PostsReducer/PostsReducer";

class Profile extends Component {
  // componentDidMount() {
  //   this.props.getPosts();
  // }

  goToHome = () => {
    this.props.history.push("/home");
  };
  render() {
    return (
      <>
        <button onClick={this.goToHome}>Home</button>
        <div className="profile__post">
          <Posts />
        </div>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    posts: state.postsReducer.posts,
    loading: state.postsReducer.loading,
    loggedInUserId: state.userReducer.id
  };
};

export default connect(
  mapStateToProps,
  { getPosts, getPost, removePost }
)(Profile);
