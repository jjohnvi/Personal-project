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
import { openModal, toggleSearch } from "../../redux/ModalReducer/ModalReducer";
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
    await waait(1000);
    this.toggleVisible(true);
    await waait(3000);
    this.toggleVisible(false);
    await waait(1000);
    this.toggleVisible2(true);

    // this.toggleVisible(true);
    // this.toggleVisible2(true);
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

  toggleSearch = () => {
    this.props.toggleSearch(!this.props.searchOpen);
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
                className="no__post"
              >
                <div className="">Welcome to mello.</div>
              </Animated>

              <Animated
                animationIn="fadeInLeft"
                animationOut="fadeOutRight"
                isVisible={this.state.isVisible2}
                className="no__post__2"
              >
                <div>
                  To get started,{" "}
                  <a onClick={this.toggleSearch}>follow other users</a> or{" "}
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
    loading: state.postsReducer.loading,
    searchOpen: state.modalReducer.searchOpen
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
    openModal,
    toggleSearch
  }
)(Home);
