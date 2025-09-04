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
    console.log(">>", user);
    return user;
  } catch (error) {
    console.log(error);
  }
};
