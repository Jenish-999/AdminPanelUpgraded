// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/database";
import { getStorage } from "firebase/storage";
import "firebase/compat/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA8rPl1qPkTkkh2ykQcG-ZUzU6ZXXor8Zc",
  authDomain: "jenishdemosoc.firebaseapp.com",
  databaseURL: "https://jenishdemosoc-default-rtdb.firebaseio.com",
  projectId: "jenishdemosoc",
  storageBucket: "jenishdemosoc.appspot.com",
  messagingSenderId: "1051211641623",
  appId: "1:1051211641623:web:1fe8b630b00dc950563d52",
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);

export const fireDb = firebaseApp.database().ref();

export const storage = firebase.storage();

export const allStorage = getStorage();
