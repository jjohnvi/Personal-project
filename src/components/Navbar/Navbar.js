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
  setEdit,
  toggleSearch
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
    currentDisplayed: this.props.users,
    searchOpen: false
  };

  toggleMenu = () => {
    this.setState({ menuOpen: !this.state.menuOpen });
  };

  closeMenu = () => {
    this.setState({ menuOpen: false });
  };

  openSearch = () => {
    this.props.toggleSearch(!this.props.searchOpen);
  };

  goToHome = () => {
    if (this.props.username) {
      this.props.getAllPosts().then(() => this.props.history.push("/home"));
    }
    this.setState({ menuOpen: false });
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

  goToProfile = async () => {
    await this.props.getUserBio(this.props.username);
    await this.props.getPostsByProfile(this.props.username);
    await this.props.history.push(`/posts/${this.props.username}`);
    this.setState({ menuOpen: false });
  };

  goToUserProfile = async username => {
    await this.props.getUserBio(username);
    await this.props.getPostsByProfile(username);
    await this.props.getUserId(username);
    await this.props.history.push(`/posts/${username}`);
    this.setState({ searchbar: "", open: false });
    this.props.toggleSearch(!this.props.searchOpen);
    this.setState({ menuOpen: false });
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

    let searchMenuClassnames = "searchmenu";
    if (this.props.searchOpen) {
      searchMenuClassnames += " searchmenu--open";
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
                  <button
                    className="search__button__1"
                    onClick={this.openSearch}
                  >
                    <i className="material-icons">search</i>
                  </button>
                </div>
              )}
            </div>
            <ul className="navbar__list">
              <li className="navbar__item__1" onClick={this.goToProfile}>
                {username}
              </li>
              {this.props.username && (
                <>
                  <li className="navbar__post" onClick={this.openModal}>
                    <i className="material-icons">border_color</i>
                  </li>
                  <li className="navbar__item__2" onClick={this.toggleMenu}>
                    <i className="material-icons">menu</i>
                  </li>
                </>
              )}
            </ul>
          </nav>
          <div className={sidebarClassnames}>
            <ul>
              <li className="exit__menu" onClick={this.closeMenu}>
                <i className="material-icons">arrow_forward</i>
              </li>
              <li className="sidebar__item" onClick={this.goToProfile}>
                <i className="material-icons">person</i> {username}
              </li>
              <li className="sidebar__item" onClick={this.handleLogout}>
                <i className="material-icons">exit_to_app</i> Logout
              </li>
            </ul>
          </div>

          <div className={searchMenuClassnames}>
            <div className="search__input__dropdown">
              <div className="search__input__button">
                <input
                  autoComplete="off"
                  className="searchbar"
                  onChange={this.updateState}
                  name="searchbar"
                  type="text"
                  placeholder="Search for User"
                  value={this.state.searchbar}
                />
                <button className="button-default search__button__2">
                  <i className="material-icons">search</i>
                </button>
                <button
                  className="button-default exit__button"
                  onClick={this.openSearch}
                >
                  <i className="material-icons">close</i>
                </button>
              </div>
              <div className={dropdownClassnames}>
                <ul className="dropdown__list">
                  {users.map(user => {
                    return (
                      <div className="dropdown__name" key={user.user_id}>
                        <li
                          className="dropdown__item"
                          onClick={() => this.goToUserProfile(user.username)}
                        >
                          {user.profile_pic !== null ? (
                            <img
                              src={user.profile_pic}
                              alt="oops"
                              className="dropdown__item-profile-pic"
                            />
                          ) : (
                            <i className="material-icons">person</i>
                          )}
                          {user.username}
                        </li>
                      </div>
                    );
                  })}
                </ul>
              </div>
            </div>
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
    users: state.followsReducer.users,
    searchOpen: state.modalReducer.searchOpen
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
      getUserBio,
      toggleSearch
    }
  )(Navbar)
);
