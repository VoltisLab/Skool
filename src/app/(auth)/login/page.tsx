"use client";
import React from "react";
import { useRouter } from "next/navigation";
import AuthForm from "@/components/auth/authForm";
import { useAuth } from "@/lib/contexts/AuthContext";

const AuthPage: React.FC = () => {
  const router = useRouter();
  const { login, isAuthenticated, isLoading } = useAuth();

  const handleLogin = async (data: { email: string; password: string } | { firstName: string; lastName: string; email: string; password: string } | { code: string } | { email: string }) => {
    console.log("Login", data);
    
        if ('email' in data && 'password' in data) {
      const result = await login(data.email, data.password);
      
      if (result.success) {
        router.push('/dashboard');
      } else {
        // Handle login errors
        console.error('Login failed:', result.errors);
        // You might want to show error messages to the user
      }
    }
  };

  // Redirect if already authenticated
  React.useEffect(() => {
    if (isAuthenticated && !isLoading) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
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
    <div className="w-full h-screen fixed top-0 left-0 z-[1000] bg-[rgb(248,247,245)] flex items-center justify-center ">
      <AuthForm
        mode="login"
        onSubmit={handleLogin}
      />
    </div>
  );
};

export default AuthPage;
