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
  updateComment
} from "../../redux/CommentsReducer/CommentsReducer";
import "./Post.scss";
import {
  populateModal,
  openModal,
  setEdit
} from "../../redux/ModalReducer/ModalReducer";
import Loader from "../Loader/Loader";

class Post extends Component {
  state = {
    comment: ""
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

  resetFields = () => {
    this.setState({ comment: "" });
  };

  addComment = e => {
    e.preventDefault();
    this.props
      .addComment(this.props.match.params.id, this.state.comment)
      .then(() => this.props.getComments(this.props.match.params.id))
      .then(() => this.resetFields());
  };

  deleteComment = id => {
    this.props.deleteComment(id).then(() => {
      this.props.getComments(this.props.match.params.id);
    });
  };

  updateComment = id => {
    this.props
      .updateComment(id, this.state.comment)
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
    console.log(this.props);

    const commentsDisplay = comments.map(comment => {
      console.log(comment);
      return (
        <div className="comment__username__cont" key={comment.comment_id}>
          <div className="username__div">{comment.username}:</div>
          <div className="comment__div">{comment.comment}</div>
          {comment.username === this.props.username ? (
            <>
              <button
                className="comment__delete"
                onClick={() => this.deleteComment(comment.comment_id)}
              >
                Delete
              </button>
              <button
                className="comment__edit"
                onClick={() => this.updateComment(comment.comment_id)}
              >
                Edit
              </button>
            </>
          ) : null}
        </div>
      );
    });
    return (
      <div className="post__page__cont">
        <Loader loading={loading} />
        {posts[0] && (
          <>
            <div className="post__cont">
              <h2 onClick={() => this.goToUserProfile(posts[0].username)}>
                {posts[0].username}
              </h2>
              <img src={posts[0].image_url} alt="Error" />
              <h2>{posts[0].title}</h2>
              <p>{posts[0].content}</p>
              {this.props.username === posts[0].username ? (
                <div className="remove__edit">
                  <button
                    className="remove__button"
                    onClick={() => this.removePost(posts[0].post_id)}
                  >
                    Delete
                  </button>
                  <button
                    className="edit__button"
                    onClick={() => this.editPost(posts[0].post_id)}
                  >
                    Edit
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
                <button
                  className="comment__button"
                  name="comment"
                  onClick={this.addComment}
                >
                  Add Comment
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
                    value={this.state.comment}
                  />
                </form>
                {commentsDisplay}
              </div>
            </div>
          </>
        )}
      </div>
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
    comments: state.commentsReducer.comments
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
    setEdit
  }
)(Post);
