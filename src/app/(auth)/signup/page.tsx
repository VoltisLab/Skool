"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import AuthForm from "@/components/auth/authForm";
import { useAuth, sendVerificationEmail } from "@/lib/contexts/AuthContext";
import { RegisterInput } from "@/lib/types/auth";

const SignupPage: React.FC = () => {
  const router = useRouter();
  const { register, isAuthenticated, isLoading, login } = useAuth();
  
  // State to track signup flow
  const [signupStep, setSignupStep] = useState<'form' | 'verification'>('form');
  const [signupData, setSignupData] = useState<RegisterInput | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSignup = async (data: { email: string; password: string } | { firstName: string; lastName: string; email: string; password: string } | { code: string } | { email: string }) => {
    console.log("Signup", data);
    
    // First step: User submitted signup form
    if ('firstName' in data && 'lastName' in data && 'email' in data && 'password' in data) {
      const newSignupData: RegisterInput = {
        code: "",
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        password1: data.password,
        password2: data.password,
        username: data.email.split('@')[0]
      };
      setIsSubmitting(true);
      // Send verification email
      const verificationResult = await sendVerificationEmail(data.email);
      if (verificationResult?.success) {
        setSignupData(newSignupData);
        setSignupStep('verification');
      } else {
        // Handle error (show message to user)
        alert(verificationResult?.message || 'Failed to send verification email.');
      }
      setIsSubmitting(false);
    }
    
    // Second step: User submitted verification code
    else if ('code' in data && signupData) {
      setIsSubmitting(true);
      const finalSignupData: RegisterInput = {
        ...signupData,
        code: data.code
      };
      const result = await register(finalSignupData);
      if (result.success) {
        // Automatically log in the user after successful registration
        const loginResult = await login(finalSignupData.email, finalSignupData.password1);
        if (loginResult.success) {
          // Redirect to dashboard or home
          router.push('/dashboard');
        } else {
          // If login fails, redirect to login page
          router.push('/login');
        }
      } else {
        // Handle registration errors
        console.error('Registration failed:', result.errors);
        // You might want to show error messages to the user
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