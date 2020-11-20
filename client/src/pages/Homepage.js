import React from "react";
import { Redirect } from "react-router-dom";

const Homepage = () => {
  if (localStorage.getItem("banker"))
    return <Redirect to="/banker/dashboard" />;
  if (localStorage.getItem("user")) return <Redirect to="/user/dashboard" />;
  return (
    <div>
      <div>
        <h1>Are you a user?</h1>
        <a href="/user/auth">Login as user</a>
      </div>
      <div>
        <h1>Are you a banker?</h1>
        <a href="/banker/auth">Login as banker</a>
      </div>
    </div>
  );
};

export default Homepage;
