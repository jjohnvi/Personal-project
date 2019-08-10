import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { searchUser } from "../../redux/FollowsReducer/FollowsReducer";
import {
  getAllPosts,
  getPosts,
  getPostsByProfile
} from "../../redux/PostsReducer/PostsReducer";
import {
  openModal,
  closeModal,
  resetInput,
  setEdit
} from "../../redux/ModalReducer/ModalReducer";
import { updateState, getUserId } from "../../redux/UserReducer/UserReducer";
import "../Navbar/Navbar.scss";
import ModalPost from "../modalPost/ModalPost";

class Navbar extends Component {
  state = {
    open: false,
    searchbar: "",
    currentDisplayed: this.props.users
  };

  toggleMenu = () => {
    this.setState({ open: !this.state.open });
  };

  goToHome = () => {
    if (this.props.username) {
      this.props.getAllPosts().then(() => this.props.history.push("/home"));
    }
  };

  updateState = e => {
    this.setState({ [e.target.name]: e.target.value });
    this.props.searchUser(e.target.value);
    if (e.target.value === "") {
      this.setState({ open: false });
    } else {
      this.setState({ open: true });
    }
  };

  goToProfile = username => {
    this.props
      .getPostsByProfile(username)
      .then(() => this.props.history.push(`/posts/${this.props.username}`));
  };

  goToUserProfile = username => {
    this.props
      .getPostsByProfile(username)
      .then(() => this.props.getUserId(username))
      .then(() => this.props.history.push(`/posts/${username}`));
  };

  openModal = () => {
    this.props.setEdit(false);
    this.props.resetInput();
    this.props.openModal();
  };

  render() {
    const { username, users } = this.props;

    let dropdownClassnames = "dropdown";
    if (this.state.open) {
      dropdownClassnames += " dropdown--open";
    }

    return (
      <>
        <div>
          <nav className="navbar">
            <div className="title__search">
              <div className="title" onClick={this.goToHome}>
                Mello
              </div>
              {this.props.username && (
                <div className="search__list">
                  <input
                    autoComplete="off"
                    className="searchbar"
                    onChange={this.updateState}
                    name="searchbar"
                    type="text"
                    placeholder="Search for User..."
                    value={this.state.searchbar}
                  />
                  <div className={dropdownClassnames}>
                    <ul className="dropdown__list">
                      {users.map(user => {
                        return (
                          <div key={user.user_id}>
                            <li
                              className="dropdown__item"
                              onClick={() =>
                                this.goToUserProfile(user.username)
                              }
                            >
                              {user.username}
                            </li>
                          </div>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              )}
            </div>
            <ul className="navbar__list">
              <li
                className="navbar__item"
                onClick={() => this.goToProfile(this.props.username)}
              >
                {username}
              </li>
              {this.props.username && (
                <li className="navbar__post" onClick={this.openModal}>
                  Post
                </li>
              )}

              <li className="navbar__item">Menu</li>
            </ul>
          </nav>
        </div>
        <ModalPost />
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    username: state.userReducer.user.username,
    users: state.followsReducer.users
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    {
      getPosts,
      getPostsByProfile,
      getAllPosts,
      searchUser,
      updateState,
      getUserId,
      openModal,
      closeModal,
      resetInput,
      setEdit
    }
  )(Navbar)
);
