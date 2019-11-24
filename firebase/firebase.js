import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/firestore";
import "firebase/analytics";

const config = {
  apiKey: "AIzaSyBejENBWHCrM16WRbh3PgJOq9NkSfI8BA8",
  authDomain: "school23-5af03.firebaseapp.com",
  databaseURL: "https://school23-5af03.firebaseio.com",
  projectId: "school23-5af03",
  storageBucket: "school23-5af03.appspot.com",
  messagingSenderId: "769504287427",
  appId: "1:769504287427:web:1100c2fdf81d750979e076",
  measurementId: "G-50352WDD2R"
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const db = firebase.firestore();
const auth = firebase.auth();
let analytics = null;

if (process.browser) {
  analytics = firebase.analytics();
}

export { db, auth, analytics };
export default firebase;
