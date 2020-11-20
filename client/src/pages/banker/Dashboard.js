import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";

const BankerDashboard = () => {
  const [option, setOption] = useState("");
  const [money, setMoney] = useState("");

  // Handle Input
  const handleInput = (e) => {
    const { name, value } = e.currentTarget;
    console.log(e.currentTarget);
  };

  const handleSubmitTask = () => {
    console.log(money, option);
  };
  if (!localStorage.getItem("banker")) return <Redirect to="/banker/auth" />;
  return (
    <div>
      <h1>All users with their data</h1>
    </div>
  );
};

export default BankerDashboard;
