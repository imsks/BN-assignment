import React, { useState } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { userSignIn } from "../../store/actions/authActions";

const UserAuth = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Handle Input
  const handleInput = (e) => {
    const { name, value } = e.currentTarget;
    // console.log(e.currentTarget.name);
    switch (name) {
      case "email":
        setEmail(value);
        break;
      case "value":
        setPassword(value);
        break;
      default:
        break;
    }
  };

  const handleSignIn = (e) => {
    e.preventDefault();
    props.userSignIn({
      email,
      password,
    });
  };

  const { id, error } = props;
  console.log(id);
  if (id) return <Redirect to="/user/dashboard" />;
  return (
    <div>
      <h1>Log in to see dashboard</h1>
      <input type="email" name="email" onChange={handleInput} />
      <input type="password" name="value" onChange={handleInput} />
      <button onClick={handleSignIn}>Log in</button>

      {error ? <h1>{error}</h1> : ""}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    id: localStorage.getItem("user"),
    error: state.auth.authError,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    userSignIn: (credentials) => dispatch(userSignIn(credentials)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserAuth);
