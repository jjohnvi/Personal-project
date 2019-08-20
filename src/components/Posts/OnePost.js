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
  getUserId,
  getUserBio
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
import moment from "moment";

class OnePost extends Component {
  goToPost = id => {
    this.props.history.push(`/post/${id}`);
    this.props.getLikes(id);
  };

  goToUserProfile = username => {
    this.props
      .getPostsByProfile(username)
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
    const { post, likeCount, didILikeIt } = this.props;
    const showMoreLink = (
      <a
        href
        className="read__more"
        onClick={() => this.goToPost(post.post_id)}
        key={post.post_id}
      >
        read more
      </a>
    );

    let colorIcon = "material-icons";
    if (didILikeIt) {
      colorIcon += " material-icons-red";
    }

    return (
      <>
        <div className="user__post__content">
          {post.profile_pic ? (
            <div className="profile__pic__username">
              <img
                className="profile__pic"
                src={post.profile_pic}
                alt="profile pic"
              />
              <span
                onClick={() => this.goToUserProfile(post.username)}
                className="at__user"
              >
                @{post.username}
              </span>
            </div>
          ) : (
            <div className="profile__pic__username">
              <img
                className="profile__pic"
                src="https://res.cloudinary.com/john-personal-proj/image/upload/v1565478265/mello/kw5qxmbgea2ppbncuibt.png"
                alt="profile pic"
              />
              <span onClick={() => this.goToUserProfile(post.username)}>
                @{post.username}
              </span>
            </div>
          )}
          <div className="content__cont" key={post.post_id}>
            <div className="post">
              <h2
                className="content__username"
                onClick={() => this.goToUserProfile(post.username)}
              >
                {post.title}
              </h2>
              <div className="profile__img__cont">
                <div className="img__cont">
                  <img
                    src={post.image_url}
                    alt={post.title}
                    onClick={() => this.goToPost(post.post_id)}
                  />
                  <div className="content__buttons">
                    <div className="title__content__div">
                      <p className="post__content">
                        {post.content.length > 255
                          ? [
                              post.content.substring(0, 255),
                              "-...",
                              showMoreLink
                            ]
                          : post.content}
                      </p>
                      <div className="date__post">
                        {moment(post.date).fromNow()}
                      </div>
                    </div>
                    <div className="remove__edit__like">
                      {this.props.username === post.username ? (
                        <div className="remove__edit">
                          <button className="remove__button">
                            <i
                              className="material-icons"
                              onClick={() => this.removePost(post.post_id)}
                            >
                              delete
                            </i>
                          </button>
                          <button
                            className="edit__button"
                            onClick={() => this.editPost(post.post_id)}
                          >
                            <i className="material-icons">edit</i>
                          </button>
                        </div>
                      ) : null}

                      <button
                        className="like__posts__div"
                        onClick={() => this.likePost(post.post_id)}
                      >
                        {/* {this.props.liked ? "Like!" : "Unlike"} */}
                        <i className={colorIcon}>whatshot</i> {likeCount}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    username: state.userReducer.user.username,
    posts: state.postsReducer.posts,
    liked: state.likesReducer.liked
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
      setEdit,
      getUserBio
    }
  )(OnePost)
);
