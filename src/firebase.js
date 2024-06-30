// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAU6Rk72LSB718ZuchR0UTf_KVQHzurrsg",
  authDomain: "podcast-platform-ed5ba.firebaseapp.com",
  projectId: "podcast-platform-ed5ba",
  storageBucket: "podcast-platform-ed5ba.appspot.com",
  messagingSenderId: "284425304979",
  appId: "1:284425304979:web:40766f927efa1020b30666",
  measurementId: "G-LBHLTRLCW4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db =getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);
export{auth,db,storage};