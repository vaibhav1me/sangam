"use client"

import axios from 'axios';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const ResetPassword = () => {
    const params = useParams()
    const [details, setDetails] = useState({password: '', confirmPassword: ''})
    const [message, setMessage] = useState('')

    const handleResetPassword = async () => {
      if (details.password !== details.confirmPassword) {
        setMessage('Passwords do not match')
        return;
      }
      setMessage('Resetting password...')
      const response = await axios.patch("/api/users/resetPassword", {password: details.password, token: params.token})
      if (response.data.success === false && response.data.message === "Invalid token") {
        setMessage('This link has expired.')
      } else if (response.data.success === false) {
        setMessage(response.data.message)
      } else {
        setMessage(response.data.message)
      }
      console.log(response.data)
    }

  return (
    <div>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="max-w-[25rem] w-full px-6 py-8 bg-white rounded-md mx-2">
          <h2 className="text-3xl font-semibold text-center text-indigo-600">
            Sangama
          </h2>
          <h2 className="italic text-sm font-semibold text-center text-green-600">
            A place where hearts connect
          </h2>
          <h2 className="mt-4 text-md font-semibold text-center text-indigo-600">
            Reset your Password
          </h2>
          {message == "This link has expired." ? (
            <div className="max-w-[25rem] w-full px-6 py-8 bg-white rounded-md text-sm mx-2 text-indigo-600">
              {message}{" "}
              <Link className='font-bold underline underline-offset-2' href="/pages/forgotPassword">
                Try resetting it again here.
              </Link>
            </div>
          ) : (
            <>
              <div className="mt-4">
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    New Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={details.password}
                    onChange={(e) =>
                      setDetails({ ...details, password: e.target.value })
                    }
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-700"
                  />
                </div>
                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={details.confirmPassword}
                    onChange={(e) =>
                      setDetails({
                        ...details,
                        confirmPassword: e.target.value,
                      })
                    }
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-700"
                  />
                </div>
                <div className="mt-6">
                  <button
                    type="submit"
                    className="w-full py-2 px-4 border border-transparent rounded-md text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    onClick={handleResetPassword}
                  >
                    Continue
                  </button>
                </div>
              </div>
              {/* <p className="mt-6 text-center text-sm text-gray-500">
            Remember your password?{" "}
            <Link
              href="/pages/login"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Sign In
            </Link>
          </p> */}
              <p className="mt-6 text-center text-sm text-gray-500">
                {message}
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default ResetPassword