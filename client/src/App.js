// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const App = () => {
//   const [task, setTask] = useState("");
//   const [allTasks, setAllTasks] = useState([]);
//   const [isModified, setIsModified] = useState(false);

//   const handleInput = (e) => {
//     setTask(e.target.value);
//   };

//   const handleAddTask = (e) => {
//     e.preventDefault();
//     axios({
//       method: "post",
//       url: `http://localhost:8000/api/user/task/add`,
//       data: {
//         task,
//       },
//     })
//       .then((res) => {
//         // console.log(res.data);
//         setIsModified(true);
//       })
//       .catch((err) => {});
//   };

//   useEffect(() => {
//     axios({
//       method: "post",
//       url: `http://localhost:8000/api/user/task/get-all-tasks`,
//       data: {
//         task,
//       },
//     })
//       .then((res) => {
//         // console.log(res.data);
//         setAllTasks(res.data.data);
//         setIsModified(false);
//       })
//       .catch((err) => {});
//   }, [isModified]);

//   const deleteTask = (_id) => (e) => {
//     // console.log(key);

//     axios({
//       method: "post",
//       url: `http://localhost:8000/api/user/task/delete`,
//       data: {
//         _id,
//       },
//     })
//       .then((res) => {
//         console.log(res.data);
//         setIsModified(true);
//       })
//       .catch((err) => {
//         console.log(err)
//       });
//   };

//   return (
//     <div className="App">
//       <div>
//         <h1>Add Task</h1>
//         <input type="text" onChange={handleInput} name="task" />
//         <button onClick={handleAddTask}>Add</button>
//       </div>
//       <div>
//         {allTasks.map((task, key) => {
//           return (
//             <div key={key}>
//               <h1>{task.data}</h1>
//               <button onClick={deleteTask(task._id)}>Delete</button>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default App;

import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";

import UserAuth from "./pages/user/Auth";
import BankerAuth from "./pages/banker/Auth";

import UserDashboard from "./pages/user/Dashboard";
import BankerDashboard from "./pages/banker/Dashboard";

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Homepage} />
        <Route exact path="/user/auth" component={UserAuth} />
        <Route exact path="/banker/auth" component={BankerAuth} />

        <Route exact path="/user/dashboard" component={UserDashboard} />
        <Route exact path="/banker/dashboard" component={BankerDashboard} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
