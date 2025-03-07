const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');

// Load Firebase Service Key
const serviceAccount = require('./ruralcare-3231e-firebase-adminsdk-fbsvc-abdc2adc5d.json'); // Ensure correct path

// Initialize Firebase Admin SDK
initializeApp({
    credential: cert(serviceAccount)
});

// Initialize Firestore
const db = getFirestore();

module.exports = { db };
