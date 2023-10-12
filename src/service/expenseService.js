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
    subcollection

  } from "@firebase/firestore";
  import { deleteObject, getDownloadURL, ref, uploadBytesResumable  } from "firebase/firestore/lite";
  import {storage ,auth} from "../db/firebase";
  

const db = getFirestore();
// console.log(auth)
const addSalary = async (userId, salaryAmount) => {
    try {
        // Reference the user's document in Firestore
        const userDocRef = doc(db, "users", userId);
    
        // Update the user's document with new data
        await updateDoc(userDocRef, {
          salary: salaryAmount,
          remainingSalary: salaryAmount,
        });
    
        // console.log("User information updated for user:", userId);
      } catch (error) {
        console.error("Error updating user information: ", error.message);
      }
  };

  const remainingSalaryUpdate  = async (userId, updatedRemainingSalary) => {
    try {
        // Reference the user's document in Firestore
        const userDocRef = doc(db, "users", userId);
    
        // Update the user's document with new data
        await updateDoc(userDocRef, {
          remainingSalary: updatedRemainingSalary,
        });
    
        // console.log("User information updated for user:", userId);
      } catch (error) {
        console.error("Error updating user remainingSalary: ", error.message);
      }
  };
    
  const getRemainingSalary = async (userId) => {
    try {
      // console.log("Fetching salary for userId:", userId);
  
      // Reference the user's document in Firestore
      const userDocRef = doc(db, "users", userId);
  
      // Get the user's document data
      const userDocSnapshot = await getDoc(userDocRef);
  // console.log(userDocSnapshot)
      // Check if the user document exists and has a salary field
      if (userDocSnapshot?.exists() && userDocSnapshot?.data()?.remainingSalary) {
        const remainingSalary = userDocSnapshot.data().remainingSalary;
        console.log(remainingSalary)    
            return remainingSalary;
      } else {
        console.error("User document not found or does not have a remainingSalary field.");
        return null;
      }
    } catch (error) {
      console.error("Error fetching user information: ", error.message);
      return null;
    }
  };

  const getSalary = async (userId) => {
    try {
      // console.log("Fetching salary for userId:", userId);
  
      const userDocRef = doc(db, "users", userId);
  
      // Get the user's document data
      const userDocSnapshot = await getDoc(userDocRef);
  
      if (userDocSnapshot?.exists() && userDocSnapshot?.data()?.salary) {
        const salary = userDocSnapshot.data().salary;
        // console.log("User's salary:", salary);
        return salary;
      } else {
        console.error("User document not found or does not have a salary field.");
        return null;
      }
    } catch (error) {
      console.error("Error fetching user information: ", error.message);
      return null;
    }
  };

  const getAllCategories = async (userId) => {
    try {


      const userDocRef = doc(db, "users", userId);
  

      const userDocSnapshot = await getDoc(userDocRef);
  
      if (userDocSnapshot?.exists() && userDocSnapshot?.data()?.categories) {
        const allCategories = userDocSnapshot.data().categories;
        // console.log("User's cat:", allCategories);
        return allCategories;
      } else {
        console.error("User document not found or does not have a Categories field.");
        return null;
      }
    } catch (error) {
      console.error("Error fetching user information: ", error.message);
      return null;
    }
  };

  const createCategory = async (userId, newCategory) => {
    try {
      const userDocRef = doc(db, "users", userId);
  
      // Fetch the current user document
      const userDocSnapshot = await getDoc(userDocRef);
  
      if (userDocSnapshot.exists()) {
        // Get the user's current categories array
        const currentCategories = userDocSnapshot.data().categories || [];
  
        // Add the new category to the current categories array
        const updatedCategories = [...currentCategories, newCategory];
  
        // Update the user document with the updated categories
        await updateDoc(userDocRef, {
          categories: updatedCategories,
        });
  
        return updatedCategories; // Return the updated categories array
      } else {
        console.error("User document not found.");
        return null;
      }
    } catch (error) {
      console.error("Error creating category: ", error.message);
      return null;
    }
  };
  const getAllExpense = async (userId) => {
    try {
      // Reference the user's document in Firestore
      const userDocRef = doc(db, "users", userId);
  
      // Reference the subcollection "dailyExpense" within the user's document
      const dailyExpenseCollectionRef = collection(userDocRef, "dailyExpense");
  
      // Get all documents (expenses) within the dailyExpense subcollection
      const dailyExpenseQuerySnapshot = await getDocs(dailyExpenseCollectionRef);
  
      // Initialize an array to store dailyExpense data
      const dailyExpenseData = [];
  
      // Loop through the dailyExpense documents and retrieve their data
      dailyExpenseQuerySnapshot.forEach((doc) => {
        const expenseData = doc.data();
        dailyExpenseData.push(expenseData);
      });
  
      // Return the array of dailyExpense data
      return dailyExpenseData;
    } catch (error) {
      console.error("Error fetching dailyExpense data: ", error.message);
      return null;
    }
  };

  const addExpense = async (userId, expenseData) => {
    try {
      // Reference the user's document in Firestore
      const userDocRef = doc(db, "users", userId);
  
      // Reference the subcollection "dailyExpense" within the user's document
      const dailyExpenseCollectionRef = collection(userDocRef, "dailyExpense");
  
      // Add a new document (expense) to the dailyExpense subcollection
      await addDoc(dailyExpenseCollectionRef, {
        category: expenseData.category,
        amount: expenseData.amount,
        date: expenseData.date, // You can add a date field if needed
        // Add any other fields you want to include with the expense
      });
  
      console.log("Expense added successfully");
  
      return true; // Return true to indicate success
    } catch (error) {
      console.error("Error adding expense: ", error.message);
      return false; // Return false to indicate failure
    }
  };

const expenseService = {
    addSalary,
    getSalary,
    addExpense,
    getAllExpense,
    getAllCategories,
    getRemainingSalary,
    remainingSalaryUpdate,
    createCategory
};

export default expenseService;