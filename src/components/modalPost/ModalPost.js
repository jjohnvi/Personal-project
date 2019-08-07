import React, { Component } from "react";
import Modal from "react-modal";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import "./ModalPost.scss";

import axios from "axios";
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
import * as privateStuff from "../../key.json";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "50vw",
    height: "60vh"
  }
};

Modal.setAppElement("#root");

class ModalPost extends Component {
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
  state = {
    modalIsOpen: false
  };

  openModal = () => {
    this.setState({ modalIsOpen: true });
  };

  closeModal = () => {
    this.setState({ modalIsOpen: false });
  };

  updateState = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  addPost = () => {
    this.props
      .addPost(this.state.image_url, this.state.content, this.state.title)
      .then(() => {
        this.props.getAllPosts().then(() => {
          this.props.history.push("/home");
        });
        this.resetFields();
      });
  };

  searchPics = e => {
    e.preventDefault();
    axios
      .get(
        `https://api.unsplash.com/search/photos?query=${
          this.state.searchPics
        }&client_id=${privateStuff.accessKey}`
      )
      .then(res => {
        this.setState({
          pictures: res.data.results.map((val, index) => {
            return val.urls.small;
          })
        });
      });
  };

  resetFields = () => {
    this.setState({ image_url: "", content: "", title: "" });
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
      <div>
        <button className="post__button" onClick={this.openModal}>
          Post
        </button>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <div className="newPost__cont">
            {/* <div className="newPost__user">Welcome {this.props.username}</div> */}
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
            </div>
            <div className="pics__outer__div">{picDisplay}</div>
            <button className="add__button" onClick={this.addPost}>
              +
            </button>
          </div>
        </Modal>
      </div>
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
  )(ModalPost)
);
