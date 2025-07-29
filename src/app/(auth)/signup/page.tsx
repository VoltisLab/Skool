"use client";
import React, { useState } from "react";
import AuthForm from "@/components/auth/authForm";

// Reuse the same types defined in AuthForm
interface LoginFormData {
  email: string;
  password: string;
}

interface SignupFormData extends LoginFormData {
  firstName: string;
  lastName: string;
}

type AuthFormData = LoginFormData | SignupFormData;

const AuthPage: React.FC = () => {
  const [mode, setMode] = useState<"login" | "signup">("signup");

  const handleFormSubmit = (data: AuthFormData) => {
    if (mode === "login") {
      console.log("Processing login:", data);
      // Add login logic here (API call, redirect, etc.)
    } else {
      console.log("Processing signup:", data);
      // Add signup logic here
    }
  };

  return (
    <AuthForm
      mode={mode}
      onSubmit={handleFormSubmit}
      // onModeChange={setMode}
    />
  );
};

export default AuthPage;
