import React, { Component } from "react";
import "../Navbar/Navbar.scss";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";

import "../../redux/UserReducer/UserReducer";
import "../../redux/PostsReducer/PostsReducer";

class Navbar extends Component {
  goToHome = () => {
    this.props.history.push("/home");
  };
  render() {
    const { username, location } = this.props;
    console.log(this.props);

    return (
      <div>
        <nav className="navbar">
          <div className="title" onClick={this.goToHome}>
            Mello
          </div>
          <ul className="navbar__list">
            {!location.pathname === "/login" ? (
              <li className="navbar__item">{username}</li>
            ) : null}
            <li className="navbar__item">Two</li>
            <li className="navbar__item">Three</li>
            <li className="navbar__item">Four</li>
          </ul>
        </nav>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    username: state.userReducer.username
  };
};

export default withRouter(connect(mapStateToProps)(Navbar));
