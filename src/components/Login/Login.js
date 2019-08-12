import React, { Component } from "react";
import { connect } from "react-redux";
import { updateState, loginUser } from "../../redux/UserReducer/UserReducer";
import { Link } from "react-router-dom";
import "./../Login/Login.scss";
import Loader from "../Loader/Loader";

class Login extends Component {
  state = {
    error: false
  };

  handleChange = e => {
    this.props.updateState({ [e.target.name]: e.target.value });
  };

  clickLogin = e => {
    e.preventDefault();
    this.props
      .loginUser(this.props.username, this.props.password)
      .then(() => {
        this.props.history.push("/home");
      })
      .catch(() => {
        console.log("Error");
        this.setState({ error: true });
      });
  };

  render() {
    return (
      <div className="login__cont">
        <form className="login__form" type="submit" onSubmit={this.clickLogin}>
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
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    username: state.userReducer.username,
    password: state.userReducer.password,
    loading: state.userReducer.loading
  };
};

export default connect(
  mapStateToProps,
  { updateState, loginUser }
)(Login);
