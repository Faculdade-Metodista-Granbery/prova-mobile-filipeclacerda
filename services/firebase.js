import firebase from 'firebase/app'
import 'firebase/firebase-database'

const firebaseConfig = {
  apiKey: "AIzaSyAsNZZ3mrXpy781GLFzB5yjh8QTOF3fSD4",
  authDomain: "prova1-7269f.firebaseapp.com",
  databaseURL: "https://prova1-7269f-default-rtdb.firebaseio.com",
  projectId: "prova1-7269f",
  storageBucket: "prova1-7269f.appspot.com",
  messagingSenderId: "98287309182",
  appId: "1:98287309182:web:568c00e0a9479e2958232f"
};

  firebase.initializeApp(firebaseConfig);

  const db = firebase.database().ref()

  const getAll = () => {
      return db
  }

  export default {
      getAll,
  }