import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { updateState } from "../../redux/UserReducer/UserReducer";

class Home extends Component {
  handleLogout = () => {
    axios.get("/auth/logout").then(() => this.props.history.push("/"));
  };
  render() {
    return (
      <>
        <div>Welcome {this.props.username}</div>
        <button onClick={this.handleLogout}>Logout</button>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    username: state.userReducer.username
  };
};

export default connect(
  mapStateToProps,
  { updateState }
)(Home);
