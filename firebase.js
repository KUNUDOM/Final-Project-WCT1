// Firebase configuration
// 1. ចូលទៅ https://console.firebase.google.com/ ហើយបង្កើត Project ថ្មី
// 2. Add App > Web App ហើយចម្លង config object មកដាក់ខាងក្រោម
// 3. បើក Authentication > Sign-in method > Email/Password
// 4. បើក Firestore Database > Create database (Start in test mode សម្រាប់ស្រាវជ្រាវ/assignment)

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
