"use client";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type SignUpFormValues, SignUpSchema } from "./schema";
import FormItem from "@/components/global/form-inputfield";

const SignUpForm = () => {
  const { handleSubmit, control } = useForm<SignUpFormValues>({
    resolver: zodResolver(SignUpSchema),
  });

  const onSubmit = (data: SignUpFormValues) => {
    console.log(data);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <FormItem
        label={"Firstname"}
        controlProps={{
          name: "firstname",
          control: control,
        }}
      />
      <FormItem
        label={"Lastname"}
        controlProps={{
          name: "lastname",
          control: control,
        }}
      />
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
      <Button className="w-full">Submit</Button>
    </form>
  );
};

export default SignUpForm;
