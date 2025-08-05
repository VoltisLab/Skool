"use client";
import React from "react";
import { useRouter } from "next/navigation";
import AuthForm from "@/components/auth/authForm";
import { useAuth } from "@/lib/contexts/AuthContext";
import { RegisterInput } from "@/lib/types/auth";

const SignupPage: React.FC = () => {
  const router = useRouter();
  const { register, isAuthenticated, isLoading } = useAuth();

  const handleSignup = async (data: { email: string; password: string } | { firstName: string; lastName: string; email: string; password: string } | { code: string } | { email: string }) => {
    console.log("Signup", data);
    
    if ('firstName' in data && 'lastName' in data && 'email' in data && 'password' in data) {
      const signupData: RegisterInput = {
        code: "",
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        password1: data.password,
        password2: data.password,
        username: data.email.split('@')[0]
      };
    
          const result = await register(signupData);
      
      if (result.success) {
        // Registration successful, redirect to login
        router.push('/login');
      } else {
        // Handle registration errors
        console.error('Registration failed:', result.errors);
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
        mode="signup"
        onSubmit={handleSignup}
      />
    </div>
  );
};

export default SignupPage;
