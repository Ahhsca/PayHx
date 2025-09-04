import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { SignUpForm } from "./signup-form";

export const AuthDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Sign Up</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Sign Up</DialogTitle>
        </DialogHeader>
        <SignUpForm />
      </DialogContent>
    </Dialog>
  );
};
