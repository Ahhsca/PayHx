import { db } from "@/lib/firebase";
import { getErrorMessage } from "@/lib/utils";
import { collection, getDocs } from "firebase/firestore";

export const getSalary = async () => {
  const snapshot = await getDocs(collection(db, "salaries"));
};

export const getAllVerifiedSalary = async () => {
  try {
    const snapshot = await getDocs(collection(db, "verifiedSalaries"));
    return snapshot.docs.map((doc) => ({
      data: doc.data().data,
      name: doc.data().name,
    }));
  } catch (error) {
    const errorMessage = getErrorMessage(error);
    console.error("Error getAllVerifiedSalary: ", errorMessage);
  }
};
