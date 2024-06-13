"use client";
import axios from 'axios';
import Link from 'next/link';
import React, { useState } from 'react'

const ForgotPassword = () => {
    const [email, setEmail] = useState("")
    const [message, setMessage] = useState("A reset password link will be sent on the email.")

    const handleForgotPassword = async () => {
        setMessage("Sending email...")
        const response = await axios.post("/api/users/forgotPassword", { email })
        setMessage(response.data.message)
        console.log(response.data)
    }
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-[25rem] w-full px-6 py-8 bg-white rounded-md mx-2">
        <h2 className="text-3xl font-semibold text-center text-indigo-600">
          Sangam
        </h2>
        <h2 className="italic text-sm font-semibold text-center text-green-600">
          A place where hearts connect
        </h2>
        <h2 className="mt-4 text-md font-semibold text-center text-indigo-600">
          Reset your Password
        </h2>
        <div className="mt-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="text"
              id="email"
              name="email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              // autoComplete="email"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-700"
            />
          </div>
          <div className="mt-6">
            <button
              type="submit"
              className="w-full py-2 px-4 border border-transparent rounded-md text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={handleForgotPassword}
            >
              Continue
            </button>
          </div>
        </div>
        <p className="mt-6 text-center text-sm text-gray-500">
          Remember your password?{" "}
          <Link
            href="/login"
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            Sign In
          </Link>
        </p>
        <p className="mt-6 text-center text-sm text-gray-500">{message}</p>
      </div>
    </div>
  );
}

export default ForgotPassword