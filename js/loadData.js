import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCIJ6TU3rfPu7IraayU1Jz6RzkxOY3SYNQ",
  authDomain: "vabi-befd1.firebaseapp.com",
  databaseURL: "https://vabi-befd1-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "vabi-befd1",
  storageBucket: "vabi-befd1.appspot.com",
  messagingSenderId: "125388798836",
  appId: "1:125388798836:web:756a988c6795caf1fd4a21"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

let cachedData = null;

export async function loadRawData() {
  if (!cachedData) {
    const querySnapshot = await getDocs(collection(db, "csv")); // Replace "csv" with your Firestore collection name
    cachedData = querySnapshot.docs.map(doc => doc.data());

    // Convert fields if necessary
    cachedData.forEach(d => {
      d.Year = +d.Year; // Convert Year to a number
      d.District = +d.District; // Convert District to a number
    });
  }
  return cachedData;
}

export async function loadData() {
  return await loadRawData();
}