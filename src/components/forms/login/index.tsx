"use client";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type LoginFormValues, LoginSchema } from "./schema";
import FormItem from "@/components/global/form-inputfield";

const LoginForm = () => {
  const { handleSubmit, control } = useForm<LoginFormValues>({
    resolver: zodResolver(LoginSchema),
  });

  const onSubmit = (data: LoginFormValues) => {
    console.log(data);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <FormItem
        label={"Email"}
        controlProps={{
          name: "email",
          control: control,
        }}
      />
      <FormItem
        label={"Password"}
        type="password"
        controlProps={{
          name: "password",
          control: control,
        }}
      />
      <Button className="w-full">Login</Button>
    </form>
  );
};

export default LoginForm;
