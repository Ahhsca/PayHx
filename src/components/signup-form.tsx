import { signUpWithEmailAndPassword } from "@/app/api/auth/create-user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const authFormSchema = z.object({
  emailAddress: z.string().email(),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export const SignUpForm = () => {
  const form = useForm<z.infer<typeof authFormSchema>>({
    resolver: zodResolver(authFormSchema),
    defaultValues: {
      emailAddress: "",
      password: "",
    },
  });
  const onSubmit = async (data: z.infer<typeof authFormSchema>) => {
    console.log(">>> what the hell?");
    try {
      console.log("Trying log in");
      const user = await signUpWithEmailAndPassword(data);
      console.log("Successful log in", user);
      toast.success("You have successfully signed up!");
    } catch (e) {
      console.error("Error adding document: ", e);
      toast.error("Failed to submit data.");
    }
  };
  return (
    <Form {...form}>
      <form data-test-id="test-form" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-4">
          <FormField
            control={form.control}
            name="emailAddress"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input type="email" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};
