import { initializeApp } from "firebase/app";
import 'firebase/auth';
import 'firebase/database';
import { getDatabase } from "firebase/database";


const firebaseConfig = {
    apiKey: "AIzaSyDI1Oe--8q3Q4kp8nvAPejTi_65OJXZ1As",
    authDomain: "note-firebase-f4519.firebaseapp.com",
    projectId: "note-firebase-f4519",
    storageBucket: "note-firebase-f4519.appspot.com",
    messagingSenderId: "346546591625",
    appId: "1:346546591625:web:72e197e8d14fedd8b5f358",
    measurementId: "G-8KF9B4JS9K"
  };
  
  // Initialize Firebase
const firebase = initializeApp(firebaseConfig);

export const database = getDatabase(firebase);


  export default firebase;
  