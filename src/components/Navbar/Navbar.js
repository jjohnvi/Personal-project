import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { searchUser } from "../../redux/FollowsReducer/FollowsReducer";
import {
  getAllPosts,
  getPosts,
  getPostsByProfile
} from "../../redux/PostsReducer/PostsReducer";
import { updateState } from "../../redux/UserReducer/UserReducer";
import "../Navbar/Navbar.scss";

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
  };

  searchUser = e => {
    e.preventDefault();
    this.props.searchUser(this.state.searchbar);
    this.toggleMenu();
  };

  goToProfile = username => {
    this.props
      .getPostsByProfile(username)
      .then(() => this.props.history.push(`/posts/${this.props.username}`));
  };
  render() {
    const { username, users } = this.props;

    let dropdownClassnames = "dropdown";
    if (this.state.open) {
      dropdownClassnames += " dropdown--open";
    }

    return (
      <div>
        <nav className="navbar">
          <div className="title__search">
            <div className="title" onClick={this.goToHome}>
              Mello
            </div>
            {this.props.username && (
              <div className="search__list">
                <form
                  className="search__form"
                  type="submit"
                  onSubmit={this.searchUser}
                >
                  <input
                    autoComplete="off"
                    className="searchbar"
                    onChange={this.updateState}
                    name="searchbar"
                    type="text"
                    placeholder="Search for User..."
                    value={this.state.searchbar}
                  />
                </form>
                <div className={dropdownClassnames}>
                  <ul className="dropdown__list">
                    {users.map(user => {
                      return (
                        <div key={user.user_id}>
                          <li className="dropdown__item">{user.username}</li>
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
            <li className="navbar__item">post</li>
            <li className="navbar__item">Menu</li>
          </ul>
        </nav>
      </div>
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
    { getPosts, getPostsByProfile, getAllPosts, searchUser, updateState }
  )(Navbar)
);
