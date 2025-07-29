"use client";
import React, { useState } from "react";
import AuthForm from "@/components/auth/authForm";

// Reuse same types used in AuthForm
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
  const [mode, setMode] = useState<"login" | "signup">("login");

  const handleFormSubmit = (data: AuthFormData) => {
    if (mode === "login") {
      console.log("Processing login:", data);
      // Your existing login logic here
    } else {
      console.log("Processing signup:", data);
      // Your signup logic here
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
