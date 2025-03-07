const { initializeApp, cert } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");
const { getAuth } = require("firebase-admin/auth"); 

// Load Firebase Service Key
const serviceAccount = require("./ruralcare-3231e-firebase-adminsdk-fbsvc-8820ad4717.json");

// Initialize Firebase Admin SDK
const app = initializeApp({
    credential: cert(serviceAccount),
});

// Initialize Firestore & Auth
const db = getFirestore(app);
const auth = getAuth(app); 

// Export both auth and db
module.exports = { auth, db };
