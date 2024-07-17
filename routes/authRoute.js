const express = require("express");
const {
  registerController,
  loginController,
  testController,
  forgotPasswordController,
  updateProfileController,
  getOrdersController,
  getAllOrdersController,
  orderStatusController,
} = require("../controllers/authController");
const {
  isAdmin,
  requireSignIn,
  isUser,
} = require("../middleware/authMiddleware");
const router = express.Router();

// Register
router.post("/register", registerController);

// Login
router.post("/login", loginController);

// Forgot Password
router.post("/forgot-password", forgotPasswordController);

// Protected Admin Route
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

// Protected User Route
router.get("/user-auth", requireSignIn, isUser, (req, res) => {
  res.status(200).send({ ok: true });
});

router.put('/profile', requireSignIn, updateProfileController)

router.get("/orders", requireSignIn, getOrdersController);

//all orders
router.get("/all-orders", requireSignIn, isAdmin, getAllOrdersController);

// order status update
router.put(
  "/order-status/:orderId",
  requireSignIn,
  isAdmin,
  orderStatusController
);

module.exports = router;
