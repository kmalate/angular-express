const router = require("express").Router();

//Use the routes defined in './user.js' for all activity to /users
router.use("/users", require("./users"));

router.use("/tasks", require("./tasks"));

module.exports = router;