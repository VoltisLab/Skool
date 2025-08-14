"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { PASSWORD_RESET } from "@/lib/graphql/mutations";
import { plainApolloClient } from "@/lib/plain-client";

export default function ResetPasswordPage() {
  const router = useRouter();
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ error: string; success: string }>({ error: "", success: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage({ error: "", success: "" });

    if (password.trim().length < 6) {
      setMessage({ error: "Password must be at least 6 characters.", success: "" });
      return;
    }
    if (password !== confirmPassword) {
      setMessage({ error: "Passwords do not match.", success: "" });
      return;
    }
    if (code.trim().length !== 6) {
      setMessage({ error: "Enter the 6-digit code.", success: "" });
      return;
    }

    setIsSubmitting(true);
    try {
      const { data } = await plainApolloClient.mutate({
        mutation: PASSWORD_RESET,
        variables: { code: code.trim(), password: password.trim(), confirmPassword: confirmPassword.trim() },
      });
      const resp = data?.passwordReset;
      if (resp?.message) {
        setMessage({ error: "", success: resp.message });
        setTimeout(() => router.push("/login"), 1500);
      } else {
        setMessage({ error: "Failed to reset password.", success: "" });
      }
    } catch (err) {
       console.log(err)
      setMessage({ error: "Request failed. Please try again.", success: "" });
    }
   
    setIsSubmitting(false);
  };

  return (
    <div className="w-full h-screen fixed top-0 left-0 z-[1000] bg-[rgb(248,247,245)] flex items-center justify-center p-4">
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-white rounded-xl shadow-sm border border-gray-200 px-8 py-8 space-y-4">
        <h2 className="text-xl font-semibold text-gray-900 text-center">Reset your password</h2>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Code</label>
          <input
            type="text"
            inputMode="numeric"
            maxLength={6}
            value={code}
            onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-800"
            placeholder="6-digit code"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-800"
            placeholder="Enter new password"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-800"
            placeholder="Re-enter new password"
            required
          />
        </div>

        {message.error && (
          <div className="bg-red-100 text-red-700 px-3 py-2 rounded text-sm">{message.error}</div>
        )}
        {message.success && (
          <div className="bg-green-100 text-green-700 px-3 py-2 rounded text-sm">{message.success}</div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3 px-4 bg-black hover:bg-white hover:text-black hover:border-black border border-black text-white font-semibold rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "SUBMITTING..." : "RESET PASSWORD"}
        </button>
      </form>
    </div>
  );
}
