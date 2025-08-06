"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import AuthForm from "@/components/auth/authForm";
import { useAuth } from "@/lib/contexts/AuthContext";
import { RegisterInput } from "@/lib/types/auth";

const SignupPage: React.FC = () => {
  const router = useRouter();
  const { register, isAuthenticated, isLoading } = useAuth();
  
  // State to track signup flow
  const [signupStep, setSignupStep] = useState<'form' | 'verification'>('form');
  const [signupData, setSignupData] = useState<RegisterInput | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSignup = async (data: { email: string; password: string } | { firstName: string; lastName: string; email: string; password: string } | { code: string } | { email: string }) => {
    console.log("Signup", data);
    
    // First step: User submitted signup form
    if ('firstName' in data && 'lastName' in data && 'email' in data && 'password' in data) {
      const newSignupData: RegisterInput = {
        code: "", // Empty code for initial request
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        password1: data.password,
        password2: data.password,
        username: data.email.split('@')[0]
      };
      
      setIsSubmitting(true);
      
      // Store signup data and move to verification step
      setSignupData(newSignupData);
      
      // Here you might want to call an API to send the verification email
      // For now, we'll just move to the verification step
      setSignupStep('verification');
      setIsSubmitting(false);
    }
    
    // Second step: User submitted verification code
    else if ('code' in data && signupData) {
      setIsSubmitting(true);
      
      const finalSignupData: RegisterInput = {
        ...signupData,
        code: data.code // Add the verification code
      };
      
      const result = await register(finalSignupData);
      
      if (result.success) {
        // Registration successful, redirect to login
        router.push('/login');
      } else {
        // Handle registration errors
        console.error('Registration failed:', result.errors);
        // You might want to show error messages to the user
        // For verification errors, you could stay on verification step
      }
      
      setIsSubmitting(false);
    }
  };

  const handleBackToForm = () => {
    setSignupStep('form');
    setSignupData(null);
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
    <div className="w-full h-screen fixed top-0 left-0 z-[1000] bg-[rgb(248,247,245)] flex items-center justify-center">
      <AuthForm
        mode={signupStep === 'form' ? 'signup' : 'verification'}
        onSubmit={handleSignup}
        onBack={signupStep === 'verification' ? handleBackToForm : undefined}
        email={signupData?.email}
        isLoading={isSubmitting}
      />
    </div>
  );
};

export default SignupPage;