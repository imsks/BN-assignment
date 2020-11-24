import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import config from "../../config";

const BankerDashboard = () => {
  const [usersData, setUsersData] = useState([]);

  useEffect(() => {
    axios({
      method: "get",
      url: `${config.REACT_APP_NODE_API_URL}/api/user/task/get-all-users-data`,
      headers: {
        jwt: localStorage.getItem("banker"),
      },
    })
      .then((res) => {
        // console.log(res.data);
        setUsersData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  console.log(usersData);

  if (!localStorage.getItem("banker")) return <Redirect to="/banker/auth" />;
  return (
    <div>
      <h1>All transactions with their data</h1>
      {usersData.map((user, key) => {
        return (
          <div key={key}>
            <h3>User's Email - {user.email}</h3>
            <h1>User's Balance - {user.amount}</h1>
            <h1>User's Current Balance - {user.currentBalance}</h1>
          </div>
        );
      })}
    </div>
  );
};

export default BankerDashboard;
