import React from "react";

const Homepage = () => {
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
