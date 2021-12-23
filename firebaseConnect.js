import {initializeApp} from 'firebase/app';
import {getAuth} from 'firebase/auth';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';

const firebaseConfig = {
    apiKey: 'AIzaSyAUlAVCNehojyP5srCKA-gQVm-N9hfc5M4',
    authDomain: 'workapp-94b89.firebaseapp.com',
    projectId: 'workapp-94b89',
    storageBucket: 'workapp-94b89.appspot.com',
    messagingSenderId: '200621901638',
    appId: '1:200621901638:web:bfeeb2960fecd7c6b68747',
    measurementId: '${config.measurementId}',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const authentication = getAuth(app);
export const db = getFirestore(app);
