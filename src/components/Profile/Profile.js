import React, { Component } from "react";
import { connect } from "react-redux";
import {
  checkUserLoggedIn,
  getUserBio,
  editUserBio,
  populateBio,
  handleBioOnChange
} from "../../redux/UserReducer/UserReducer";
import { getPosts } from "../../redux/PostsReducer/PostsReducer";
import { followUser } from "../../redux/FollowsReducer/FollowsReducer";
import { uploadPic } from "../../redux/PictureReducer/PictureReducer";
import Posts from "../Posts/Posts";
import "./Profile.scss";

class Profile extends Component {
  state = {
    imageArr: [],
    image_url: "",
    edit: false
  };

  componentDidMount() {
    this.props.checkUserLoggedIn().catch(() => this.props.history.push("/"));
    this.props.getUserBio(this.props.match.params.username);
    console.log(this.props.username);
    console.log(this.props.match.params.username);
    console.log(this.props.userBio);
  }

  followUser = () => {
    this.props.followUser(
      this.props.followingUserId && this.props.followingUserId[0].user_id
    );
  };

  checkUploadResult = async (error, resultEvent) => {
    if (resultEvent.event === "success") {
      await this.setState({ image_url: resultEvent.info.secure_url });
      await this.props.uploadPic(this.state.image_url);
    }
  };

  onClickEdit = bio => {
    console.log(bio);
    this.setState({ edit: true });
    this.props.populateBio(bio);
  };

  onClickSave = () => {
    this.setState({ edit: false });
    this.editUserBio(this.props.match.params.username);
  };

  submitPicture = () => {
    this.props.uploadPic(this.state.image_url);
    this.setState({ image_url: "" });
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleBioOnChange = e => {
    this.props.handleBioOnChange(e.target.value);
  };

  editUserBio = username => {
    this.props.editUserBio(username, this.props.edit_UserBio).then(() => {
      this.props.getUserBio(this.props.match.params.username);
    });
  };

  render() {
    console.log(this.props);
    console.log(this.props.editUserBio);
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

    return (
      <>
        <div className="bio__with__posts">
          <div className="profile__post">
            <div className="profile__about__cont">
              {this.props.username !== this.props.match.params.username ? (
                <button className="follow" onClick={this.followUser}>
                  {this.props.following &&
                  this.props.following.followed === false
                    ? "Follow"
                    : "Followed"}
                </button>
              ) : null}
              {this.props.userPic !== null ? (
                <img
                  src={this.props.userPic}
                  alt="oops"
                  className="profile__bio__pic"
                />
              ) : (
                <img
                  className="profile__pic"
                  src="https://res.cloudinary.com/john-personal-proj/image/upload/v1565478265/mello/kw5qxmbgea2ppbncuibt.png"
                />
              )}

              {this.state.edit === true ? (
                <div className="upload__cont">
                  <button
                    className="choose__photo"
                    onClick={() => widget.open()}
                  >
                    Choose Photo
                  </button>
                  <div className="photo__input">
                    <input
                      type="url"
                      onChange={this.handleChange}
                      text="image_url"
                      value={this.state.image_url}
                    />
                    <img src={this.state.image_url} />
                    <button
                      className="submit__pic"
                      onClick={this.submitPicture}
                    >
                      <i class="material-icons">cloud_upload</i>
                    </button>
                  </div>
                </div>
              ) : null}
              <div className="name__bio">
                {this.props.match.params.username}
                {this.state.edit === true ? (
                  <textarea
                    rows="8"
                    cols="30"
                    className="input__bio__edit"
                    type="text"
                    onChange={this.handleBioOnChange}
                    value={this.props.edit_UserBio}
                  />
                ) : (
                  <div className="userBio">{this.props.userBio}</div>
                )}
              </div>
              {this.props.username === this.props.match.params.username ? (
                <>
                  {this.state.edit === false ? (
                    <button
                      onClick={() => this.onClickEdit(this.props.userBio)}
                      className="edit__bio__pic"
                    >
                      Edit
                    </button>
                  ) : (
                    <button
                      onClick={this.onClickSave}
                      className="edit__bio__pic"
                    >
                      Save
                    </button>
                  )}
                </>
              ) : null}
            </div>
          </div>
          <div className="underline" />
          <Posts />
          {this.props.posts.length < 1 && (
            <div className="no__post">You have not made a post!</div>
          )}
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
    image_url: state.pictureReducer.image_url,
    userBio: state.userReducer.userBio,
    edit_UserBio: state.userReducer.editUserBio,
    posts: state.postsReducer.posts,
    userPic: state.userReducer.userPic
  };
};

export default connect(
  mapStateToProps,
  {
    checkUserLoggedIn,
    getPosts,
    followUser,
    uploadPic,
    getUserBio,
    editUserBio,
    handleBioOnChange,
    populateBio
  }
)(Profile);
