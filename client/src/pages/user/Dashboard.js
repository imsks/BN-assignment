import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";

const UserDashboard = () => {
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
      <h1>Credit/Debit Money</h1>
      <select>
        <option>Credit</option>
        <option>Debit</option>
      </select>
      <input type="number" onChange={handleInput} />
      <button onClick={handleSubmitTask}>Do the task</button>
    </div>
  );
};

export default UserDashboard;
