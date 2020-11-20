const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const TaskSchema = new Schema({
  data: {
    type: String,
  },
});

const Task = mongoose.model("Tasks", TaskSchema);

module.exports = Task;
