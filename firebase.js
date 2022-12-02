// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getFirestore } from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAFOH7gRV9COqYdNJISNWpjkgtkkOFSz9w",
  authDomain: "easynotes-1efba.firebaseapp.com",
  projectId: "easynotes-1efba",
  storageBucket: "easynotes-1efba.appspot.com",
  messagingSenderId: "965146660653",
  appId: "1:965146660653:web:682626f38b578466810da4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

export default db