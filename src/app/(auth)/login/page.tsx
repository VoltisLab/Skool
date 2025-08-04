"use client";
import React from "react";
import { useRouter } from "next/navigation";
import AuthForm from "@/components/auth/authForm";

interface LoginFormData {
  email: string;
  password: string;
}

type AuthFormData = LoginFormData | { firstName: string; lastName: string; email: string; password: string } | { code: string } | { email: string };

const AuthPage: React.FC = () => {
  const router = useRouter();

  const handleLogin = (data: AuthFormData) => {
    console.log("Login", data);
    // In a real app, you would validate credentials here
    // For now, we'll just redirect to dashboard
    router.push('/dashboard');
  };

  return (
    <div className="w-full h-screen fixed top-0 left-0 z-[1000] bg-[rgb(248,247,245)] flex items-center justify-center ">
      <AuthForm
        mode="login"
        onSubmit={handleLogin}
      />
    </div>
  );
};

export default AuthPage;
