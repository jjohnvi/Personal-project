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

  getPostsByProfile = id => {
    this.props.getPostsByProfile(id);
  };

  goToHome = () => {
    this.props.history.push("/home");
  };
  render() {
    return (
      <>
        <div className="profile__post">Hello</div>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    username: state.userReducer.user.username,
    posts: state.postsReducer.posts
  };
};

export default connect(
  mapStateToProps,
  { checkUserLoggedIn, getPostsByProfile }
)(UserProfile);
