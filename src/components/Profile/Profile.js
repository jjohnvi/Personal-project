import axios from "axios";
import React, { Component } from "react";
import { connect } from "react-redux";
import {
  addPost,
  getPosts,
  getPost,
  removePost
} from "../../redux/PostsReducer/PostsReducer";

class Profile extends Component {
  componentDidMount() {
    this.props.getPosts();
  }

  goToPost = id => {
    this.props.history.push(`/posts/${id}`);
  };

  removePost = id => {
    this.props.removePost(id).then(() => this.props.getPosts());
  };

  goToHome = () => {
    this.props.history.push("/home");
  };
  render() {
    const { loading, posts } = this.props;
    return (
      <>
        <button onClick={this.goToHome}>Home</button>
        {loading ? (
          <h3>Loading...</h3>
        ) : (
          posts.map(post => {
            return (
              <>
                <div onClick={() => this.goToPost(post.post_id)}>
                  <div className="post" key={post.post_id}>
                    <img src={post.image_url} alt={post.title} />
                    <h2>{post.title}</h2>
                    <p>{post.content}</p>
                  </div>
                </div>
                <button onClick={() => this.removePost(post.post_id)}>
                  Delete
                </button>
              </>
            );
          })
        )}
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
  { getPosts, getPost, removePost }
)(Profile);
