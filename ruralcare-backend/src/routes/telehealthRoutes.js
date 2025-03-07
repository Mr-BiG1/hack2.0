const express = require("express");
const admin = require("firebase-admin");

const router = express.Router();

// Book an appointment
router.post("/book", async (req, res) => {
  const { userId, doctorId, date, time } = req.body;
  try {
    const newAppointment = await admin.firestore().collection("appointments").add({
      userId,
      doctorId,
      date,
      time,
      status: "pending",
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    res.status(201).json({ message: "Appointment booked", appointmentId: newAppointment.id });
  } catch (error) {
    res.status(500).json({ error: "Booking failed" });
  }
});

module.exports = router;
