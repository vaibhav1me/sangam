"use client";
import { UserContext, UserProvider, useUser } from "@/app/context/UserContextProvider";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";

const LoginPage = () => {
  const user = useUser();
  const router = useRouter();
//   const {setU} = useContext(UserProvider)

//   useEffect(() => {
    // console.log(user);
    // if (user) {
    // console.log(user)
    //   router.push("/");
    // }
//   }, [user]);

  const [details, setDetails] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const handleLogin = async () => {
    setMessage("Logging in...");
    const response = await axios.post("/api/users/login", details);
    if (response.data.success) {
      setMessage(response.data.message);
      
      router.push("/");
    } else {
      setMessage(response.data.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-[25rem] w-full px-6 py-8 bg-white rounded-md mx-2">
        <h2 className="text-2xl font-semibold text-center">Login</h2>
        <div className="mt-8">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email or Username
            </label>
            <input
              type="text"
              id="email"
              name="email"
              value={details.email}
              onChange={(e) =>
                setDetails({ ...details, email: e.target.value })
              }
              // autoComplete="email"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-700"
            />
          </div>
          <div className="mt-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={details.password}
              onChange={(e) =>
                setDetails({ ...details, password: e.target.value })
              }
              // autoComplete="current-password"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-700"
            />
          </div>
          <div className="mt-6 flex items-center justify-between">
            {/* <div className="flex items-center">
                            <input
                                type="checkbox"
                                id="rememberMe"
                                name="rememberMe"
                                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                            />
                            <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-900">
                                Remember me
                            </label>
                        </div> */}
            <div className="text-sm">
              <Link
                href="/pages/forgotPassword"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Forgot password?
              </Link>
            </div>
          </div>
          <div className="mt-6">
            <button
              type="submit"
              className="w-full py-2 px-4 border border-transparent rounded-md text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={handleLogin}
            >
              Sign in
            </button>
          </div>
        </div>
        <p className="mt-6 text-center text-sm text-gray-500">
          Don&apos;t have an account?{" "}
          <Link
            href="/pages/signup"
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            Sign up
          </Link>
        </p>
        <p className="mt-6 text-center text-sm text-gray-500">{message}</p>
      </div>
    </div>
  );
};

export default LoginPage;
