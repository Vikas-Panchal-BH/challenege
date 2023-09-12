
// firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Your Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDTT4dAZoTCCBZUXyZ298SLf9M-0is-vCw",
    authDomain: "task2-7c8af.firebaseapp.com",
    projectId: "task2-7c8af",
    storageBucket: "task2-7c8af.appspot.com",
    messagingSenderId: "348395833523",
    appId: "1:348395833523:web:33e95f32668be9b16888c6"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
