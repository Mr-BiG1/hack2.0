const express = require("express");
const admin = require("firebase-admin");
const router = express.Router();

// Firestore FieldValue Fix
const FieldValue = admin.firestore.FieldValue;

// Register User
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const userRecord = await admin.auth().createUser({
      email,
      password,
      displayName: name,
    });

    // Check Firestore before writing
    const userRef = admin.firestore().collection("users").doc(userRecord.uid);
    await userRef.set({
      name,
      email,
      createdAt: FieldValue.serverTimestamp(),
    });

    res.status(201).json({ message: "User registered successfully!", userId: userRecord.uid });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
