import firebase from 'firebase';

var firebaseConfig = {
  apiKey: "AIzaSyAjrrNV0_wVE327dPcAR72V9aG16a0tP4A",
  authDomain: "gee-app-3c3fb.firebaseapp.com",
  databaseURL: "https://gee-app-3c3fb.firebaseio.com",
  projectId: "gee-app-3c3fb",
  storageBucket: "gee-app-3c3fb.appspot.com",
  messagingSenderId: "92542997616",
  appId: "1:92542997616:web:1c3bf88db9d5f679"
};

firebase.initializeApp(firebaseConfig);

export default firebase;
