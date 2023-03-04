// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAn-bGOH0epJZ51DdSfLTnmtRvBIUrI57c",
  authDomain: "job-box-3686b.firebaseapp.com",
  projectId: "job-box-3686b",
  storageBucket: "job-box-3686b.appspot.com",
  messagingSenderId: "396952408044",
  appId: "1:396952408044:web:f50b9ec4cb8f089a6efac9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)

export default auth
