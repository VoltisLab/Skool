"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import AuthForm from "@/components/auth/authForm";
import { plainApolloClient } from "@/lib/plain-client";
import { SEND_VERIFICATION_EMAIL } from "@/lib/graphql/mutations";

interface ForgotFormData { email: string }
interface VerifyFormData { code: string }

type AuthFormData = ForgotFormData | VerifyFormData;

export default function ForgotPasswordPage() {
  const router = useRouter();
    const [email, setEmail] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ error: "", success: "" });

  const handleSubmit = async (data: AuthFormData) => {
    setMessage({ error: "", success: "" });

    if ("email" in data) {
      setIsSubmitting(true);
      try {
        const variables = {
          email: data.email,
          isAccountVerification: false,
          isLoginVerification: false,
        };
        console.log('[forgot-password] sendVerificationEmail variables:', variables);

        const res = await plainApolloClient.mutate({
          mutation: SEND_VERIFICATION_EMAIL,
          variables,
        });
        console.log('[forgot-password] sendVerificationEmail raw response:', res);

        const response = res.data?.sendVerificationEmail;
        console.log('[forgot-password] sendVerificationEmail payload:', response);

        if (response?.success) {
          setEmail(data.email);
          // Navigate to reset page with email in query for convenience
          router.push(`/forgot-password/reset?email=${encodeURIComponent(data.email)}`);
        } else {
          setMessage({ error: response?.message || "Failed to send verification email", success: "" });
        }
      } catch (err) {
        console.error('[forgot-password] sendVerificationEmail error:', err);
        setMessage({ error: "An error occurred while sending the verification email.", success: "" });
      }
      setIsSubmitting(false);
      return;
    }
  };

  return (
    <div className="w-full h-screen fixed top-0 left-0 z-[1000] bg-[rgb(248,247,245)] flex items-center justify-center">
      <AuthForm
        mode="forgot"
        onSubmit={handleSubmit}
        email={email}
        isLoading={isSubmitting}
        errorMessage={message.error}
        successMessage={message.success}
      />
    </div>
  );
}
