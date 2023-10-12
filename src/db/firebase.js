import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth"; // Import Firebase Authentication

import firebaseConfig from "./config";

let app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const auth = getAuth(app); // Initialize Firebase Authentication

export { storage, auth };