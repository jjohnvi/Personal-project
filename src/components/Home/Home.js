import React, { Component } from "react";
import { connect } from "react-redux";
import {
  addPost,
  getAllPosts,
  getPost
} from "../../redux/PostsReducer/PostsReducer";
import {
  checkUserLoggedIn,
  updateState,
  logoutUser
} from "../../redux/UserReducer/UserReducer";
import { openModal } from "../../redux/ModalReducer/ModalReducer";
import Posts from "../Posts/Posts";
import "./Home.scss";
import Loader from "../Loader/Loader";
import { Animated } from "react-animated-css";
import waait from "waait";

class Home extends Component {
  constructor() {
    super();
    this.state = {
      image_url: "",
      content: "",
      title: "",
      isVisible: false,
      isVisible2: false
    };
  }

  async componentDidMount() {
    this.props.checkUserLoggedIn().catch(() => this.props.history.push("/"));
    this.toggleVisible(true);
    await waait(4000);
    this.toggleVisible(false);
    await waait(2000);
    this.toggleVisible2(true);
    await waait(4000);
    this.toggleVisible2(false);
    await waait(2000);
    this.toggleVisible(true);
    this.toggleVisible2(true);
  }

  updateState = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  toggleVisible = isVisible => {
    this.setState({ isVisible: isVisible });
  };

  toggleVisible2 = isVisible => {
    this.setState({ isVisible2: isVisible });
  };

  render() {
    return (
      <>
        <Loader loading={this.props.loading} />
        <div className="home">
          {this.props.posts.length < 1 && (
            <div className="intro__background">
              <Animated
                animationIn="fadeInLeft"
                animationOut="fadeOutRight"
                isVisible={this.state.isVisible}
              >
                <div className="no__post animated fadeInLeft">
                  Welcome to mello.
                </div>
              </Animated>

              <Animated
                animationIn="fadeInLeft"
                animationOut="fadeOutRight"
                isVisible={this.state.isVisible2}
              >
                <div className="no__post__2">
                  To get started, follow other users and{" "}
                  <a onClick={this.props.openModal}>make a post.</a>
                </div>
              </Animated>
            </div>
          )}
          <Posts />
        </div>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    posts: state.postsReducer.posts,
    loading: state.postsReducer.loading
  };
};

export default connect(
  mapStateToProps,
  {
    updateState,
    addPost,
    getPost,
    getAllPosts,
    checkUserLoggedIn,
    logoutUser,
    openModal
  }
)(Home);
