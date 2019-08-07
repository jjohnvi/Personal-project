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
  resetFields
} from "../../redux/UserReducer/UserReducer";
import "./Posts.scss";
import * as privateStuff from "../../key.json";

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
        {/* <div className="newPost__cont">
          <div className="posts__inputs">
            <input
              type="text"
              onChange={this.updateState}
              name="title"
              placeholder="Title"
              value={this.state.title}
            />
            <input
              type="text"
              onChange={this.updateState}
              name="content"
              placeholder="Content"
              value={this.state.content}
            />
            <input
              type="url"
              onChange={this.updateState}
              name="image_url"
              placeholder="Image URL"
              value={this.state.image_url}
            />
            <form
              type="submit"
              onSubmit={this.searchPics}
              className="searchpics__form"
            >
              <input
                type="text"
                onChange={this.updateState}
                name="searchPics"
                placeholder="Search for photos then press Enter"
                value={this.state.searchPics}
              />
            </form>
            <button className="add__button" onClick={this.addPost}>
              +
            </button>
          </div>
          <div className="pics__outer__div">{picDisplay}</div>
        </div> */}
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
                  <div onClick={() => this.goToPost(post.post_id)}>
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
      editPost
    }
  )(Posts)
);
