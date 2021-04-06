import firebase from "firebase";

const firebaseConfig = {
  apiKey: process.env.YOUR_FIREBASE_API_KEY,
  authDomain: process.env.YOUR_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.YOUR_FIREBASE_PROJECT_ID, ,
  storageBucket:  process.env.YOUR_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.YOUR_FIREBASE_MESSAGE_SENDER_ID ,
  appId:  process.env.YOUR_FIREBASE_APP_ID,
  measurementId: process.env.YOUR_FIREASE_MEASUREMENT_ID,
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export default db;
export { auth, provider };
