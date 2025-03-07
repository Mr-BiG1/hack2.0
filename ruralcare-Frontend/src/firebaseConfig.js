import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
require("dotenv").config();


const firebaseConfig = {
  apiKey: process.env.APIKEY,
  authDomain:process.env. authDomain,
  projectId: process.env.projectId,
  storageBucket: process.env.storageBucket,
  messagingSenderId: process.env.messagingSenderId,
  appId: process.env.appId
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
