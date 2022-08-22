// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC8nAF97cQDYJ_7kK082N1Ut5tpAVvDJAg",
  authDomain: "shipreviews-f924e.firebaseapp.com",
  projectId: "shipreviews-f924e",
  storageBucket: "shipreviews-f924e.appspot.com",
  messagingSenderId: "405772999928",
  appId: "1:405772999928:web:3f95f51208e5738875af0d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default getFirestore(app);