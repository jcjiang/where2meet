import * as firebase from "firebase";

const config = {
  apiKey: "AIzaSyB0w6HmrgkakHS069xfMTjHP-88x7udpAQ",
  authDomain: "where2meet-e6c9a.firebaseapp.com",
  databaseURL: "https://where2meet-e6c9a.firebaseio.com",
  projectId: "where2meet-e6c9a",
  storageBucket: "where2meet-e6c9a.appspot.com",
  messagingSenderId: "411286369839"
};

export default !firebase.apps.length ? firebase.initializeApp(config) : firebase.app();
