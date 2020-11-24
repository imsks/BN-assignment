import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import config from "../../config";

const UserDashboard = () => {
  const [type, setType] = useState("");
  const [amount, setMoney] = useState("");
  const [transactionData, setTransationData] = useState([]);
  const [isModified, setIsModified] = useState(false);
  const [message, setMessage] = useState("");

  // Handle Input
  const handleInput = (e) => {
    setMoney(e.target.value);
  };

  // Handle Select Type
  const handleSelectValues = () => {
    if (document.getElementById("type").selectedOptions[0])
      setType(document.getElementById("type").selectedOptions[0].value);
  };

  const handleSubmitTask = () => {
    axios({
      method: "post",
      url: `${config.REACT_APP_NODE_API_URL}/api/user/task/add`,
      data: {
        token: localStorage.getItem("user"),
        type: type === "" ? "Credit" : type,
        amount,
      },
    })
      .then((res) => {
        console.log(res.data);
        setMessage(res.data.message);
        setIsModified(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    axios({
      method: "post",
      url: `${config.REACT_APP_NODE_API_URL}/api/user/task/get-all-tasks`,
      data: {
        token: localStorage.getItem("user"),
      },
    })
      .then((res) => {
        console.log(res.data);
        if (res.data.data) setTransationData(res.data.data);
        setIsModified(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [isModified]);

  const handleDelete = (id) => (e) => {
    axios({
      method: "post",
      url: `${config.REACT_APP_NODE_API_URL}/api/user/task/delete`,
      headers: {},
      data: {
        id,
        token: localStorage.getItem("user"),
      },
    })
      .then(() => {
        setIsModified(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (!localStorage.getItem("user")) return <Redirect to="/user/auth" />;
  return (
    <div>
      <h1>Credit/Debit Money</h1>
      <select id="type" onChange={handleSelectValues}>
        <option value="Credit">Credit</option>
        <option value="Debit">Debit</option>
      </select>
      <input type="number" onChange={handleInput} />
      <button onClick={handleSubmitTask}>Do the task</button>

      {message ? <h1>{message}</h1> : ""}

      {transactionData.map((item, key) => {
        return (
          <div key={key}>
            <h3>
              {item.type} - {item.amount}
            </h3>
            <button onClick={handleDelete(key)}>Delete</button>
          </div>
        );
      })}
    </div>
  );
};

export default UserDashboard;
