'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AuthForm from '@/components/auth/authForm';
import { useAuth } from '@/lib/contexts/AuthContext';
import { RegisterInput } from '@/lib/types/auth';
import { SEND_VERIFICATION_EMAIL } from '@/lib/graphql/mutations';
import { plainApolloClient } from '@/lib/plain-client';

interface LoginFormData {
  email: string;
  password: string;
}

interface SignupFormData extends LoginFormData {
  firstName: string;
  lastName: string;
}

interface VerifyFormData {
  code: string;
}

interface ForgotFormData {
  email: string;
}

type AuthFormData =
  | LoginFormData
  | SignupFormData
  | VerifyFormData
  | ForgotFormData;

const SignupPage: React.FC = () => {
  const router = useRouter();
  const { register, isAuthenticated, isLoading } = useAuth();

  const [signupStep, setSignupStep] = useState<'form' | 'verification'>('form');
  const [signupData, setSignupData] = useState<RegisterInput | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ error: '', success: '' });

  const handleSignup = async (data: AuthFormData) => {
    setMessage({ error: '', success: '' }); // Reset messages on each submit

    // Step 1: Full form submitted
    if ('firstName' in data && 'lastName' in data && 'email' in data && 'password' in data) {
      const newSignupData: RegisterInput = {
        code: '',
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        password1: data.password,
        password2: data.password,
        username: data.email.split('@')[0],
      };

      setIsSubmitting(true);

      try {
        const res = await plainApolloClient.mutate({
          mutation: SEND_VERIFICATION_EMAIL,
          variables: {
            email: data.email,
            isAccountVerification: true,
            isLoginVerification: false,
          },
        });

        const response = res.data?.sendVerificationEmail;

        if (response?.success) {
          setMessage({ success: response.message || 'Verification email sent.', error: '' });
          setSignupData(newSignupData);
          setSignupStep('verification');
        } else {
          setMessage({ error: response?.message || 'Failed to send verification email', success: '' });
        }
      } catch (err) {
        console.error('Verification email error:', err);
        setMessage({ error: 'An error occurred while sending the verification email.', success: '' });
      }

      setIsSubmitting(false);
    }

    // Step 2: Verification code submitted
    else if ('code' in data && signupData) {
      setIsSubmitting(true);

      const finalSignupData: RegisterInput = {
        ...signupData,
        code: data.code,
      };

      const result = await register(finalSignupData);

      if (result.success) {
        router.push('/login');
      } else {
        console.error('Registration failed:', result.errors);
        setMessage({
          error: result.errors?.join('\n') || 'Registration failed',
          success: '',
        });
      }

      setIsSubmitting(false);
    }
  };

  const handleBackToForm = () => {
    setSignupStep('form');
    setSignupData(null);
    setMessage({ error: '', success: '' });
  };

  useEffect(() => {
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
      <div className="w-full max-w-md space-y-4">
        
        <AuthForm
          mode={signupStep === 'form' ? 'signup' : 'verification'}
          onSubmit={handleSignup}
          onBack={signupStep === 'verification' ? handleBackToForm : undefined}
          email={signupData?.email}
          isLoading={isSubmitting}
          errorMessage={message?.error}
          successMessage={message?.success}
        />
      </div>
    </div>
  );
};

export default SignupPage;
