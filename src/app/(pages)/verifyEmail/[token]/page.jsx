"use client";

import axios from "axios";
import { useParams } from "next/navigation";
import React, { useState } from "react";

const ResetPassword = () => {
  const params = useParams();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [mailMessage, setMailMessage] = useState("")

  const verifyEmail = async () => {
    const response = await axios.post("/api/users/verifyEmail", {
      token: params.token,
    });
    if (!response.data.success) {
      setMessage("This link has expired");
    } else {
      setMessage("Email verified successfully");
    }
  };

  const sendVerificationEmail = async () => {
    console.log(email)
    setMailMessage("Sending verification email...")
    const response = await axios.post("/api/users/sendVerifyEmail", {email});
    if (!response.data.success) {
        setMailMessage(response.data.message)
        return;
    } 
    setMailMessage(response.data.message)
  }

  return (
    <div>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="max-w-[25rem] w-full px-6 py-8 bg-white rounded-md mx-2">
          <h2 className="text-3xl font-semibold text-center text-indigo-600">
            Sangam
          </h2>
          <h2 className="italic text-sm font-semibold text-center text-green-600">
            A place where hearts connect
          </h2>
          <h2 className="mt-4 text-md font-semibold text-center text-indigo-600">
            Email Verification
          </h2>
          <div className="mt-4">
            {message == "Regenerate Verification Link" ? (
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Enter email to verify
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-700"
                />
                <button
                  type="submit"
                  className="mt-2 w-full py-2 px-4 border border-transparent rounded-md text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  onClick={sendVerificationEmail}
                >
                  Click here to Generate Link
                </button>
                <p className="mt-6 text-center text-sm text-gray-500">{mailMessage}</p>
              </div>
            ) : (
                <>
              <div className="mt-6">
                <button
                  type="submit"
                  className="w-full py-2 px-4 border border-transparent rounded-md text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  onClick={verifyEmail}
                >
                  Click here to Verify
                </button>
              </div>
            <p className="mt-6 text-center text-sm text-gray-500">{message} {" "} 
                { message == "This link has expired" && <span onClick={() => {setMessage("Regenerate Verification Link")}} className="font-bold text-indigo-500">Click here to try again.</span>}
            </p>
            </>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
