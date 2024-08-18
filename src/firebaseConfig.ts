// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDEjdfyaqBFn8QAqhzTHeG2xI4XwlyYLhM",
  authDomain: "comments-e5cdf.firebaseapp.com",
  projectId: "comments-e5cdf",
  storageBucket: "comments-e5cdf.appspot.com",
  messagingSenderId: "665846045345",
  appId: "1:665846045345:web:5f9819811915692d13eee0",
  measurementId: "G-PX88SGFDJ7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const firestore = getFirestore(app);

export { auth, googleProvider,firestore };