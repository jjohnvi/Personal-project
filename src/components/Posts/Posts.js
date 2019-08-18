import axios from "axios";
import React, { Component } from "react";
import { connect } from "react-redux";
import { getAllPosts } from "../../redux/PostsReducer/PostsReducer";
import { getAllLikes } from "../../redux/LikesReducer/LikesReducer";
import { withRouter } from "react-router-dom";
import OnePost from "./OnePost";
import "./Posts.scss";

class Posts extends Component {
  componentDidMount() {
    if (this.props.location.pathname === "/home") {
      this.props.getAllPosts().then(async () => {
        await this.props.getAllLikes();
      });
    }
  }

  handleLogout = () => {
    axios.get("/auth/logout").then(() => this.props.history.push("/"));
  };

  render() {
    const { posts, likesCount } = this.props;
    console.log(likesCount);

    return posts.map(post => {
      const { post_id } = post;
      const numLikesForMappedPost = likesCount.filter(
        post => post.post_id === post_id
      );

      let likeCount = 0;
      if (numLikesForMappedPost[0] && numLikesForMappedPost[0].count) {
        likeCount = numLikesForMappedPost[0].count;
      }
      return (
        // <NewComponent post = {post} />
        <OnePost
          post={post}
          likeCount={likeCount}
          key={post_id}
          didILikeIt={
            numLikesForMappedPost[0] && numLikesForMappedPost[0].liked
          }
        />
      );
    });
  }
}

const mapStateToProps = state => {
  return {
    username: state.userReducer.user.username,
    posts: state.postsReducer.posts,
    liked: state.likesReducer.liked,
    likesCount: state.likesReducer.likesCount
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    { getAllPosts, getAllLikes }
  )(Posts)
);
