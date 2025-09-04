import { auth } from "@/lib/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

export const signUpWithEmailAndPassword = async (authData: {
  emailAddress: string;
  password: string;
}) => {
  try {
    const user = await createUserWithEmailAndPassword(
      auth,
      authData.emailAddress,
      authData.password,
    );
    return user;
  } catch (error) {
    console.error(error);
    throw new Error("Firebase issue creating user", { cause: error });
  }
};
