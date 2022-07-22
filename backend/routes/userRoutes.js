const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getMe,
  findAll,
  forgetPassword,
  authenticateResetPassword,
  updatePassword,
} = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

router.post("/", registerUser);
router.get("/", findAll);
router.post("/login", loginUser);
router.get("/me", protect, getMe);
router.post("/forgetPassword", forgetPassword);
router.get("/reset/:token", authenticateResetPassword);
router.patch("/updatePasswordViaEmail", updatePassword);

module.exports = router;
