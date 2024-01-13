// import firebase from "firebase/app";
import firebase from "firebase/compat/app";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCVXjegEcSuFUJyQQ7UgpMo8GP4Xw0SKeg",
  authDomain: "appfolder-193ec.firebaseapp.com",
  databaseURL: "https://appfolder-193ec.firebaseio.com",
  projectId: "appfolder-193ec",
  storageBucket: "appfolder-193ec.appspot.com",
  messagingSenderId: "444739896583",
  appId: "1:444739896583:web:7c5c7c49b968f30fe631a2",
  measurementId: "G-H3B8DP5MLF",
};

firebase.initializeApp(firebaseConfig);

export default firebase;
