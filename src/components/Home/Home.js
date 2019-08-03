import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { updateState } from "../../redux/UserReducer/UserReducer";
import { Link } from "react-router-dom";
import { addPost, getPost } from "../../redux/PostsReducer/PostsReducer";

class Home extends Component {
  constructor() {
    super();
    this.state = {
      image_url: "",
      content: "",
      title: ""
    };
  }
  handleLogout = () => {
    axios.get("/auth/logout").then(() => this.props.history.push("/"));
  };

  updateState = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  addPost = () => {
    this.props
      .addPost(this.state.image_url, this.state.content, this.state.title)
      .then(() => this.props.history.push("/profile"));
  };

  getPost = id => {
    this.props.goToPost(id).then(() => this.props.history.push("/"));
  };

  render() {
    console.log(this.state);
    return (
      <>
        <div>Welcome {this.props.username}</div>
        <button onClick={this.handleLogout}>Logout</button>
        <Link to={"/profile"}>
          <button>Go to your profile</button>
        </Link>
        <div>
          <input
            type="text"
            onChange={this.updateState}
            name="image_url"
            placeholder="Image URL"
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
            name="title"
            placeholder="Title"
          />
          <button onClick={this.addPost}>+</button>
        </div>
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

export default connect(
  mapStateToProps,
  { updateState, addPost, getPost }
)(Home);
