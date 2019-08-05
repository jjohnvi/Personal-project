import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { getPosts } from "../../redux/PostsReducer/PostsReducer";
import "../Navbar/Navbar.scss";

class Navbar extends Component {
  goToHome = () => {
    if (this.props.username) {
      this.props.history.push("/home");
    }
  };

  goToProfile = () => {
    this.props.getPosts().then(() => this.props.history.push("/profile"));
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
            <li className="navbar__item" onClick={this.goToProfile}>
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
    { getPosts }
  )(Navbar)
);
