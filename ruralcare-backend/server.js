require("dotenv").config();
const express = require("express");
const cors = require("cors");

// Import Firestore from Firebase config
const { db } = require("./src/config/firebase");

const app = express();
app.use(express.json());
app.use(cors());


const chatbotRoutes = require("./src/routes/chatbotRoutes");
const authRoutes = require("./src/routes/authRoutes");
const telehealthRoutes = require("./src/routes/telehealthRoutes");


app.use("/api/chatbot", chatbotRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/telehealth", telehealthRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
