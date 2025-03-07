const express = require("express");
const { userRegister, postLogin, protectedRoute } = require("../controllers/chatbotController");

const router = express.Router();

// Register User
router.post("/register", userRegister);

// Login User Generate Firebase Custom Token
router.post("/login", postLogin);

// Protect Route 
router.get("/protected", protectedRoute);

module.exports = router;
