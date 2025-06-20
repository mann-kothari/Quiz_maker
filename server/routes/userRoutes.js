const express = require("express");
const router = express.Router();
const {
  registerUser,
  getUserProfile,
} = require("../controllers/userController");

router.post("/register", registerUser);
router.get("/:uid", getUserProfile);

module.exports = router;
