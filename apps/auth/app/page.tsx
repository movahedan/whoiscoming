"use client";
import Link from "next/link";
import type { RegisterOptions, SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";

interface FormValues {
  email: string;
  password: string;
}

export default function Login(): JSX.Element {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log("Form submitted successfully!", data);
    // Here you would typically send the form data to your server
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
            Sign in to your account
          </h2>
        </div>
        <form
          className="mt-8 space-y-6"
          onSubmit={handleSubmit(onSubmit) as () => void}
        >
          <input name="remember" type="hidden" value="true" />
          <div className="rounded-md -space-y-px">
            <div>
              <label className="sr-only" htmlFor="email-address">
                Email address
              </label>
              <input
                id="email"
                {...register("email", {
                  required: "Email is required",
                  validate: validateEmail,
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
            <div>
              <label className="sr-only" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                {...register("password", { required: "Password is required" })}
                autoComplete="current-password"
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
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                id="remember-me"
                name="remember-me"
                type="checkbox"
              />
              <label
                className="ml-2 block text-sm text-gray-900"
                htmlFor="remember-me"
              >
                {" "}
                Remember me{" "}
              </label>
            </div>

            <div className="text-sm">
              <Link
                className="font-medium text-indigo-600 hover:text-indigo-500"
                href="/forgot-password"
              >
                {" "}
                Forgot your password?{" "}
              </Link>
            </div>
          </div>

          <div>
            <button
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              type="submit"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <svg
                  aria-hidden="true"
                  className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    clipRule="evenodd"
                    d="M12.293 1.293a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L13 4.414V14a2 2 0 01-2 2H5a2 2 0 01-2-2V6a2 2 0 012-2h4V1a1 1 0 011-1zm-2 7h4V5h-4v3z"
                    fillRule="evenodd"
                  />
                </svg>
              </span>
              Sign in
            </button>
          </div>
        </form>

        <div className="text-center">
          <span className="text-gray-900 text-sm text-center inline-block mb-2">
            Want to create an account?
          </span>
          <Link
            className="font-medium text-indigo-600 hover:text-indigo-500 text-center"
            href="/signup"
          >
            {" "}
            Register!{" "}
          </Link>
        </div>
      </div>
    </div>
  );
}
