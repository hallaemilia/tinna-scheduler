// firebaseConfig.ts
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import { getAuth, initializeAuth } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';


const firebaseConfig = {
    apiKey: "AIzaSyC1Ja6O3Ox9jQ4s2rZPCJk9irPxbJqwLIs",
    authDomain: "tinna-scheduler.firebaseapp.com",
    projectId: "tinna-scheduler",
    storageBucket: "tinna-scheduler.appspot.com",
    messagingSenderId: "1005687928571",
    appId: "1:1005687928571:web:2a644671fca0732a98225e",
    measurementId: "G-P7W5X40DDC"
};

const app = initializeApp(firebaseConfig);


const auth = initializeAuth(app, {
    // persistence: getReactNativePersistence(AsyncStorage)
});

const db = getFirestore(app);

export { auth, db };