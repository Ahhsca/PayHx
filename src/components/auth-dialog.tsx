import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { Input } from "@/components/ui/input";
import { Form } from "./ui/form";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpWithEmailAndPassword } from "@/app/api/auth/create-user";
import { toast } from "sonner";

const authFormSchema = z.object({
  emailAddress: z.string().email(),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export const AuthDialog = () => {
  const form = useForm<z.infer<typeof authFormSchema>>({
    resolver: zodResolver(authFormSchema),
    defaultValues: {
      emailAddress: "",
      password: "",
    },
  });
  const handleSubmit = async (data: z.infer<typeof authFormSchema>) => {
    try {
      const user = await signUpWithEmailAndPassword(data);
      console.log("Successful log in", user);
      toast.success("You have successfully signed up!");
    } catch (e) {
      console.error("Error adding document: ", e);
      toast.error("Failed to submit data.");
    }
  };
  return (
    <Dialog>
      <Form {...form}>
        <form>
          <DialogTrigger asChild>
            <Button>Sign Up</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Sign Up</DialogTitle>
            </DialogHeader>
            <div className="flex flex-col gap-4">
              <Input type="email" />
              <Input type="password" />
            </div>
            <DialogFooter>
              <Button type="submit">Submit</Button>
            </DialogFooter>
          </DialogContent>
        </form>
      </Form>
    </Dialog>
  );
};
