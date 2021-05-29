import firebase from 'firebase/app'
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyBB1KvaCRT9bZadhmQcQKU1Cfj43AFr88w",
    authDomain: "linkstagram-514d1.firebaseapp.com",
    projectId: "linkstagram-514d1",
    storageBucket: "linkstagram-514d1.appspot.com",
    messagingSenderId: "442881142693",
    appId: "1:442881142693:web:37fc1953ced3c1a1a4424c"
};

firebase.initializeApp(firebaseConfig);
firebase.firestore() 

export default firebase

