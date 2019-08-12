import React, { Component } from "react";
import { connect } from "react-redux";
import {
  getPost,
  removePost,
  getPostsByProfile,
  getAllPosts
} from "../../redux/PostsReducer/PostsReducer";
import { likePost, getLikes } from "../../redux/LikesReducer/LikesReducer";
import {
  checkUserLoggedIn,
  updateState
} from "../../redux/UserReducer/UserReducer";
import {
  addComment,
  getComments,
  deleteComment,
  updateComment,
  populateComment,
  setEditStatus,
  handleEditOnChange
} from "../../redux/CommentsReducer/CommentsReducer";
import "./Post.scss";
import {
  populateModal,
  openModal,
  setEdit
} from "../../redux/ModalReducer/ModalReducer";
import Comments from "../Comments/Comments";
import Loader from "../Loader/Loader";

class Post extends Component {
  state = {
    comment: ""
    // editStatus: false
  };

  componentDidMount() {
    this.props.checkUserLoggedIn().catch(() => this.props.history.push("/"));
    this.getPost(this.props.match.params.id).then(async () => {
      await this.props.getComments(this.props.match.params.id);
      await this.props.getLikes(this.props.match.params.id);
    });
  }

  removePost = id => {
    this.props
      .removePost(id)
      .then(() => this.props.getAllPosts())
      .then(() => this.props.history.push("/home"));
  };

  getPost = id => {
    return this.props.getPost(id);
  };

  goToUserProfile = username => {
    this.props
      .getPostsByProfile(username)
      .then(() => this.props.history.push(`/posts/${username}`));
  };

  updateState = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleEditOnChange = e => {
    this.props.handleEditOnChange(e.target.value);
  };

  resetFields = () => {
    this.setState({ comment: "" });
  };

  addComment = async e => {
    e.preventDefault();
    this.props.addComment(this.props.match.params.id, this.props.comment);
    await this.props.getComments(this.props.match.params.id);
    await this.resetFields();
  };

  deleteComment = async id => {
    this.props.deleteComment(id);
    await this.props.getComments(this.props.match.params.id);
  };

  updateComment = id => {
    this.props
      .updateComment(id, this.props.comment_edit)
      .then(() => this.props.getComments(this.props.match.params.id));
  };

  likePost = post => {
    this.props
      .likePost(post)
      .then(() => this.props.getLikes(this.props.posts[0].post_id));
  };

  goToHome = () => {
    this.props.history.push("/home");
  };

  editPost = () => {
    const { posts } = this.props;
    this.props.openModal();
    this.props.populateModal(
      posts[0].post_id,
      posts[0].image_url,
      posts[0].content,
      posts[0].title
    );
    this.props.setEdit(true);
  };

  render() {
    const { posts, loading, likesForUser, comments } = this.props;
    console.log(this.props.editStatus);
    console.log(this.props);

    const commentsDisplay = comments.map(comment => {
      console.log(comment);
      return (
        <Comments
          comment={comment}
          posts={posts}
          goToUserProfile={this.goToUserProfile}
          deleteComment={this.deleteComment}
          handleClickUpdateComment={this.handleClickUpdateComment}
          handleEditOnChange={this.handleEditOnChange}
          updateComment={this.updateComment}
          populateComment={this.props.populateComment}
          username={this.props.username}
          comment_edit={this.props.comment_edit}
        />
      );
    });
    return (
      <>
        <div className="post__page__cont">
          <Loader loading={loading} />
          {posts[0] && (
            <div className="one__post__cont">
              {posts[0].profile_pic ? (
                <img className="profile__pics__2" src={posts[0].profile_pic} />
              ) : (
                <img
                  className="profile__pics__2"
                  src="https://res.cloudinary.com/john-personal-proj/image/upload/v1565478265/mello/kw5qxmbgea2ppbncuibt.png"
                />
              )}
              <div className="post__cont">
                <h2
                  className="post__username"
                  onClick={() => this.goToUserProfile(posts[0].username)}
                >
                  {posts[0].username}
                </h2>
                <img src={posts[0].image_url} alt="Error" />
                <h2>{posts[0].title}</h2>
                <p>{posts[0].content}</p>
                {this.props.username === posts[0].username ? (
                  <div className="remove__edit__post">
                    <button
                      className="remove__button__post"
                      onClick={() => this.removePost(posts[0].post_id)}
                    >
                      <i class="material-icons">delete</i>
                    </button>
                    <button
                      className="edit__button__post"
                      onClick={() => this.editPost(posts[0].post_id)}
                    >
                      <i class="material-icons">edit</i>
                    </button>
                  </div>
                ) : null}
                <div className="comment__like">
                  <button
                    className="like__number"
                    onClick={() => this.likePost(posts[0].post_id)}
                  >
                    <div className="like__button">
                      {this.props.liked ? "Unlike" : "Like!"} {likesForUser}
                    </div>
                  </button>
                </div>
                <div className="comment__cont">
                  <form
                    className="comment__form"
                    type="submit"
                    onSubmit={this.addComment}
                  >
                    <input
                      autoComplete="off"
                      placeholder="Write a comment..."
                      className="comment__input"
                      name="comment"
                      onChange={this.updateState}
                      value={this.props.comment}
                    />
                    <button
                      className="comment__button"
                      name="comment"
                      onClick={this.addComment}
                    >
                      <i class="material-icons">send</i>
                    </button>
                  </form>
                  {commentsDisplay}
                </div>
              </div>
            </div>
          )}
        </div>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    username: state.userReducer.user.username,
    liked: state.likesReducer.liked.liked,
    posts: state.postsReducer.posts,
    loading: state.postsReducer.loading,
    likesForUser: state.likesReducer.likesForUser,
    comments: state.commentsReducer.comments,
    editStatus: state.commentsReducer.editStatus,
    comment: state.commentsReducer.comment.comment,
    comment_edit: state.commentsReducer.comment_edit
  };
};

export default connect(
  mapStateToProps,
  {
    removePost,
    getPost,
    checkUserLoggedIn,
    getPostsByProfile,
    likePost,
    getLikes,
    getAllPosts,
    addComment,
    getComments,
    updateState,
    deleteComment,
    updateComment,
    openModal,
    populateModal,
    setEdit,
    populateComment,
    setEditStatus,
    handleEditOnChange
  }
)(Post);
