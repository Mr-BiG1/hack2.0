const express = require("express");
const { auth, db } = require("../config/firebase");
const router = express.Router();

// Register User
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const userRecord = await auth.createUser({
      email,
      password,
      displayName: name,
    });

    // Store user in Firestore
    await db.collection("users").doc(userRecord.uid).set({
      name,
      email,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    res.status(201).json({ message: "User registered successfully!", userId: userRecord.uid });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Login User Generate Firebase Custom Token
router.post("/login", async (req, res) => {
    const { email } = req.body;
  
    try {
      const user = await admin.auth().getUserByEmail(email);
      const customToken = await admin.auth().createCustomToken(user.uid); 
  
      res.status(200).json({
        message: "Login successful",
        userId: user.uid,
        email: user.email,
        token: customToken, 
      });
    } catch (error) {
      res.status(400).json({ error: "Invalid email or user not found" });
    }
  });

// Protect Route 
router.get("/protected", async (req, res) => {
  const token = req.headers.authorization?.split("Bearer ")[1];

  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const decodedToken = await auth.verifyIdToken(token);
    res.json({ message: "This is a protected route!", user: decodedToken });
  } catch (error) {
    res.status(403).json({ error: "Invalid token" });
  }
});

module.exports = router;
