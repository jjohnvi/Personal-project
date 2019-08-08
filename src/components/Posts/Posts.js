import axios from "axios";
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
import "./Posts.scss";

class Posts extends Component {
  constructor() {
    super();
    this.state = {
      image_url: "",
      content: "",
      title: "",
      searchPics: "",
      pictures: []
    };
  }

  componentDidMount() {
    if (this.props.location.pathname === "/home") {
      this.props.getAllPosts();
    }
  }

  getPost = id => {
    this.props.goToPost(id).then(() => this.props.history.push("/"));
  };

  handleLogout = () => {
    axios.get("/auth/logout").then(() => this.props.history.push("/"));
  };

  updateState = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  resetFields = () => {
    this.setState({ image_url: "", content: "", title: "" });
  };

  goToPost = id => {
    this.props.history.push(`/post/${id}`);
  };

  goToUserProfile = username => {
    this.props
      .getPostsByProfile(username)
      .then(() => this.props.getUserId(username))
      .then(() => this.props.history.push(`/posts/${username}`));
  };

  editPost = id => {
    this.props
      .editPost(id, this.state.image_url, this.state.content, this.state.title)
      .then(() => {
        if (this.props.location.pathname === "/home") {
          this.props.getAllPosts();
        } else if (
          this.props.location.pathname === `/posts/${this.props.username}`
        ) {
          this.props.getPosts();
        }
        this.resetFields();
      });
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
    const { loading, posts } = this.props;
    const { pictures } = this.state;
    const picDisplay = pictures.map(val => {
      return (
        <div className="pics__cont">
          <img className="pics__array" src={val} key={val} alt="Error" />
        </div>
      );
    });
    return (
      <>
        {loading ? (
          <h3>Loading...</h3>
        ) : (
          posts.map(post => {
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
                  <>
                    <button onClick={() => this.removePost(post.post_id)}>
                      Delete
                    </button>
                    <button onClick={() => this.editPost(post.post_id)}>
                      Edit
                    </button>
                  </>
                ) : null}
              </div>
            );
          })
        )}
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    username: state.userReducer.user.username,
    posts: state.postsReducer.posts
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
      getUserId
    }
  )(Posts)
);
