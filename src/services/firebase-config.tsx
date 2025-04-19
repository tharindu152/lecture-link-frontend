import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyCHgx5sJ6Y3gMQi3WdvSJZE9Qeb77ZdofU",
    authDomain: "ecobin-login-auth.firebaseapp.com",
    projectId: "ecobin-login-auth",
    storageBucket: "ecobin-login-auth.appspot.com",
    messagingSenderId: "267555158405",
    appId: "1:267555158405:web:3a13ab797a9e4bbb45acec"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth, signInWithPopup, GoogleAuthProvider };

