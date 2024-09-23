const { signup } = require("../controller/auth-controller");

const router = require("express").Router();

router.route("/signup").post(signup);

module.exports = router;
