"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useForm, Controller } from "react-hook-form";


import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";


type LoginFormData = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const router = useRouter();

  //Loading state to disable form while authenticating
  const [loading, setLoading] = useState(false);

  //Error state to display authentication errors
  const [error, setError] = useState("");

  //Reat Hook Form for form handling and validation
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  /**
   * Handle form submission
   */
  async function onSubmit(data: LoginFormData) {
    try {
      setLoading(true);
      setError("");

      //Sign in using NextAuth's credentials provider
      const result = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false, //We will handle redirection manually
      });

      console.log("LOGIN RESULT:", result);

      //Login failed
      if (result?.error) {
        setError(result.error);
        return;
      }
      //Login successful, redirect to dashboard
      router.push("/dashboard");


    } catch (error) {
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card title="Financial System Login" className="w-96">

        {/* Display authentication error if exists */}
        {error && (
          <p className="text-red-500 mb-3">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4"
        >
          {/*Email field with validation */}
          <div>
            <InputText
              placeholder="Email"
              className="w-full"
              {...register("email", { required: "Email is required" 

              })}
            />
          
          {errors.email && (
            <small className="text-red-500 text-sm">
              {errors.email.message}
            </small>
          )}
          </div>

          {/*Password field with validation */}
          <div>
          <Controller
            name="password"
            control={control}
            rules={{ 
              required: "Password is required" 

            }}
          
            render={({ field }) => (
              <Password
                value={field.value}
                onChange={(e) => field.onChange(e.target.value)}
                onBlur={field.onBlur}
                placeholder="Password"
                feedback={false}
                toggleMask
                className="w-full"
              />
            )}  

          />
            {errors.password && (
              <small className="text-red-500 text-sm">
                {errors.password.message}
              </small>
            )}
          </div>

          {/*Login button */}
          <Button
            label={loading ? "Signing In..." : "Login"}
            icon="pi pi-sign-in"
            loading={loading}
          />
            
        </form>

      </Card>

    </div>  
  );
}    