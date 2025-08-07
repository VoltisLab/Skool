"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AuthForm from "@/components/auth/authForm";
import { useAuth } from "@/lib/contexts/AuthContext";

const AuthPage: React.FC = () => {
  const router = useRouter();
  const { login, isAuthenticated, isLoading:loading } = useAuth();

  const [message, setMessage] = useState({ error: "", success: "" });
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async (
    data:
      | { email: string; password: string }
      | { firstName: string; lastName: string; email: string; password: string }
      | { code: string }
      | { email: string }
  ) => {
    setMessage({ error: "", success: "" });
    setIsLoading(true)

    if ("email" in data && "password" in data) {
      const result = await login(data.email, data.password);

      if (result.success) {
        setMessage({ success: "Login successful! Redirecting...", error: "" });
        router.push("/dashboard");
      } else {
        console.error("Login failed:", result.errors);
        setMessage({
          error: result.errors?.toString() || "Login failed",
          success: "",
        });
      }
    }
        setIsLoading(false)

  };

  useEffect(() => {
    if (isAuthenticated && !loading) {
      router.push("/dashboard");
    }
  }, [isAuthenticated, loading, router]);

  if (loading) {
    return (
      <div className="w-full h-screen fixed top-0 left-0 z-[1000] bg-[rgb(248,247,245)] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-screen fixed top-0 left-0 z-[1000] bg-[rgb(248,247,245)] flex items-center justify-center">
      <AuthForm
        mode="login"
        onSubmit={handleLogin}
        isLoading={isLoading}
        errorMessage={message.error}
        successMessage={message.success}
      />
    </div>
  );
};

export default AuthPage;
