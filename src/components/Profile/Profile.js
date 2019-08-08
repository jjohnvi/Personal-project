import React, { Component } from "react";
import { connect } from "react-redux";
import { checkUserLoggedIn } from "../../redux/UserReducer/UserReducer";
import { getPosts } from "../../redux/PostsReducer/PostsReducer";
import { followUser } from "../../redux/FollowsReducer/FollowsReducer";
import Posts from "../Posts/Posts";
import "./Profile.scss";

class Profile extends Component {
  componentDidMount() {
    this.props.checkUserLoggedIn().catch(() => this.props.history.push("/"));
  }

  followUser = () => {
    this.props.followUser(
      this.props.followingUserId && this.props.followingUserId[0].user_id
    );
  };

  render() {
    console.log(this.props);
    return (
      <>
        <div className="profile__post">
          {this.props.username !== this.props.match.params.username ? (
            <button className="follow" onClick={this.followUser}>
              {this.props.following && this.props.following.followed === false
                ? "Follow"
                : "Unfollow"}
            </button>
          ) : null}

          <Posts />
        </div>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    followingUserId: state.userReducer.followingUserId,
    following: state.followsReducer.following,
    username: state.userReducer.user.username
  };
};

export default connect(
  mapStateToProps,
  { checkUserLoggedIn, getPosts, followUser }
)(Profile);
