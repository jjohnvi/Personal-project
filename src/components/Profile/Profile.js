import axios from "axios";
import React, { Component } from "react";
import { connect } from "react-redux";
import {
  addPost,
  getPosts,
  getPost
} from "../../redux/PostsReducer/PostsReducer";

class Profile extends Component {
  componentDidMount() {
    this.props.getPosts();
  }

  goToPost = id => {
    this.props.history.push(`/posts/${id}`);
  };
  render() {
    const { loading, posts } = this.props;
    return (
      <>
        {loading ? (
          <h3>Loading...</h3>
        ) : (
          posts.map(post => {
            return (
              <div onClick={() => this.goToPost(post.post_id)}>
                <div className="post" key={post.post_id}>
                  <img src={post.image_url} alt={post.title} />
                  <h2>{post.title}</h2>
                  <p>{post.content}</p>
                </div>
              </div>
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
  { getPosts, getPost }
)(Profile);
