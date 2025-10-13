"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useAuth } from "@/hooks/use-auth";
import { auth } from "@/lib/firebase";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { signOut } from "firebase/auth";
import Link from "next/link";
import { useState } from "react";
import { LoginForm } from "./login-form";
import { SignUpForm } from "./signup-form";

export const AuthDialog = () => {
  const { user } = useAuth();
  const [showAuthDialog, setShowAuthDialog] = useState(false);
  const [showSignUpForm, setShowSignUpForm] = useState(true);

  const handleLogout = (e: React.MouseEvent) => {
    e.preventDefault();
    signOut(auth);
  };

  const handleDialogOpenChange = (open: boolean) => {
    if (!open) setShowSignUpForm(true);
    setShowAuthDialog(open);
  };

  return (
    <Dialog open={showAuthDialog} onOpenChange={handleDialogOpenChange}>
      <DialogTrigger asChild>
        <Button onClick={user ? handleLogout : undefined}>
          {user ? "Log Out" : "Sign Up"}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{showSignUpForm ? "Sign Up" : "Log In"}</DialogTitle>
        </DialogHeader>
        {showSignUpForm ? <SignUpForm /> : <LoginForm />}
        <DialogFooter>
          <Link
            href="#"
            className="hover:underline"
            onClick={() => setShowSignUpForm((prev) => !prev)}
          >
            <p className="text-sm">
              {showSignUpForm
                ? "Already have an account?"
                : "Create an account"}
            </p>
          </Link>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
