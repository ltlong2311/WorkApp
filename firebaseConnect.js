import {initializeApp} from 'firebase/app';
import {getAuth} from 'firebase/auth';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';

const firebaseConfig = {
    // apiKey: process.env.REACT_APP_API_KEY_FIREBASE,
    // authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    // databaseURL: process.env.REACT_APP_DB_URL,
    // projectId: process.env.REACT_APP_PROJECT_ID,
    // storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    // messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    // appId: process.env.REACT_APP_MESSAGING_ID_APP,
    // measurementId: process.env.REACT_APP_MESSAGING_MEASUREMENT_ID
    apiKey: 'AIzaSyAUlAVCNehojyP5srCKA-gQVm-N9hfc5M4',
    authDomain: 'workapp-94b89.firebaseapp.com',
    projectId: 'workapp-94b89',
    storageBucket: 'workapp-94b89.appspot.com',09
    messagingSenderId: '200621901638',
    appId: '1:200621901638:web:bfeeb2960fecd7c6b68747',
    measurementId: '${config.measurementId}',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const authentication = getAuth(app);
export const db = getFirestore(app);
