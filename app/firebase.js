import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCd9FdONKPIFw53wAPQE3g-8zNyOTCZGu4",
  authDomain: "devtown-chat-next.firebaseapp.com",
  projectId: "devtown-chat-next",
  storageBucket: "devtown-chat-next.appspot.com",
  messagingSenderId: "765581389467",
  appId: "1:765581389467:web:e50d943471db998293a03e",
  measurementId: "G-GQ5S2V4YP6",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
