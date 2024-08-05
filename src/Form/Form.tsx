import React from "react";
import { z } from "zod";
import { useZodForm } from "./useZodForm";
import { useZodFormFields } from "./useZodFormFields";

const userSchema = z.object({
  username: z.string().min(1, "Username is required"),
  // email: z.string().email("Invalid email address"),
  // age: z.number().min(18, "You must be at least 18 years old"),
  // subscribed: z.boolean().optional(),
  // birthDate: z.date().optional(),
});

export function Form() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useZodForm(userSchema);

  const fields = useZodFormFields(userSchema);

  const onSubmit = (data: z.infer<typeof userSchema>) => {
    console.log(data);
  };
  return (
    <>
      <button onClick={() => console.log("test")}></button>
      <form onSubmit={handleSubmit(onSubmit)}>
        {fields.map((field) => (
          <div key={field.name}>
            <label>
              {field.name.charAt(0).toUpperCase() + field.name.slice(1)}:
            </label>
            <input
              type={field.type}
              {...register(field.name as keyof z.infer<typeof userSchema>)}
            />
            {errors[field.name as keyof typeof errors] && (
              <p>
                {errors[field.name as keyof typeof errors]?.message as string}
              </p>
            )}
          </div>
        ))}
        <button type="submit">Submit</button>
      </form>
    </>
  );
}
