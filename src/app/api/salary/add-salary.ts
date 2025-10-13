import { collection, addDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

type Salary = {
  emailAddress: string;
  city: string;
  state: string;
  date: Date;
  specialty: string;
  hospital: string;
  zipcode: string;
  union: string;
  experience: number;
  pay: number;
  shiftDiffPay: number;
  shiftDiffType: string;
};
export const addSalaryData = async (salaryData: Salary) => {
  const docRef = await addDoc(collection(db, "salarySubmissions"), salaryData);
  return docRef.id;
};
