import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { removePost, getPost } from "../../redux/PostsReducer/PostsReducer";

class Post extends Component {
  componentDidMount() {
    console.log(this.props.match.params.id);
    this.getPost(this.props.match.params.id);
  }

  removePost = id => {
    this.props.removePost(id);
  };

  getPost = id => {
    this.props.getPost(id);
  };

  goToHome = () => {
    this.props.history.push("/home");
  };

  render() {
    const { posts, loading } = this.props;
    return (
      <div>
        <button onClick={this.goToHome}>Home</button>
        <div>
          {loading && <h3>Loading...</h3>}
          {posts[0] && (
            <>
              <img src={posts[0].image_url} />
              <h2>{posts[0].title}</h2>
              <p>{posts[0].content}</p>
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
  { removePost, getPost }
)(Post);
