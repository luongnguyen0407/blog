import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBOQxDztRymwjQKjt2RQOcW4RF5DbiW_Rk",
  authDomain: "blogg-35f46.firebaseapp.com",
  projectId: "blogg-35f46",
  storageBucket: "blogg-35f46.appspot.com",
  messagingSenderId: "547701330772",
  appId: "1:547701330772:web:37ce8434a947d3e49a2ec1",
  measurementId: "G-YXMC2JKBMD",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app); //get auth
export const db = getFirestore(auth); //get db
const analytics = getAnalytics(app);
