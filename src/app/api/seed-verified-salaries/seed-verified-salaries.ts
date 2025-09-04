import { collection, doc, writeBatch } from "firebase/firestore";
import data from "./seed-data.json" assert { type: "json" };
import { db } from "@/lib/firebase";

export const seedVerifiedSalaries = async () => {
  const batch = writeBatch(db);
  const colRef = collection(db, "verifiedSalaries");
  data.forEach((hosp) => {
    const docRef = doc(colRef);
    batch.set(docRef, { name: hosp.name, data: hosp.data });
  });
  await batch.commit();
};
