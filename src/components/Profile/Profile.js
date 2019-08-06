import React, { Component } from "react";
import { connect } from "react-redux";
import { checkUserLoggedIn } from "../../redux/UserReducer/UserReducer";
import { getPosts } from "../../redux/PostsReducer/PostsReducer";
import Posts from "../Posts/Posts";
import "./Profile.scss";

class Profile extends Component {
  componentDidMount() {
    // this.props.getPosts();
    this.props.checkUserLoggedIn().catch(() => this.props.history.push("/"));
  }

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
  { checkUserLoggedIn, getPosts }
)(Profile);
