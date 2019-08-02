import axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { updateState, resetFields } from "../../redux/UserReducer/UserReducer";

class Register extends Component {
  clickGoBack = () => {
    this.props.resetFields();
  };

  updateState = e => {
    this.props.updateState({ [e.target.name]: e.target.value });
  };

  handleRegister = e => {
    e.preventDefault();
    axios
      .post("auth/register", {
        username: this.props.username,
        password: this.props.password,
        firstname: this.props.firstname,
        lastname: this.props.lastname
      })
      .then(res => {
        this.props.history.push("/home");
      })
      .catch(err => {
        console.log("Not working");
      });
  };

  render() {
    return (
      <>
        <input
          type="text"
          onChange={this.updateState}
          name="username"
          placeholder="Username"
        />
        <input
          type="password"
          onChange={this.updateState}
          name="password"
          placeholder="Password"
        />
        <input
          type="text"
          onChange={this.updateState}
          name="firstname"
          placeholder="First Name"
        />
        <input
          type="text"
          onChange={this.updateState}
          name="lastname"
          placeholder="Last Name"
        />
        <Link to="/">
          <button onClick={this.clickGoBack}>Go back</button>
        </Link>
        <button onClick={this.handleRegister}>Register!</button>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    username: state.userReducer.username,
    firstname: state.userReducer.firstname,
    lastname: state.userReducer.lastname,
    password: state.userReducer.password
  };
};

export default connect(
  mapStateToProps,
  { updateState, resetFields }
)(Register);
