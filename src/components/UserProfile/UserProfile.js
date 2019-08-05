import React, { Component } from "react";
import { connect } from "react-redux";
import { checkUserLoggedIn } from "../../redux/UserReducer/UserReducer";
import { getPostsByProfile } from "../../redux/PostsReducer/PostsReducer";
import Posts from "../Posts/Posts";

class UserProfile extends Component {
  componentDidMount() {
    this.getPostsByProfile(this.props.match.params.id);
    this.props.checkUserLoggedIn().catch(() => this.props.history.push("/"));
  }

  goToHome = () => {
    this.props.history.push("/home");
  };
  render() {
    return (
      <>
        <div className="profile__post">
          <Posts />
        </div>
      </>
    );
  }
}

export default connect(
  null,
  { checkUserLoggedIn, getPostsByProfile }
)(UserProfile);
