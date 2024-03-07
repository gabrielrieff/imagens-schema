import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB_j3yy0aS9aH7P9S2E_naUs825FlY1Vy8",
  authDomain: "imagens-schema.firebaseapp.com",
  projectId: "imagens-schema",
  storageBucket: "imagens-schema.appspot.com",
  messagingSenderId: "179403696348",
  appId: "1:179403696348:web:37924d7e3093f2bc482c19",
  measurementId: "G-K05FKPDEJL",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { db, auth, storage };
