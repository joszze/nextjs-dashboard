"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import axios from "axios";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import LoadingSpinner from "@/components/LoadingSpinner";
type Inputs = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export default function Page() {
  const [showPassword, setShowPassword] = useState(false);
  const route = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>();

  const toLowerCase = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.value = e.target.value.toLowerCase();
  };

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      await axios.post("/api/auth/signup", data);
      route.push("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className="w-full px-6 py-24">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="m-auto max-w-96 rounded-lg border bg-white p-8 shadow"
      >
        <h1 className="text-center text-xl font-semibold">Sign Up</h1>
        <p className="text-center text-sm">
          Welcome! Please fill in the details to get started.
        </p>
        <div className="mt-8 space-y-4">
          <div className="">
            <label className="after:text-red-500 after:content-['*']">
              First Name:
            </label>
            <Input
              type="text"
              {...register("firstName", {
                required: "First Name is required",
              })}
              aria-invalid={errors.firstName ? "true" : "false"}
              onChange={toLowerCase}
              autoComplete="off"
            />
            {errors.firstName && (
              <p className="mt-1 text-sm font-light text-red-500" role="alert">
                {errors.firstName.message}
              </p>
            )}
          </div>
          <div className="">
            <label className="after:text-red-500 after:content-['*']">
              Last Name:
            </label>
            <Input
              type="text"
              {...register("lastName", {
                required: "Last Name is required",
              })}
              aria-invalid={errors.lastName ? "true" : "false"}
              onChange={toLowerCase}
              autoComplete="off"
            />
            {errors.lastName && (
              <p className="mt-1 text-sm font-light text-red-500" role="alert">
                {errors.lastName.message}
              </p>
            )}
          </div>
          <div className="">
            <label className="after:text-red-500 after:content-['*']">
              Email Address:
            </label>
            <Input
              type="email"
              {...register("email", {
                required: "Email Address is required",
                pattern: {
                  value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                  message: "Entered value does not match email format",
                },
              })}
              aria-invalid={errors.email ? "true" : "false"}
              onChange={toLowerCase}
              autoComplete="off"
            />
            {errors.email && (
              <p className="mt-1 text-sm font-light text-red-500" role="alert">
                {errors.email.message}
              </p>
            )}
          </div>
          <div className="relative">
            <div className="flex items-center justify-between">
              <label className="after:text-red-500 after:content-['*']">
                Password:
              </label>
              <Link href={"/password-reset"} className="text-sm text-gray-400">
                Forgot password?
              </Link>
            </div>

            <div className="absolute right-5 top-1/2">
              {showPassword ? (
                <button type="button" onClick={() => setShowPassword(false)}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                    />
                  </svg>
                </button>
              ) : (
                <button type="button" onClick={() => setShowPassword(true)}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    />
                  </svg>
                </button>
              )}
            </div>

            <Input
              type={showPassword ? "text" : "password"}
              {...register("password", {
                required: "Password is required",
              })}
              aria-invalid={errors.password ? "true" : "false"}
              autoComplete="off"
            />
            {errors.password && (
              <p className="mt-1 text-sm font-light text-red-500" role="alert">
                {errors.password.message}
              </p>
            )}
          </div>
        </div>

        <div className="mt-8">
          <Button
            disabled={isSubmitting}
            className={`w-full rounded py-2 font-semibold text-white transition-all ${
              isSubmitting ? "bg-light_gray" : ""
            }`}
          >
            {isSubmitting ? <LoadingSpinner size="small" /> : "Continue"}
          </Button>
        </div>
        <p className="mt-2 text-end">
          Already have an account?{" "}
          <Link className="font-medium text-my_blue" href={"/login"}>
            Login
          </Link>{" "}
        </p>
      </form>
    </main>
  );
}