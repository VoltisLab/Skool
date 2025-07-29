"use client";

import Link from "next/link";
import React, { useState } from "react";
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiOutlineClose,
} from "react-icons/ai";

// Type definitions
interface LoginFormData {
  email: string;
  password: string;
}

interface SignupFormData extends LoginFormData {
  firstName: string;
  lastName: string;
}

type AuthFormData = LoginFormData | SignupFormData;

interface SkoolAuthFormProps {
  mode: "login" | "signup";
  onSubmit?: (data: AuthFormData) => void;
  onModeChange?: (mode: "login" | "signup") => void;
}

const AuthForm: React.FC<SkoolAuthFormProps> = ({ mode, onSubmit }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData: AuthFormData =
      mode === "login"
        ? { email, password }
        : { firstName, lastName, email, password };
    console.log(`${mode} attempt:`, formData);
    onSubmit?.(formData);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 px-8 py-10">
          <div className="text-center">
            <h1 className="text-2xl font-bold">
              <span className="text-blue-600">s</span>
              <span className="text-red-500">k</span>
              <span className="text-yellow-500">o</span>
              <span className="text-green-500">o</span>
              <span className="text-blue-600">l</span>
            </h1>
          </div>

          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-xl font-semibold text-gray-900">
                {mode === "login" ? "Log in to Skool" : "Sign up for Skool"}
              </h2>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* First Name */}
              {mode === "signup" && (
                <div className="relative">
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    autoComplete="given-name"
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="peer w-full px-4 py-2 border-1 focus:border-2 border-gray-200 rounded-sm bg-white text-gray-900 placeholder-transparent focus:outline-none focus:border-gray-800"
                    placeholder="First Name"
                  />
                  <label
                    htmlFor="firstName"
                    className="absolute left-4 -top-2.5 bg-white px-1 text-sm font-medium text-gray-700 transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-gray-700"
                  >
                    First Name
                  </label>
                  {firstName && (
                    <button
                      type="button"
                      onClick={() => setFirstName("")}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                      <AiOutlineClose className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    </button>
                  )}
                </div>
              )}

              {/* Last Name */}
              {mode === "signup" && (
                <div className="relative">
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    autoComplete="family-name"
                    required
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="peer w-full px-4 py-2 border-1 focus:border-2 border-gray-200 rounded-sm bg-white text-gray-900 placeholder-transparent focus:outline-none focus:border-gray-800"
                    placeholder="Last Name"
                  />
                  <label
                    htmlFor="lastName"
                    className="absolute left-4 -top-2.5 bg-white px-1 text-sm font-medium text-gray-700 transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-gray-700"
                  >
                    Last Name
                  </label>
                  {lastName && (
                    <button
                      type="button"
                      onClick={() => setLastName("")}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                      <AiOutlineClose className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    </button>
                  )}
                </div>
              )}

              {/* Email */}
              <div className="relative">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="off"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="peer w-full px-4 py-2 border-1 focus:border-2 border-gray-200 rounded-sm bg-white text-gray-900 placeholder-transparent focus:outline-none focus:border-gray-800"
                  placeholder="Email"
                />
                <label
                  htmlFor="email"
                  className="absolute left-4 -top-2.5 bg-white px-1 text-sm font-medium text-gray-700 transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-gray-700"
                >
                  Email
                </label>
                {email && (
                  <button
                    type="button"
                    onClick={() => setEmail("")}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    <AiOutlineClose className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  </button>
                )}
              </div>

              {/* Password */}
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  autoComplete="off"
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="peer w-full px-4 py-2 border-1 focus:border-2 rounded-sm border-gray-200 bg-white text-gray-900 placeholder-transparent focus:outline-none focus:border-gray-800"
                  placeholder="Password"
                />
                <label
                  htmlFor="password"
                  className="absolute left-4 -top-2.5 bg-white px-1 text-sm font-medium text-gray-700 transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-gray-700"
                >
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? (
                    <AiOutlineEyeInvisible className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  ) : (
                    <AiOutlineEye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  )}
                </button>
              </div>

              {/* Forgot Password */}
              {mode === "login" && (
                <div className="flex items-center justify-between">
                  <button
                    type="button"
                    className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Forgot password?
                  </button>
                </div>
              )}

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  className="group cursor-pointer relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-semibold rounded-lg text-black bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition-colors duration-200"
                >
                  {mode === "login" ? "LOG IN" : "SIGN UP"}
                </button>
              </div>

              {/* Auth Switch Link */}
              <div className="text-center">
                <span className="text-sm text-gray-600">
                  {mode === "login"
                    ? "Don't have an account? "
                    : "Already have an account? "}
                  <Link
                    prefetch
                    href={mode === "login" ? "/create-account" : "/login"}
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    {mode === "login" ? "Sign up for free" : "Log in"}
                  </Link>
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
