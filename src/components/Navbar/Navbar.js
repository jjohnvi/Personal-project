import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {
  getPosts,
  getPostsByProfile,
  getAllPosts
} from "../../redux/PostsReducer/PostsReducer";
import "../Navbar/Navbar.scss";

class Navbar extends Component {
  goToHome = () => {
    if (this.props.username) {
      this.props.getAllPosts().then(() => this.props.history.push("/home"));
    }
  };

  goToProfile = username => {
    this.props
      .getPostsByProfile(username)
      .then(() => this.props.history.push(`/posts/${this.props.username}`));
  };
  render() {
    const { username } = this.props;

    return (
      <div>
        <nav className="navbar">
          <div className="title" onClick={this.goToHome}>
            Mello
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
    username: state.userReducer.user.username
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    { getPosts, getPostsByProfile, getAllPosts }
  )(Navbar)
);
