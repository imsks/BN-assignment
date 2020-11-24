const router = require("express").Router();
const taskController = require("../../controllers/knex-user/task");
const middleware = require("../../middleware/index");

router.route("/test").get(taskController.test);
router.route("/add").post(taskController.add);
router
  .route("/get-all-tasks")
  .post(taskController.getAllTasks);
router.route("/delete").post(taskController.delete);

router
  .route("/get-all-users-data")
  .get(taskController.getAllUsersData);

module.exports = router;
