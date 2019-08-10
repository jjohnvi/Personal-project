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
import {
  populateModal,
  handleChange,
  updateImgUrl,
  searchPics
} from "../../redux/ModalReducer/ModalReducer";
import * as privateStuff from "../../key.json";
import { closeModal } from "../../redux/ModalReducer/ModalReducer";

Modal.setAppElement("#root");

class ModalPost extends Component {
  state = {
    modalIsOpen: false
  };

  closeModal = () => {
    this.props.closeModal();
  };

  updateState = e => {
    this.props.handleChange({ [e.target.name]: e.target.value });
  };

  clickPicture = val => {
    this.props.updateImgUrl(val);
  };

  onClick = () => {
    if (this.props.isEditing) {
      this.props
        .editPost(
          this.props.id,
          this.props.image_url,
          this.props.content,
          this.props.title
        )
        .then(() => {
          if (this.props.location.pathname === "/home") {
            this.props.getAllPosts();
          } else if (
            this.props.location.pathname === `/posts/${this.props.username}`
          ) {
            this.props.getPosts();
          }
          this.resetFields();
          this.closeModal();
        });
    } else {
      this.props
        .addPost(this.props.image_url, this.props.content, this.props.title)
        .then(() => {
          this.props.getAllPosts().then(() => {
            this.props.history.push("/home");
          });
          this.resetFields();
          this.closeModal();
        });
    }
  };

  searchPics = e => {
    e.preventDefault();
    axios
      .get(
        `https://api.unsplash.com/search/photos?query=${
          this.props.searchQuery
        }&client_id=${privateStuff.accessKey}`
      )
      .then(res => {
        this.props.searchPics(
          res.data.results.map((val, index) => {
            return val.urls.small;
          })
        );
      });
  };

  resetFields = () => {
    this.setState({ image_url: "", content: "", title: "", searchPics: "" });
  };

  render() {
    const { pictures } = this.props;
    const picDisplay = pictures.map(val => {
      return (
        <div className="pics__cont">
          <img
            className="pics__array"
            onClick={() => this.clickPicture(val)}
            src={val}
            key={val}
            alt="Error"
          />
        </div>
      );
    });
    return (
      <Modal
        overlayClassName="ReactModal__Overlay"
        className="modal"
        isOpen={this.props.modalIsOpen}
        onAfterOpen={this.afterOpenModal}
        onRequestClose={this.closeModal}
        contentLabel="Example Modal"
      >
        <div className="modal__cont">
          <div className="newPost__cont">
            <div className="posts__inputs">
              <input
                autoComplete="off"
                type="text"
                onChange={this.updateState}
                name="title"
                placeholder="Title..."
                value={this.props.title}
              />
              <input
                autoComplete="off"
                type="text"
                onChange={this.updateState}
                name="content"
                placeholder="What's on your mind..?"
                value={this.props.content}
              />
              <input
                autoComplete="off"
                type="url"
                onChange={this.updateState}
                name="image_url"
                placeholder="Image URL..."
                value={this.props.image_url}
              />
              <form
                type="submit"
                onSubmit={this.searchPics}
                className="searchpics__form"
              >
                <input
                  autoComplete="off"
                  type="text"
                  onChange={this.updateState}
                  name="searchQuery"
                  placeholder="Search for photos then press 'Enter...'"
                  value={this.props.searchQuery}
                />
              </form>
            </div>
            <div className="pics__outer__div">{picDisplay}</div>
            <button className="add__button" onClick={this.onClick}>
              {this.props.isEditing ? "Edit" : "+"}
            </button>
          </div>
        </div>
      </Modal>
    );
  }
}

const mapStateToProps = state => {
  return {
    username: state.userReducer.user.username,
    posts: state.postsReducer.posts,
    modalIsOpen: state.modalReducer.modalIsOpen,
    image_url: state.modalReducer.image_url,
    title: state.modalReducer.title,
    content: state.modalReducer.content,
    isEditing: state.modalReducer.isEditing,
    id: state.modalReducer.id,
    searchQuery: state.modalReducer.searchQuery,
    pictures: state.modalReducer.pictures
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
      closeModal,
      populateModal,
      handleChange,
      updateImgUrl,
      searchPics
    }
  )(ModalPost)
);
