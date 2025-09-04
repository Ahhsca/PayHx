import { collection, addDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

interface Salary {
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
}
export async function addSalaryData(salaryData: Salary) {
  const docRef = await addDoc(collection(db, "salarySubmissions"), salaryData);
  return docRef.id;
}
