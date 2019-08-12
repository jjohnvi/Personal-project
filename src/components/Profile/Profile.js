import React, { Component } from "react";
import { connect } from "react-redux";
import { checkUserLoggedIn } from "../../redux/UserReducer/UserReducer";
import { getPosts } from "../../redux/PostsReducer/PostsReducer";
import { followUser } from "../../redux/FollowsReducer/FollowsReducer";
import { uploadPic } from "../../redux/PictureReducer/PictureReducer";
import Posts from "../Posts/Posts";
import "./Profile.scss";

class Profile extends Component {
  state = {
    imageArr: [],
    image_url: ""
  };

  componentDidMount() {
    this.props.checkUserLoggedIn().catch(() => this.props.history.push("/"));
  }

  followUser = () => {
    this.props.followUser(
      this.props.followingUserId && this.props.followingUserId[0].user_id
    );
  };

  checkUploadResult = async (error, resultEvent) => {
    console.log(resultEvent.info.secure_url);
    if (resultEvent.event === "success") {
      await this.setState({ image_url: resultEvent.info.secure_url });
      await this.props.uploadPic(this.state.image_url);
    }
  };

  submitPicture = () => {
    this.props.uploadPic(this.state.image_url);
    this.setState({ image_url: "" });
  };

  render() {
    const widget = window.cloudinary.createUploadWidget(
      {
        cloudName: "john-personal-proj",
        uploadPreset: "mello-profile",
        sources: ["local", "url", "dropbox", "facebook", "instagram"]
      },
      (error, result) => {
        this.checkUploadResult(error, result);
      }
    );

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

          {this.props.username === this.props.match.params.username ? (
            <div>
              <button onClick={() => widget.open()}>Choose Photo</button>
              <div>
                <input
                  type="url"
                  text="image_url"
                  value={this.state.image_url}
                />
                <img src={this.state.image_url} />
                <button onClick={this.submitPicture}>Upload</button>
              </div>
            </div>
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
    username: state.userReducer.user.username,
    image_url: state.pictureReducer.image_url
  };
};

export default connect(
  mapStateToProps,
  { checkUserLoggedIn, getPosts, followUser, uploadPic }
)(Profile);
