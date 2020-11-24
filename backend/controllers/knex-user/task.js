const knex = require("../../knexfile");

// Testing
exports.test = async (req, res) => {
  // console.log(knex)
  knex("auth")
    .insert({ email: "aaaa", hashedPassword: "baaa", isBanker: true })
    .then(() => {
      res.status(200).json({
        status: "Success",
        message: "This route is only for testing purpose.",
      });
    });
};

// Add A User
exports.add = async (req, res, next) => {
  const { token, type, amount } = req.body;
  

  const user = await knex.select("email").from("auth").where("token", token);
  

  // User Exists
  if (user.length > 0) {
    const isTaskExists = await knex
      .select("type", "amount", "currentBalance")
      .from("task")
      .where("email", user[0].email);

      

    if (isTaskExists.length === 0) {
      if (1000 - amount > 0 && type === "Debit") {
        knex("task")
          .insert({
            email: user[0].email,
            type,
            amount,
            currentBalance: 1000 - parseInt(amount),
          })
          .then(() => {
            res.status(200).json({
              status: "Success",
              message: "Task Saved",
            });
          });
      } else if (type === "Credit") {
        console.log(amount)
        knex("task")
          .insert({
            email: user[0].email,
            type,
            amount,
            currentBalance: 1000 + parseInt(amount),
          })
          .then(() => {
            res.status(200).json({
              status: "Success",
              message: "Task Saved",
            });
          });
      } else {
        console.log( type)
        res.status(200).json({
          status: "Success",
          message: "Not suffcient balance",
        });
      }
    } else {
      const currentBalance =
        isTaskExists[isTaskExists.length - 1].currentBalance;
      // console.log(isTaskExists);

      switch (type) {
        case "Debit":
          // Check if amount avialble to debit
          if (currentBalance - parseInt(amount) > 0) {
            console.log(type);
            knex("task")
              .insert({
                email: user[0].email,
                type,
                amount,
                currentBalance: currentBalance - parseInt(amount),
              })
              .then(() => {
                res.status(200).json({
                  status: "Success",
                  message: "Task Saved",
                });
              });
          } else {
            res.status(200).json({
              status: "Success",
              message: "Not suffcient balance",
            });
          }
          break;

        case "Credit":
          /// For Credit
          if (type === "Credit") {
            console.log(type);
            knex("task")
              .insert({
                email: user[0].email,
                type,
                amount,
                currentBalance: parseInt(currentBalance) + parseInt(amount),
              })
              .then(() => {
                res.status(200).json({
                  status: "Success",
                  message: "Task Saved",
                });
              });
            break;
          }
      }
    }
  } else {
    res.status(200).json({
      status: "Success",
      message: "No user found",
    });
  }
};

//Get All Users
exports.getAllTasks = async (req, res) => {
  const { token } = req.body;  
  

  const user = await knex.select("email").from("auth").where("token", token);
  console.log(user)
  // User Exists
  const data = await knex
    .select("type", "amount", "currentBalance")
    .from("task")
    .where("email", user[0].email);

  // console.log(data);

  const payload = [];

  data.map((item) => {
    // console.log(item);
    payload.push({
      type: item.type,
      amount: item.amount,
      currentBalance: item.currentBalance,
    });
  });

  res.status(200).json({
    status: "Success",
    data: payload,
  });
};

// Delete A User
exports.delete = async (req, res) => {
  const { id, token } = req.body;
  console.log(id);

  const user = await knex.select("email").from("auth").where("token", token);

  const data = await knex
    .select("type", "amount", "currentBalance")
    .from("task")
    .where("email", user[0].email);

  console.log(data[id]);

  if (data[id] !== undefined) {
    knex
      .delete()
      .from("task")
      .where("amount", data[id].amount)
      .then(() => {
        res.status(200).json({
          status: "Success",
          message: "Task Deleted",
        });
      });
  } else {
    res.status(200).json({
      status: "Success",
      message: "Nothing to delete",
    });
  }
};

//Get All Users
exports.getAllUsersData = async (req, res) => {
  const data = await knex.select("*").from("task");

  const payload = [];
  data.map((item) => {
    payload.push(item);
  });

  res.status(200).json({
    status: "Success",
    data: payload,
  });
};
