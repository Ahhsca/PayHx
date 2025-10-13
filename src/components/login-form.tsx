import { loginWithEmailAndPassword } from "@/app/api/auth/sign-in";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { getErrorMessage } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import { authFormSchema } from "./signup-form";

export const LoginForm = () => {
  const form = useForm<z.infer<typeof authFormSchema>>({
    resolver: zodResolver(authFormSchema),
    defaultValues: {
      emailAddress: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof authFormSchema>) => {
    try {
      await loginWithEmailAndPassword(data);
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      console.error("Error during login process: ", errorMessage);
      toast.error("An unexpected error occurred. Please try again.");
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
          <Button type="submit">Login</Button>
        </div>
      </form>
    </Form>
  );
};
