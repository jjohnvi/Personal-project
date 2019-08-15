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
import {
  updateState,
  getUserId,
  logoutUser,
  getUserBio
} from "../../redux/UserReducer/UserReducer";
import "../Navbar/Navbar.scss";
import ModalPost from "../modalPost/ModalPost";

class Navbar extends Component {
  state = {
    open: false,
    menuOpen: false,
    searchbar: "",
    currentDisplayed: this.props.users
  };

  toggleMenu = () => {
    this.setState({ menuOpen: !this.state.menuOpen });
  };

  closeMenu = () => {
    this.setState({ menuOpen: false });
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
    this.props.getUserBio(this.props.match.params.username);
    this.props
      .getPostsByProfile(username)
      .then(() => this.props.history.push(`/posts/${this.props.username}`));
    this.setState({ menuOpen: false });
  };

  goToUserProfile = username => {
    this.props
      .getPostsByProfile(username)
      .then(() => this.props.getUserId(username))
      .then(() => this.props.history.push(`/posts/${username}`));
    this.setState({ searchbar: "", open: false });
  };

  openModal = () => {
    this.props.setEdit(false);
    this.props.resetInput();
    this.props.openModal();
  };

  handleLogout = () => {
    this.props.logoutUser().then(() => this.props.history.push("/"));
    this.setState({ menuOpen: false });
  };

  render() {
    const { username, users } = this.props;

    let dropdownClassnames = "dropdown";
    if (this.state.open) {
      dropdownClassnames += " dropdown--open";
    }

    let sidebarClassnames = "sidebar";
    if (this.state.menuOpen) {
      sidebarClassnames += " sidebar--open";
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
                <>
                  <li className="navbar__post" onClick={this.openModal}>
                    <i class="material-icons">border_color</i>
                  </li>
                  <li className="navbar__item" onClick={this.toggleMenu}>
                    <i class="material-icons">menu</i>
                  </li>
                </>
              )}
            </ul>
          </nav>
          <div className={sidebarClassnames}>
            <ul>
              <li className="exit__menu" onClick={this.closeMenu}>
                <i class="material-icons">arrow_forward</i>
              </li>
              <li
                className="sidebar__item"
                onClick={() => this.goToProfile(this.props.username)}
              >
                <i class="material-icons">person</i> {username}
              </li>
              <li className="sidebar__item" onClick={this.handleLogout}>
                <i class="material-icons">exit_to_app</i> Logout
              </li>
            </ul>
          </div>
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
      setEdit,
      logoutUser,
      getUserBio
    }
  )(Navbar)
);
