// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAUdQmtftJcVVJOhjGLuVaINP-DvSwN7Ik",
    authDomain: "task-keeper-99d39.firebaseapp.com",
    projectId: "task-keeper-99d39",
    storageBucket: "task-keeper-99d39.appspot.com",
    messagingSenderId: "748356259637",
    appId: "1:748356259637:web:43ce56a7f395c8a799467c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;