//client side will responsible for the authentication etc

// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
import { Auth, getAuth } from "firebase/auth";
import { FirebaseStorage, getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAzj6nGhzI00GvZeKEfsy9XNp_L8tUvZSM",
    authDomain: "nestify-d913c.firebaseapp.com",
    projectId: "nestify-d913c",
    storageBucket: "nestify-d913c.firebasestorage.app",
    messagingSenderId: "770676700262",
    appId: "1:770676700262:web:c69f708acfafe6539269a7"
};

// Initialize Firebase
const currentApps = getApps();
let auth: Auth;
let storage: FirebaseStorage;

if (!currentApps.length) {
    const app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    storage = getStorage(app);
} else {
    const app = currentApps[0];
    auth = getAuth(app);
    storage = getStorage(app);
}

export { auth, storage };
// when use auth or storage, we can easily import from this file




