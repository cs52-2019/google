import firebase from 'firebase';

// Final app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyAjrrNV0_wVE327dPcAR72V9aG16a0tP4A",
  authDomain: "gee-app-3c3fb.firebaseapp.com",
  databaseURL: "https://gee-app-3c3fb.firebaseio.com",
  projectId: "gee-app-3c3fb",
  storageBucket: "gee-app-3c3fb.appspot.com",
  messagingSenderId: "92542997616",
  appId: "1:92542997616:web:49dee5609123f868"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
