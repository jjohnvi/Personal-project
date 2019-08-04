import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { updateState } from "../../redux/UserReducer/UserReducer";
import "./Posts.scss";
import { Link, withRouter } from "react-router-dom";
import {
  addPost,
  getPost,
  getAllPosts,
  removePost,
  getPosts
} from "../../redux/PostsReducer/PostsReducer";

class Posts extends Component {
  constructor() {
    super();
    this.state = {
      image_url: "",
      content: "",
      title: ""
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

  goToPost = id => {
    this.props.history.push(`/posts/${id}`);
  };

  addPost = () => {
    this.props
      .addPost(this.state.image_url, this.state.content, this.state.title)
      .then(() => {
        this.props.getAllPosts().then(() => {
          this.props.history.push("/home");
        });
      });
  };

  removePost = id => {
    this.props.removePost(id).then(() => {
      if (this.props.location.pathname === "/home") {
        this.props.getAllPosts();
      } else if (this.props.location.pathname === "/profile") {
        this.props.getPosts();
      }
    });
  };

  goToProfile = () => {
    this.props.getPosts().then(() => this.props.history.push("/profile"));
  };

  render() {
    const { loading, posts } = this.props;
    console.log(posts);
    return (
      <>
        <div className="newPost__cont">
          <div className="newPost__user">Welcome {this.props.username}</div>

          <button onClick={this.goToProfile}>{this.props.username}</button>
          <div>
            <input
              type="text"
              onChange={this.updateState}
              name="title"
              placeholder="Title"
            />
            <input
              type="text"
              onChange={this.updateState}
              name="content"
              placeholder="Content"
            />
            <input
              type="text"
              onChange={this.updateState}
              name="image_url"
              placeholder="Image URL"
            />
            <button onClick={this.addPost}>+</button>
          </div>
        </div>
        {loading ? (
          <h3>Loading...</h3>
        ) : (
          posts.map(post => {
            return (
              <>
                <div className="content__cont">
                  <div onClick={() => this.goToPost(post.post_id)}>
                    <div className="post" key={post.post_id}>
                      <img src={post.image_url} alt={post.title} />
                      <h2>{post.title}</h2>
                      <p>{post.content}</p>
                    </div>
                  </div>
                  <button onClick={() => this.removePost(post.post_id)}>
                    Delete
                  </button>
                </div>
              </>
            );
          })
        )}
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    username: state.userReducer.username,
    posts: state.postsReducer.posts
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    { updateState, addPost, getPost, getAllPosts, removePost, getPosts }
  )(Posts)
);
