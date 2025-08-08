'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { gql } from '@apollo/client';
import { plainApolloClient } from '@/lib/plain-client'; // <-- adjust to your path
import { useAuth } from '@/lib/contexts/AuthContext';
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiOutlineClose,
} from 'react-icons/ai';

type Mode = 'login' | 'signup' | 'verify' | 'forgot' | 'verification';

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

interface SkoolAuthFormProps {
  mode: Mode;
  onSubmit?: (data: AuthFormData) => void;
  onBack?: () => void;
  emailForVerify?: string;
  email?: string;
  isLoading?: boolean;
  errorMessage?: string;
  successMessage?: string;
}

/** Mutation to send verification email (login OTP) */
const SEND_VERIFICATION_EMAIL = gql`
  mutation SendVerificationEmail(
    $email: String!
    $isAccountVerification: Boolean
    $isLoginVerification: Boolean
  ) {
    sendVerificationEmail(
      email: $email
      isAccountVerification: $isAccountVerification
      isLoginVerification: $isLoginVerification
    ) {
      message
      success
    }
  }
`;

const AuthForm: React.FC<SkoolAuthFormProps> = ({
  mode,
  onSubmit,
  emailForVerify,
  email: propEmail,
  isLoading = false,
  errorMessage,
  successMessage,
}) => {
  const router = useRouter();
  const { login } = useAuth();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState(propEmail || '');
  const [password, setPassword] = useState('');
  const [code, setCode] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [resendCounter, setResendCounter] = useState(60);

  // Modal + code flow state
  const [codeModalOpen, setCodeModalOpen] = useState(false);
  const [modalCode, setModalCode] = useState('');
  const [codeSent, setCodeSent] = useState(false);
  const [modalError, setModalError] = useState<string | null>(null);
  const [sendingCode, setSendingCode] = useState(false);
  const [verifying, setVerifying] = useState(false);

  // Form-level success message shown above submit button
  const [formSuccess, setFormSuccess] = useState<string | null>(null);

  // keep local email in sync with prop
  useEffect(() => {
    if (propEmail) setEmail(propEmail);
  }, [propEmail]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if ((mode === 'verify' || mode === 'verification') && resendCounter > 0) {
      timer = setTimeout(() => setResendCounter((s) => s - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [resendCounter, mode]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return;

    const formData: AuthFormData =
      mode === 'login'
        ? { email, password }
        : mode === 'signup'
        ? { firstName, lastName, email, password }
        : mode === 'verify' || mode === 'verification'
        ? { code }
        : { email };

    onSubmit?.(formData);
  };

  const displayEmail = emailForVerify || propEmail || email;
  const emailFilled = Boolean((propEmail ?? email).trim());

  const getTitle = () => {
    switch (mode) {
      case 'login':
        return 'Log in to your account';
      case 'signup':
        return 'Sign up for free';
      case 'verify':
      case 'verification':
        return 'We sent you a code';
      case 'forgot':
        return 'Forgot Password';
      default:
        return '';
    }
  };

  const getButtonText = () => {
    if (isLoading) {
      switch (mode) {
        case 'login':
          return 'LOGGING IN...';
        case 'signup':
          return 'SIGNING UP...';
        case 'verify':
        case 'verification':
          return 'VERIFYING...';
        case 'forgot':
          return 'SENDING EMAIL...';
        default:
          return 'LOADING...';
      }
    }

    switch (mode) {
      case 'login':
        return 'LOG IN';
      case 'signup':
        return 'SIGN UP';
      case 'verify':
      case 'verification':
        return 'VERIFY';
      case 'forgot':
        return 'EMAIL ME';
      default:
        return 'SUBMIT';
    }
  };

  /** Click "login with code" -> send code first, then open modal on success */
  const handleClickLoginWithCode = async () => {
    if (!emailFilled || sendingCode) return;

    setModalError(null);
    setSendingCode(true);
    try {
      const { data } = await plainApolloClient.mutate({
        mutation: SEND_VERIFICATION_EMAIL,
        variables: {
          email: (propEmail ?? email).trim(),
          isAccountVerification: false,
          isLoginVerification: true,
        },
      });

      const res = data?.sendVerificationEmail;
      if (!res?.success) {
        setModalError(res?.message || 'Failed to send code. Try again.');
        setCodeSent(false);
        setCodeModalOpen(true); // let user retry
        return;
      }

      setCodeSent(true);
      setModalCode('');
      setCodeModalOpen(true); // open after successful send
    } catch (err: unknown) {
  if (err instanceof Error) {
    setModalError(err.message);
  } else if (typeof err === 'string') {
    setModalError(err);
  } else {
    setModalError('Failed to send code. Try again.');
  }
  setCodeSent(false);
  setCodeModalOpen(true);
} finally {
      setSendingCode(false);
    }
  };

  /** Verify code inside modal -> login(email, undefined, code), then show success on form and redirect */
  const handleVerifyCode = async () => {
    if (!modalCode || modalCode.trim().length !== 6 || verifying) return;

    setModalError(null);
    setVerifying(true);
    try {
      const { success, errors } = await login(
        (propEmail ?? email).trim(),
        undefined,
        modalCode.trim()
      );

      if (success) {
        setCodeModalOpen(false);
        setFormSuccess('Login successful, redirecting...');
        setTimeout(() => {
          router.push('/dashboard');
        }, 1500);
        return;
      }

      setModalError(
        Array.isArray(errors) ? errors.join(', ') : String(errors || 'Verification failed')
      );
    } catch (err: unknown) {
  if (err instanceof Error) {
    setModalError(err.message);
  } else if (typeof err === 'string') {
    setModalError(err);
  } else {
    setModalError('Verification failed');
  }
} finally {
      setVerifying(false);
    }
  };

  return (
    <div className="h-fit flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-lg">
        <div className="w-full min-w-[26rem] bg-white rounded-xl shadow-sm border border-gray-200 px-10 py-12">
          <div className="flex w-full justify-center items-center mb-6">
            <Image src="/logo.svg" alt="logo" height={30} width={30} />
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="text-center">
              <h2 className="text-xl font-semibold text-gray-900">
                {getTitle()}
              </h2>
              {(mode === 'verify' || mode === 'verification') && (
                <p className="text-sm mt-1 text-gray-600">
                  Enter it below to verify your email <br />
                  <span className="font-medium text-black">{displayEmail}</span>
                </p>
              )}
              {mode === 'forgot' && (
                <p className="text-sm mt-1 text-gray-600">
                  Enter your email address and we&apos;ll send you a link to reset your password.
                </p>
              )}
            </div>

            {/* Sign up fields */}
            {mode === 'signup' && (
              <>
                <InputField
                  label="First Name"
                  value={firstName}
                  setValue={setFirstName}
                  disabled={isLoading}
                />
                <InputField
                  label="Last Name"
                  value={lastName}
                  setValue={setLastName}
                  disabled={isLoading}
                />
              </>
            )}

            {/* Email */}
            {mode !== 'verify' && mode !== 'verification' && (
              <InputField
                label="Email"
                type="email"
                value={email}
                setValue={setEmail}
                disabled={isLoading}
              />
            )}

            {/* Password */}
            {(mode === 'login' || mode === 'signup') && (
              <InputField
                label="Password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                setValue={setPassword}
                disabled={isLoading}
                icon={
                  showPassword ? (
                    <AiOutlineEyeInvisible className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  ) : (
                    <AiOutlineEye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  )
                }
                onIconClick={() => setShowPassword(!showPassword)}
              />
            )}

            {/* Code for verify routes (if you still use them) */}
            {(mode === 'verify' || mode === 'verification') && (
              <InputField
                label="Verification Code"
                value={code}
                setValue={setCode}
                disabled={isLoading}
                maxLength={6}
                placeholder="Enter 6-digit code"
              />
            )}

            {/* Forgot + Login with code */}
            {mode === 'login' && (
              <div className="flex items-center justify-between w-full">
                <Link
                  href="/forgot-password"
                  className="text-sm cursor-pointer text-blue-600 hover:underline"
                >
                  Forgot password?
                </Link>

                {emailFilled && (
                  <button
                    type="button"
                    onClick={handleClickLoginWithCode}
                    className="text-sm text-blue-600 hover:underline disabled:opacity-50"
                    disabled={sendingCode}
                  >
                    {sendingCode ? 'sending…' : 'login with code'}
                  </button>
                )}
              </div>
            )}

            {/* Error from parent (if any) */}
            {errorMessage && (
              <div className="bg-red-100 text-red-700 px-4 py-2 rounded text-sm font-medium text-center">
                {errorMessage}
              </div>
            )}

            {/* ✅ Success message shown on the login form (above submit button) */}
            {(formSuccess || successMessage) && (
              <div className="bg-green-100 text-green-700 px-4 py-2 rounded text-sm font-medium text-center">
                {formSuccess || successMessage}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 bg-[#313273] hover:bg-[#2a2a5a] text-white font-semibold rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {getButtonText()}
            </button>

            {/* Switch mode */}
            {(mode === 'login' || mode === 'signup') && (
              <div className="text-center text-sm text-gray-600">
                {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
                {mode === 'login' ? (
                  <Link
                    href="/signup"
                    className="text-blue-600 hover:underline font-medium"
                  >
                    Sign up for free
                  </Link>
                ) : (
                  <Link
                    href="/login"
                    className="text-blue-600 cursor-pointer hover:underline font-medium"
                  >
                    login
                  </Link>
                )}
              </div>
            )}
          </form>
        </div>
      </div>

      {/* ---------- Code Modal ---------- */}
      {codeModalOpen && (
        <CodeModal
          email={(propEmail ?? email).trim()}
          onClose={() => setCodeModalOpen(false)}
          onVerify={handleVerifyCode}
          isLoading={verifying}
          code={modalCode}
          setCode={setModalCode}
          codeSent={codeSent}
          error={modalError}
        />
      )}
    </div>
  );
};

// Reusable Input Field
const InputField = ({
  label,
  value,
  setValue,
  type = 'text',
  icon,
  onIconClick,
  disabled = false,
  maxLength,
  placeholder,
}: {
  label: string;
  value: string;
  setValue: (val: string) => void;
  type?: string;
  icon?: React.ReactNode;
  onIconClick?: () => void;
  disabled?: boolean;
  maxLength?: number;
  placeholder?: string;
}) => (
  <div className="relative">
    <input
      id={label}
      name={label}
      type={type}
      value={value}
      required
      disabled={disabled}
      maxLength={maxLength}
      onChange={(e) => setValue(e.target.value)}
      placeholder={placeholder || label}
      className="peer w-full px-4 py-2 border focus:border-2 border-gray-200 rounded-sm bg-white text-gray-900 placeholder-transparent focus:outline-none focus:border-gray-800 disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50"
    />
    <label
      htmlFor={label}
      className="absolute left-4 -top-2.5 bg-white px-1 text-sm font-medium text-gray-700 transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-gray-700"
    >
      {label}
    </label>
    {value && !disabled && (
      <button
        type="button"
        onClick={() => setValue('')}
        className="absolute inset-y-0 right-8 pr-3 flex items-center"
        aria-label={`Clear ${label}`}
      >
        <AiOutlineClose className="h-5 w-5 text-gray-400 hover:text-gray-600" />
      </button>
    )}
    {icon && (
      <button
        type="button"
        onClick={onIconClick}
        disabled={disabled}
        className="absolute inset-y-0 right-0 pr-3 flex items-center disabled:opacity-50"
        aria-label={`Toggle ${label} visibility`}
      >
        {icon}
      </button>
    )}
  </div>
);

/** ---------- Modal Component ---------- */
function CodeModal({
  email,
  onClose,
  onVerify,
  isLoading,
  code,
  setCode,
  codeSent,
  error,
}: {
  email: string;
  onClose: () => void;
  onVerify: () => void;
  isLoading: boolean;
  code: string;
  setCode: (v: string) => void;
  codeSent: boolean;
  error: string | null;
}) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  // close on click outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [onClose]);

  // close on Escape
  useEffect(() => {
    const keyHandler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', keyHandler);
    return () => window.removeEventListener('keydown', keyHandler);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4">
      <div
        ref={wrapperRef}
        role="dialog"
        aria-modal="true"
        className="w-full max-w-md rounded-xl bg-white shadow-lg border border-gray-200 p-6"
      >
        <div className="flex items-start justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Login with code</h3>
          <button
            onClick={onClose}
            className="p-1 rounded hover:bg-gray-100"
            aria-label="Close"
            disabled={isLoading}
          >
            <AiOutlineClose className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        <p className="text-sm text-gray-600 mb-4">
          {codeSent
            ? <>We sent a 6-digit code to <span className="font-medium text-gray-900">{email}</span>.</>
            : <>Preparing to send code…</>}
        </p>

        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Enter code
            </label>
            <input
              type="text"
              inputMode="numeric"
              maxLength={6}
              value={code}
              onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))}
              placeholder="6-digit code"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-800"
            />
          </div>

          {error && (
            <div className="bg-red-100 text-red-700 px-3 py-2 rounded text-sm">
              {error}
            </div>
          )}

          <button
            type="button"
            onClick={onVerify}
            disabled={isLoading || code.trim().length !== 6}
            className="w-full py-2.5 px-4 rounded-lg bg-[#313273] hover:bg-[#2a2a5a] text-white font-semibold disabled:opacity-50"
          >
            {isLoading ? 'Verifying…' : 'Log In'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AuthForm;
