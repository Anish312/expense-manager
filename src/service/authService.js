import {
    addDoc,
    doc,
    getDoc,
    collection,
    getDocs,
    getFirestore,
    where,
    query,
    updateDoc,
    setDoc,
  } from "@firebase/firestore";
  import { deleteObject, getDownloadURL, ref, uploadBytesResumable  } from "firebase/firestore/lite";
  import {storage ,auth} from "../db/firebase";
  
  import { getAuth, createUserWithEmailAndPassword ,signInWithEmailAndPassword  ,signOut} from "firebase/auth";

const db = getFirestore();
// console.log(auth)

const createUser = async (userData) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        userData.email,
        userData.password
      );

      const user = userCredential.user;
  
      // Store additional user data in Firestore
      const usersCollectionRef = collection(db, "users");
      const userDocRef = doc(usersCollectionRef, user.uid);
  
      await setDoc(userDocRef, {
        name: userData.name,
        salary: 0,
        categories :["Food" , "Entertainment" , "Savings" ,"Others" ]
      });

      console.log("User created and data stored:", userDocRef.id);
      
      return userDocRef.id; // Return the document ID in case you need it
    } catch (error) {
      console.error("Error creating user and storing data: ", error.message);
      return null;
    }
  };

  
  const UserLogin = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
    
      console.log("User logged in:", user.uid);

      return user.uid; 
    } catch (error) {
      console.error("Error logging in: ", error.message);
      return null;
    }
  };
  

  const logout = async () => {
    try {
      await signOut(auth);
      console.log("User logged out");
    } catch (error) {
      console.error("Error logging out: ", error.message);
    }
  };

  const getUserInfo = () => {
    const user = auth.currentUser;
    console.log(user)
    return user;
  };
  
  const isLoggedIn = () => {
    const user = auth.currentUser;
    return !!user; 
  };

const authService = {
  createUser,
  UserLogin,
  isLoggedIn,
  getUserInfo
};

export default authService;