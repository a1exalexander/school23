import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/storage";
import "firebase/firestore";
import "firebase/analytics";

const config = {
  apiKey: process.env.NEXT_STATIC_API_KEY,
  authDomain: process.env.NEXT_STATIC_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_STATIC_DATABASE_URL,
  projectId: process.env.NEXT_STATIC_PROJECT_ID,
  storageBucket: process.env.NEXT_STATIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_STATIC_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_STATIC_APP_ID,
  measurementId: process.env.NEXT_STATIC_MEASUREMENT_ID
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const storage = firebase.storage();
const db = firebase.firestore();
const auth = firebase.auth();
let analytics = null;

if (process.browser) {
  analytics = firebase.analytics();
}

export { db, auth, analytics, storage };
export default firebase;
