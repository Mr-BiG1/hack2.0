const admin = require("firebase-admin");
const { auth, db } = require("../config/firebase");

// User Registration
const userRegister = async (req, res) => {
    try {
        const { name, email, password } = req.body;
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
};

// User Login & Token Generation
const postLogin = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await auth.getUserByEmail(email);
        const customToken = await auth.createCustomToken(user.uid);
        res.status(200).json({
            message: "Login successful",
            userId: user.uid,
            email: user.email,
            token: customToken,
        });
    } catch (error) {
        res.status(400).json({ error: "Invalid email or user not found",error });
    }
};

// Protected Route - Verify Token
const protectedRoute = async (req, res) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ error: "Unauthorized: No token provided" });
    }

    const token = authHeader.split("Bearer ")[1];

    try {
        const decodedToken = await admin.auth().verifyIdToken(token);
        res.json({ message: "This is a protected route!", user: decodedToken });
    } catch (error) {
        res.status(403).json({ error: "Invalid token", details: error.message });
    }
};


module.exports = { userRegister, postLogin, protectedRoute };
