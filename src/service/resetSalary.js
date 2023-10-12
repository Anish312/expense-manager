import { doc, updateDoc, getFirestore, collection, query, getDocs, deleteDoc, writeBatch } from "firebase/firestore";
import { storage, auth } from "../db/firebase";

const db = getFirestore();

// Function to reset the salary
const resetSalary = async (userId) => {
  try {
    const userDocRef = doc(db, "users", userId);

    const initialSalary = 0;

    // Create a batched write to update the user document and delete subcollection data
    const batch = writeBatch(db);

    // Update the user document with the initial salary
    batch.update(userDocRef, {
      salary: initialSalary,
      remainingSalary: initialSalary,
    });

    // Get a reference to the dailyExpense subcollection
    const dailyExpenseCollectionRef = collection(userDocRef, "dailyExpense");

    // Query for all documents in the dailyExpense subcollection
    const querySnapshot = await getDocs(query(dailyExpenseCollectionRef));

    // Delete each document in the subcollection
    querySnapshot.forEach((docSnapshot) => {
      const docRef = doc(dailyExpenseCollectionRef, docSnapshot.id);
      batch.delete(docRef);
    });

    // Commit the batched write
    await batch.commit();

    console.log("Salary reset to the initial value:", initialSalary);
    console.log("dailyExpense subcollection data deleted.");
  } catch (error) {
    console.error("Error resetting user salary:", error.message);
  }
};

const scheduleSalaryReset = async () => {
  try {
    const user = auth.currentUser;

    if (user) {
      const userId = user.uid;
      const today = new Date();
      const currentMonth = today.getMonth() + 1;
      const currentDay = today.getDate();

      if (currentDay >= 29) {
        const nextMonth = currentMonth === 12 ? 1 : currentMonth + 1;
        const nextYear = currentMonth === 12 ? today.getFullYear() + 1 : today.getFullYear();
        const nextMonth29th = new Date(nextYear, nextMonth - 1, 29); // Months are 0-based

        const timeUntilNextMonth29th = nextMonth29th - today;
       
        setTimeout(() => {
          if(userId) {
                      resetSalary(userId);

          }
        }, timeUntilNextMonth29th);
      }
    } else {
      console.error("User is not authenticated.");
    }
  } catch (error) {
    console.error("Error scheduling salary reset:", error.message);
  }
};

scheduleSalaryReset();
export default scheduleSalaryReset;
