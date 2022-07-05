const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getMe,
  findAll,
} = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

router.post("/", registerUser);
router.get("/", findAll);
router.post("/login", loginUser);
router.get("/me", protect, getMe);

module.exports = router;
