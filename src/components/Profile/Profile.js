import React, { Component } from "react";
import { connect } from "react-redux";
import { checkUserLoggedIn } from "../../redux/UserReducer/UserReducer";
import Posts from "../Posts/Posts";
import "./Profile.scss";

class Profile extends Component {
  componentDidMount() {
    this.props.checkUserLoggedIn().catch(() => this.props.history.push("/"));
  }

  goToHome = () => {
    this.props.history.push("/home");
  };
  render() {
    return (
      <>
        <button onClick={this.goToHome}>Home</button>
        <div className="profile__post">
          <Posts />
        </div>
      </>
    );
  }
}

export default connect(
  null,
  { checkUserLoggedIn }
)(Profile);
