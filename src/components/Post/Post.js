import React, { Component } from "react";
import { connect } from "react-redux";
import {
  getPost,
  removePost,
  getPostsByProfile
} from "../../redux/PostsReducer/PostsReducer";
import { checkUserLoggedIn } from "../../redux/UserReducer/UserReducer";
import "./Post.scss";

class Post extends Component {
  componentDidMount() {
    this.getPost(this.props.match.params.id);
    this.props.checkUserLoggedIn().catch(() => this.props.history.push("/"));
  }

  removePost = id => {
    this.props.removePost(id);
  };

  getPost = id => {
    this.props.getPost(id);
  };

  goToUserProfile = username => {
    this.props
      .getPostsByProfile(username)
      .then(() => this.props.history.push(`/posts/${username}`));
  };

  goToHome = () => {
    this.props.history.push("/home");
  };

  render() {
    const { posts, loading } = this.props;
    console.log(this.props);
    return (
      <div>
        <button onClick={this.goToHome}>Home</button>
        <div>
          {loading && <h3>Loading...</h3>}
          {posts[0] && (
            <>
              <div className="post__cont">
                <h2 onClick={() => this.goToUserProfile(posts[0].username)}>
                  {posts[0].username}
                </h2>
                <img src={posts[0].image_url} />
                <h2>{posts[0].title}</h2>
                <p>{posts[0].content}</p>
              </div>
            </>
          )}
        </div>
      </div>
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
  { removePost, getPost, checkUserLoggedIn, getPostsByProfile }
)(Post);
