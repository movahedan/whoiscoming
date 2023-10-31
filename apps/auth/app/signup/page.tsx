"use client";
import Link from "next/link";
import type { RegisterOptions } from "react-hook-form";
import { useForm } from "react-hook-form";

interface FormValues {
  name: string;
  email: string;
  emailConfirm: string;
  password: string;
  passwordConfirm: string;
}

export default function Signup(): JSX.Element {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit = (data) => {
    console.info("Form submitted successfully!", data);
  };

  const validateEmailMatch: RegisterOptions<
    FormValues,
    "emailConfirm"
  >["validate"] = (value, values) => {
    if (value === values.email) return true;
    return "Emails do not match!";
  };

  const validatePasswordMatch: RegisterOptions<
    FormValues,
    "emailConfirm"
  >["validate"] = (value, values) => {
    if (value === values.password) return true;
    return "Passwords do not match!";
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create your account
          </h2>
        </div>
        <form
          className="mt-8 space-y-6"
          onSubmit={handleSubmit(onSubmit) as () => void}
        >
          <input name="remember" type="hidden" value="true" />
          <div className="rounded-md -space-y-px">
            <div>
              <label className="sr-only" htmlFor="name">
                Full Name
              </label>
              <input
                id="name"
                {...register("name", { required: "Full Name is required." })}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Full Name"
                type="text"
              />
              {errors.name ? (
                <p className="mt-2 text-sm text-red-600" id="name-error">
                  {errors.name.message}
                </p>
              ) : null}
            </div>
            <div>
              <label className="sr-only" htmlFor="email">
                Email address
              </label>
              <input
                id="email"
                {...register("email", { required: "Email is required." })}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                type="email"
              />
              {errors.email ? (
                <p className="mt-2 text-sm text-red-600" id="email-error">
                  {errors.email.message}
                </p>
              ) : null}
            </div>
            <div>
              <label className="sr-only" htmlFor="emailConfirm">
                Confirm Email
              </label>
              <input
                id="emailConfirm"
                {...register("emailConfirm", {
                  required: "Confirm Email is required",
                  validate: validateEmailMatch,
                })}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Confirm Email"
                type="email"
              />
              {errors.emailConfirm ? (
                <p
                  className="mt-2 text-sm text-red-600"
                  id="emailConfirm-error"
                >
                  {errors.emailConfirm.message}
                </p>
              ) : null}
            </div>
            <div>
              <label className="sr-only" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                {...register("password", { required: "Password is required." })}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                type="password"
              />
              {errors.password ? (
                <p className="mb-2 text-sm text-red-600" id="password-error">
                  {errors.password.message}
                </p>
              ) : null}
            </div>
            <div>
              <label className="sr-only" htmlFor="passwordConfirm">
                Confirm Password
              </label>
              <input
                id="passwordConfirm"
                {...register("passwordConfirm", {
                  required: "Confirm Password is required",
                  validate: validatePasswordMatch,
                })}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Confirm Password"
                type="password"
              />
              {errors.passwordConfirm ? (
                <p
                  className="mb-2 text-sm text-red-600"
                  id="passwordConfirm-error"
                >
                  {errors.passwordConfirm.message}
                </p>
              ) : null}
            </div>
          </div>

          <div>
            <button
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              type="submit"
            >
              Sign Up
            </button>
          </div>
        </form>

        <div className="text-center">
          <span className="text-gray-900 text-sm text-center inline-block mb-2">
            Do you already have an account?
          </span>
          <Link
            className="font-medium text-indigo-600 hover:text-indigo-500 text-center"
            href="/"
          >
            {" "}
            Login{" "}
          </Link>
        </div>
      </div>
    </div>
  );
}
