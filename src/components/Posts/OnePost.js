import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {
  addPost,
  getAllPosts,
  getPost,
  getPosts,
  removePost,
  getPostsByProfile,
  editPost
} from "../../redux/PostsReducer/PostsReducer";
import {
  updateState,
  checkUserLoggedIn,
  resetFields,
  getUserId
} from "../../redux/UserReducer/UserReducer";

import {
  getAllLikes,
  likePost,
  getLikes
} from "../../redux/LikesReducer/LikesReducer";
import {
  populateModal,
  openModal,
  setEdit
} from "../../redux/ModalReducer/ModalReducer";
import "./Posts.scss";

class OnePost extends Component {
  goToPost = id => {
    this.props.history.push(`/post/${id}`);
    this.props.getLikes(id);
  };

  goToUserProfile = username => {
    this.props
      .getPostsByProfile(username)
      .then(() => this.props.getUserId(username))
      .then(() => this.props.history.push(`/posts/${username}`));
  };

  likePost = post => {
    this.props.likePost(post).then(() => this.props.getAllLikes());
  };

  editPost = id => {
    this.props.setEdit(true);
    this.props.populateModal(
      id,
      this.props.post.image_url,
      this.props.post.content,
      this.props.post.title
    );
    this.props.openModal();
  };

  removePost = id => {
    this.props.removePost(id).then(() => {
      if (this.props.location.pathname === "/home") {
        this.props.getAllPosts();
      } else if (
        this.props.location.pathname === `/posts/${this.props.username}`
      ) {
        this.props.getPosts();
      }
    });
  };

  render() {
    const { loading, posts, liked, likesCount, post, likeCount } = this.props;
    return (
      <div className="content__cont" key={post.post_id}>
        <div className="post">
          <h2
            className="content__username"
            onClick={() => this.goToUserProfile(post.username)}
          >
            {post.username}
          </h2>
          <div
            className="img__cont"
            onClick={() => this.goToPost(post.post_id)}
          >
            <img src={post.image_url} alt={post.title} />
            <h2>{post.title}</h2>
            <p>{post.content}</p>
          </div>
        </div>
        {this.props.username === post.username ? (
          <div className="remove__edit">
            <button
              className="remove__button"
              onClick={() => this.removePost(post.post_id)}
            >
              Delete
            </button>
            <button
              className="edit__button"
              onClick={() => this.editPost(post.post_id)}
            >
              Edit
            </button>
          </div>
        ) : null}
        <button
          className="like__posts__div"
          onClick={() => this.likePost(post.post_id)}
        >
          {/* {this.props.liked ? "Like!" : "Unlike"} */}
          Like! {likeCount}
        </button>
      </div>
    );
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
    {
      updateState,
      addPost,
      getPost,
      getAllPosts,
      removePost,
      getPosts,
      getPostsByProfile,
      checkUserLoggedIn,
      resetFields,
      editPost,
      getUserId,
      getAllLikes,
      likePost,
      getLikes,
      populateModal,
      openModal,
      setEdit
    }
  )(OnePost)
);
