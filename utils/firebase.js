// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyALIRC3JyrulxT_U0yxm_Gks9ZHMTCSdfI",
    authDomain: "chaincashv2.firebaseapp.com",
    projectId: "chaincashv2",
    storageBucket: "chaincashv2.appspot.com",
    messagingSenderId: "43402066504",
    appId: "1:43402066504:web:a9eb7ffa72d4429f54b67d",
    measurementId: "G-3ZHPJ6ZQH1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);
export { db, auth, storage };
