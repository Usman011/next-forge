"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { DefaultValues, FieldValues, useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { AuthFormProps } from "@/types/form";

import { InputField } from "../common/InputField";

const AuthForm = <T extends FieldValues>({
  schema,
  defaultValues,
  formType,
  onSubmit,
}: AuthFormProps<T>) => {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues as DefaultValues<T>,
  });

  const handleSubmit = async (values: z.infer<typeof schema>) => {
    const result = await onSubmit(values);
    if (result.success) {
      form.reset();
    }
  };

  const buttonText = formType === "SIGN_IN" ? "Sign In" : "Sign Up";

  return (
    <div className="w-full max-w-md space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <h1 className="text-2xl font-bold">{buttonText}</h1>

          {Object.keys(defaultValues).map((key) => (
            <InputField key={key} name={key} label={key} />
          ))}

          <Button type="submit" className="w-full">
            Sign In
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default AuthForm;
