const express = require("express");
const router = express.Router();

const { authenticate } = require("../middleware/authenticate");

const { signup } = require("../controllers/signup");
const { signin } = require("../controllers/signin");
const { resetPassword } = require("../controllers/resetPassword");
const { updateUserInfo } = require("../controllers/updateUserInfo");

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/resetPassword", authenticate, resetPassword);
router.put("/updateUserInfo", authenticate, updateUserInfo);

module.exports = router;
