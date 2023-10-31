"use client";
import Link from "next/link";
import type { RegisterOptions, SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";

interface FormValues {
  email: string;
}

export default function ForgotPassword(): JSX.Element {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log("Password reset email sent to:", data.email);
    // Here you would typically send a password reset email
  };

  const validateEmail: RegisterOptions<FormValues, "email">["validate"] = (
    value: string,
  ) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(value)) return true;
    return "Please enter a valid email address";
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Forgot Password
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Please enter your email and we will send you a link to reset your
            password.
          </p>
        </div>
        <form
          className="mt-8 space-y-6"
          onSubmit={handleSubmit(onSubmit) as () => void}
        >
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label className="sr-only" htmlFor="email">
                Email address
              </label>
              <input
                id="email"
                {...register("email", {
                  required: "Email is required",
                  onBlur: () => validateEmail,
                })}
                autoComplete="email"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                type="email"
              />
              {errors.email ? (
                <p className="mb-2 text-sm text-red-600" id="email-error">
                  {errors.email.message}
                </p>
              ) : null}
            </div>
          </div>

          <div>
            <button
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              type="submit"
            >
              Send Reset Link
            </button>
            <div className="text-center mt-8">
              <span className="text-gray-900 text-sm text-center inline-block mb-2">
                Or
              </span>
              <Link
                className="font-medium text-indigo-600 hover:text-indigo-500 text-center"
                href="/"
              >
                {" "}
                Back to login{" "}
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
