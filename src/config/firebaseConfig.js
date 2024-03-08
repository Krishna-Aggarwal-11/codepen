import {getApp,getApps, initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import {getFirestore} from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyAERtrwcbREQKkubjOmifzCO0DrzkGEmiY",
  authDomain:"codepen-9b75b.firebaseapp.com" ,
  projectId: "codepen-9b75b",
  storageBucket:"codepen-9b75b.appspot.com",
  messagingSenderId: "284298942077",
  appId: "1:284298942077:web:66151a3f9f540d5ebdc314"
};

// Initialize Firebase
const app = getApps.length >0 ? getApp() : initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

export {app,auth,db};