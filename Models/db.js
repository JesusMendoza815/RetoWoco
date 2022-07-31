import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.1/firebase-app.js";

import {
    getFirestore,
    collection,
    getDocs,
    onSnapshot,
    addDoc,
    deleteDoc,
    doc,
    getDoc,
    updateDoc
} from "https://www.gstatic.com/firebasejs/9.9.1/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyCFQ3azeuBNKoRV4ge-JCDZtdyAXYHtGdU",
    authDomain: "wocotech-7f97b.firebaseapp.com",
    projectId: "wocotech-7f97b",
    storageBucket: "wocotech-7f97b.appspot.com",
    messagingSenderId: "602533705205",
    appId: "1:602533705205:web:45c6fb7c3e009542af5cbc"
};

  // Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore();

export const saveVisit = (empresa, visitors, previstTime, arriveTime, leaveTime,equipment,epp, whoAutorized ) => {
    addDoc(collection(db, 'visits'), {empresa, visitors, previstTime, arriveTime, leaveTime,equipment,epp, whoAutorized});
}

export const onGetVisits = (callback) => {
    onSnapshot(collection(db, 'visits'), callback);
}

export const deleteVisit = (id) => {
    deleteDoc(doc(db, 'visits', id));
};

export const getVisit = (id) => getDoc(doc(db, 'visits', id));

export const updateVisit = (id, newFields) => updateDoc(doc(db, 'visits', id), newFields);

export const getVisits = () => getDocs(collection(db, "visits"));