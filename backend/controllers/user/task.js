const Task = require("../../models/user/task");

// Testing
exports.test = async (req, res) => {
  res.status(200).json({
    status: "Success",
    message: "Task Added Successful",
  });
};

// Add A Task
exports.add = async (req, res) => {
  const { task } = req.body;
  console.log(req.body);

  const newTask = Task({
    data: req.body.task,
  });

  newTask
    .save()
    .then((data) =>
      res.status(200).json({
        status: "Success",
        data,
        message: "Task Added Successful",
      })
    )
    .catch((err) =>
      res.status(400).json({
        status: "Failed",
        message: "Task Added Failed",
      })
    );
};

//Get All Tasks
exports.getAllTasks = async (req, res) => {
  const data = await Task.find();

  res.status(200).json({
    status: "Success",
    data,
  });
};

// Delete A Task
exports.delete = async (req, res) => {
  const { _id } = req.body;

  await Task.findByIdAndDelete(_id)
    .then(() => {
      res.status(200).json({
        status: "Success",
        message: "Task Deleted",
      });
    })
    .catch((err) => {
      res.status(400).json({
        status: "Success",
        message: "Task Deletion Failed",
      });
    });
};
