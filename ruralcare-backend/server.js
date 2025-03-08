require("dotenv").config();
const express = require("express");
const cors = require("cors");
const axios = require("axios");
const { db } = require("./src/config/firebase");

const app = express();
app.use(express.json());
app.use(cors());

const verifyToken = require("./src/middleware/authMiddleware");
const chatbotRoutes = require("./src/routes/authRoutes");
const authRoutes = require("./src/routes/authRoutes");
const telehealthRoutes = require("./src/routes/telehealthRoutes");
const aibot = require('./src/routes/chatbotRoutes');

app.use("/api/chatbot", chatbotRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/telehealth", telehealthRoutes);
app.use('/api/chatbot',aibot);

//  Fetch Nearby Healthcare Facilities
app.get("/api/healthcare-facilities", async (req, res) => {
    try {
        const { lat, lon, type } = req.query; 
        if (!lat || !lon) return res.status(400).json({ error: "Missing location parameters" });

        const facilityTypes = {
            hospital: "hospital",
            clinic: "clinic",
            pharmacy: "pharmacy"
        };
        const selectedType = facilityTypes[type] || "hospital"; 

        // OpenStreetMap Overpass API Query
        const overpassQuery = `
            [out:json];
            (
              node["amenity"="${selectedType}"](around:5000, ${lat}, ${lon});
              way["amenity"="${selectedType}"](around:5000, ${lat}, ${lon});
              relation["amenity"="${selectedType}"](around:5000, ${lat}, ${lon});
            );
            out center;
        `;

        const url = `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(overpassQuery)}`;
        const response = await axios.get(url);

        const facilities = response.data.elements.map((el) => ({
            id: el.id,
            name: el.tags.name || "Unknown",
            type: selectedType,
            lat: el.lat || el.center?.lat,
            lon: el.lon || el.center?.lon,
            address: el.tags["addr:full"] || el.tags["addr:street"] || "No Address",
            distance: "Calculating..."
        }));

        //  Store in Firestore (Optional)
        const batch = db.batch();
        facilities.forEach((facility) => {
            const facilityRef = db.collection("facilities").doc(String(facility.id));
            batch.set(facilityRef, facility, { merge: true });
        });
        await batch.commit();

        res.json({ facilities });
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch facilities", details: error.message });
    }
});

// Protect Dashboard Route
app.get("/api/protected", verifyToken, async (req, res) => {
    res.json({ message: "This is a protected route!", user: req.user });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(` Server running on port ${PORT}`));
