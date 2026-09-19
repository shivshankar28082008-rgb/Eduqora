// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import { getAnalytics, isSupported, Analytics } from "firebase/analytics";
import { getAuth, Auth } from "firebase/auth";
import { getFirestore, Firestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyAlkUP8lRj5GrwChD7ahv9e8J1sbU_wMi8",
  authDomain: "eduqora-coding-learning-lab.firebaseapp.com",
  projectId: "eduqora-coding-learning-lab",
  storageBucket: "eduqora-coding-learning-lab.firebasestorage.app",
  messagingSenderId: "281595807719",
  appId: "1:281595807719:web:33cf5661296654d618df42",
  measurementId: "G-R29ZJ050GV"
};

// Initialize Firebase
export const app: FirebaseApp = !getApps().length
  ? initializeApp(firebaseConfig)
  : getApp();

// Initialize Analytics (guarded with isSupported check for SSR/iframe/adblocker resilience)
let analytics: Analytics | null = null;
if (typeof window !== 'undefined') {
  isSupported()
    .then((supported) => {
      if (supported) {
        analytics = getAnalytics(app);
      }
    })
    .catch((err) => {
      console.warn("Firebase Analytics initialization notice:", err);
    });
}

export const auth: Auth = getAuth(app);
export const db: Firestore = getFirestore(app);
export { analytics };
