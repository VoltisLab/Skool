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
    <div className="w-full h-screen fixed top-0 left-0 z-[1000] bg-[rgb(248,247,245)] flex items-center justify-center ">
      <AuthForm
        mode={mode}
        onSubmit={(data) => console.log("Signup", data)}      // onModeChange={setMode}
      />

    </div>
  );
};

export default AuthPage;
