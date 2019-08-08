import React, { Component } from "react";
import { connect } from "react-redux";
import {
  getPost,
  removePost,
  getPostsByProfile,
  getAllPosts
} from "../../redux/PostsReducer/PostsReducer";
import { likePost, getLikes } from "../../redux/LikesReducer/LikesReducer";
import { checkUserLoggedIn } from "../../redux/UserReducer/UserReducer";
import {
  addComment,
  getComments
} from "../../redux/CommentsReducer/CommentsReducer";
import "./Post.scss";

class Post extends Component {
  componentDidMount() {
    this.getPost(this.props.match.params.id);
    this.props.checkUserLoggedIn().catch(() => this.props.history.push("/"));
  }

  removePost = id => {
    this.props
      .removePost(id)
      .then(() => this.props.getAllPosts())
      .then(this.props.history.push("/home"));
  };

  getPost = id => {
    this.props.getPost(id);
  };

  goToUserProfile = username => {
    this.props
      .getPostsByProfile(username)
      .then(() => this.props.history.push(`/posts/${username}`));
  };

  addComment = id => {
    this.props.addComment(id).then(() => this.props.getComments());
  };

  likePost = post => {
    this.props
      .likePost(post)
      .then(() => this.props.getLikes(this.props.posts[0].post_id));
  };

  goToHome = () => {
    this.props.history.push("/home");
  };

  render() {
    const { posts, loading, likesForUser } = this.props;
    console.log(this.props);
    console.log(posts[0]);

    // const postId = likesCount.filter(id => id.post_id === posts[0].post_id);

    return (
      <div className="post__page__cont">
        {loading && <h3>Loading...</h3>}
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
                <>
                  <button onClick={() => this.removePost(posts[0].post_id)}>
                    Delete
                  </button>
                  <button onClick={() => this.editPost(posts[0].post_id)}>
                    Edit
                  </button>
                </>
              ) : null}
              <div className="comment__like">
                <button
                  className="like__button"
                  onClick={() => this.likePost(posts[0].post_id)}
                >
                  Like!
                </button>
                <p>{likesForUser}</p>
                <button>Add Comment</button>
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
    liked: state.likesReducer.liked,
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
    getComments
  }
)(Post);
