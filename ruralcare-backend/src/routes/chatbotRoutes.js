const express = require("express");
const router = express.Router();
require("dotenv").config();
const OpenAI = require("openai");

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

router.post("/", async (req, res) => {
  const userMessage = req.body.message?.trim(); 

  if (!userMessage) {
    return res.status(400).json({ reply: " Please enter a message." });
  }

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [{ role: "user", content: userMessage }],
    });

    res.json({ reply: completion.choices[0].message.content });
  } catch (error) {
    console.error(" OpenAI API Error:", error);
    res.status(500).json({ reply: " Sorry, I couldn't process your request." });
  }
});

module.exports = router;
