import { auth } from "@/lib/firebase";
import { getErrorMessage } from "@/lib/utils";
import { signInWithEmailAndPassword } from "firebase/auth";
import { toast } from "sonner";

export const loginWithEmailAndPassword = async (authData: {
  emailAddress: string;
  password: string;
}) => {
  try {
    const user = await signInWithEmailAndPassword(
      auth,
      authData.emailAddress,
      authData.password,
    );
    toast.success("Logged in!");
    return user;
  } catch (error) {
    const errorMessage = getErrorMessage(error);
    console.error("Error loginWithEmailAndPassword: ", errorMessage);
    toast.error("Log in failed!");
  }
};
