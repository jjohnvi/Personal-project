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
    const { posts, loading } = this.props;
    console.log(posts);

    return (
      <>
        {/* {posts[0].user_id === posts[0]} */}
        <div className="profile__post">
          <div className="follow">Follow</div>
          <Posts />
        </div>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    posts: state.postsReducer.posts
  };
};

export default connect(
  mapStateToProps,
  { checkUserLoggedIn, getPosts }
)(Profile);
