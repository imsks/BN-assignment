import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import config from "../../config";

const UserDashboard = () => {
  const [type, setType] = useState("");
  const [money, setMoney] = useState("");
  const [transactionData, setTransationData] = useState({});
  const [isModified, setIsModified] = useState(false);

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
      headers: {
        jwt: localStorage.getItem("user"),
      },
      data: {
        type: type === "" ? "credit" : type,
        money,
      },
    })
      .then((res) => {
        console.log(res.data);
        setIsModified(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    axios({
      method: "get",
      url: `${config.REACT_APP_NODE_API_URL}/api/user/task/get-all-tasks`,
      headers: {
        jwt: localStorage.getItem("user"),
      },
    })
      .then((res) => {
        console.log(res.data.data);
        if (res.data.data) setTransationData(res.data.data);
        setIsModified(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [isModified]);

  const handleDelete = (_id) => (e) => {
    axios({
      method: "post",
      url: `${config.REACT_APP_NODE_API_URL}/api/user/task/delete`,
      headers: {
        jwt: localStorage.getItem("user"),
      },
      data: {
        _id,
        email: transactionData.email,
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
        <option value="credit">Credit</option>
        <option value="debit">Debit</option>
      </select>
      <input type="number" onChange={handleInput} />
      <button onClick={handleSubmitTask}>Do the task</button>

      {Object.keys(transactionData).length !== 0 ? (
        <div>
          <h1>Email - {transactionData.email}</h1>
          <h1>You have {transactionData.balance} in your account</h1>
          <h2>Transation History</h2>
          {transactionData.history.map((transaction, key) => {
            return (
              <div key={key}>
                <h3>
                  {transaction.type} - {transaction.money}
                </h3>
                <button onClick={handleDelete(transaction._id)}>Delete</button>
              </div>
            );
          })}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default UserDashboard;
