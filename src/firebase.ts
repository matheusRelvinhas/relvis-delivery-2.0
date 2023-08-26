import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database'

const firebaseConfig = {
  apiKey: "AIzaSyDJto7a5-GaKzOyBTSfLzq7PKzXsgpeVvo",
  authDomain: "relvis-delivery.firebaseapp.com",
  projectId: "relvis-delivery",
  storageBucket: "relvis-delivery.appspot.com",
  messagingSenderId: "409526016288",
  appId: "1:409526016288:web:aa04ee98389fb66aa6df45",
  measurementId: "G-2VSDB4RVTL",
};

  // Initialize Firebase
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
  }else{
    firebase.app();
  }

export const auth = firebase.auth();
export const database = firebase.database()



