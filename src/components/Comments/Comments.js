import React, { Component } from "react";
import { connect } from "react-redux";

class Comments extends Component {
  constructor() {
    super();
    this.state = { editStatus: false };
  }
  handleClickUpdateComment = comment => {
    console.log(comment);
    this.setState({ editStatus: true });
    this.props.populateComment(comment);
  };
  render() {
    console.log(this.props.comment);
    return (
      <div
        className="comment__username__cont"
        key={this.props.comment.comment_id}
      >
        <div
          className="username__div"
          onClick={() =>
            this.props.goToUserProfile(this.props.posts[0].username)
          }
        >
          {this.props.comment.username}:
        </div>

        {this.props.comment.username === this.props.username ? (
          <>
            {this.state.editStatus === false ? (
              <>
                <div className="comment__div">{this.props.comment.comment}</div>
                <button
                  className="comment__delete"
                  onClick={() =>
                    this.props.deleteComment(this.props.comment.comment_id)
                  }
                >
                  <i class="material-icons">delete</i>
                </button>
                <button
                  className="comment__edit"
                  onClick={() =>
                    this.handleClickUpdateComment(this.props.comment.comment)
                  }
                >
                  edit
                </button>
              </>
            ) : (
              <div className="edit__comment__input__cont">
                <input
                  className="edit__comment__input"
                  type="text"
                  value={this.props.comment_edit}
                  onChange={this.props.handleEditOnChange}
                  name="comment_edit"
                />
                <button
                  className="edit__comment__input__button"
                  onClick={() =>
                    this.props.updateComment(this.props.comment.comment_id)
                  }
                >
                  <i class="material-icons">send</i>
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="comment__div">{this.props.comment.comment}</div>
        )}
      </div>
    );
  }
}

export default Comments;
