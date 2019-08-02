import React, { Component } from "react";
import { connect } from "react-redux";
import { updateState } from "../../redux/UserReducer/UserReducer";
import axios from "axios";
import { Link } from "react-router-dom";

class Login extends Component {
  state = {
    error: false
  };

  handleChange = e => {
    this.props.updateState({ [e.target.name]: e.target.value });
  };

  clickLogin = e => {
    e.preventDefault();
    axios
      .post("/auth/login", {
        username: this.props.username,
        password: this.props.password
      })
      .then(res => {
        this.props.history.push("/home");
      })
      .catch(err => {
        console.log("Error");
        this.setState({ error: true });
      });
  };

  render() {
    return (
      <form className="loginForm" type="submit" onSubmit={this.clickLogin}>
        <input
          type="text"
          onChange={this.handleChange}
          name="username"
          placeholder="Username"
        />
        <input
          type="password"
          onChange={this.handleChange}
          name="password"
          placeholder="Password"
        />
        <div>
          <button type="submit">Login</button>
          <Link to="/register">
            <button>Register</button>
          </Link>
        </div>
        {this.state.error ? <h3>Wrong username & password</h3> : null}
      </form>
    );
  }
}

const mapStateToProps = state => {
  return {
    username: state.userReducer.username,
    password: state.userReducer.password
  };
};

export default connect(
  mapStateToProps,
  { updateState }
)(Login);
