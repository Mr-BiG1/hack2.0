const express = require("express");
const axios = require("axios");
const admin = require("firebase-admin");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { userId, message } = req.body;
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4",
        messages: [{ role: "system", content: "You are a medical assistant." }, { role: "user", content: message }],
      },
      { headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}`, "Content-Type": "application/json" } }
    );

    const chatbotResponse = response.data.choices[0].message.content;

    // Save message to Firestore
    await admin.firestore().collection("chatbot_messages").add({
      userId,
      message,
      response: chatbotResponse,
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
    });

    res.json({ reply: chatbotResponse });
  } catch (error) {
    res.status(500).json({ error: "Chatbot failed" });
  }
});

module.exports = router;
