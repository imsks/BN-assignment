const router = require("express").Router();
const taskController = require("../../controllers/user/task");
const middleware = require("../../middleware/index");
const Error = require("../../utils/errors");

router.route("/test").get(taskController.test);
router.route("/add").post(taskController.add);
router
  .route("/get-all-tasks")
  .get(middleware.verify,  taskController.getAllTasks);
router.route("/delete").post(taskController.delete);

module.exports = router;
