'use client';

import { useEffect, useRef, useState } from 'react';
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiOutlineClose,
} from 'react-icons/ai';

interface ChangePasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ChangePasswordModal({ isOpen, onClose }: ChangePasswordModalProps) {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const modalRef = useRef<HTMLFormElement>(null);

  const isDisabled = !oldPassword || !newPassword || !confirmPassword;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ oldPassword, newPassword, confirmPassword });
    onClose()
  };

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <form
        ref={modalRef}
        onSubmit={handleSubmit}
        className="max-w-sm w-full bg-white p-6 rounded-xl shadow border border-gray-200 space-y-6"
      >
        <h2 className="text-lg font-semibold text-gray-900">Change password</h2>

        <InputField
          label="Old password"
          type="password"
          value={oldPassword}
          setValue={setOldPassword}
        />

        <InputField
          label="New password"
          type={showNewPassword ? 'text' : 'password'}
          value={newPassword}
          setValue={setNewPassword}
          icon={
            showNewPassword ? (
              <AiOutlineEyeInvisible className="h-5 w-5 text-gray-400 hover:text-gray-600" />
            ) : (
              <AiOutlineEye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
            )
          }
          onIconClick={() => setShowNewPassword(!showNewPassword)}
        />

        <InputField
          label="Confirm new password"
          type={showConfirmPassword ? 'text' : 'password'}
          value={confirmPassword}
          setValue={setConfirmPassword}
          icon={
            showConfirmPassword ? (
              <AiOutlineEyeInvisible className="h-5 w-5 text-gray-400 hover:text-gray-600" />
            ) : (
              <AiOutlineEye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
            )
          }
          onIconClick={() => setShowConfirmPassword(!showConfirmPassword)}
        />

        <div className="flex justify-end gap-4 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="text-sm font-semibold text-gray-500 hover:text-black"
          >
            CANCEL
          </button>
          <button
            type="submit"
            disabled={isDisabled}
            className={`text-sm font-semibold text-white rounded-md px-4 py-2 ${
              isDisabled
                ? 'bg-gray-300 cursor-not-allowed'
                : 'bg-[#313273] hover:bg-[#2a2a5a]'
            }`}
          >
            CHANGE
          </button>
        </div>
      </form>
    </div>
  );
}

// 🔁 Reusable Input Field
const InputField = ({
  label,
  value,
  setValue,
  type = 'text',
  icon,
  onIconClick,
}: {
  label: string;
  value: string;
  setValue: (val: string) => void;
  type?: string;
  icon?: React.ReactNode;
  onIconClick?: () => void;
}) => (
  <div className="relative">
    <input
      id={label}
      name={label}
      type={type}
      value={value}
      required
      onChange={(e) => setValue(e.target.value)}
      placeholder={label}
      className="peer w-full px-4 py-2 border focus:border-2 border-gray-200 rounded-sm bg-white text-gray-900 placeholder-transparent placeholder:text-sm focus:outline-none focus:border-gray-800"
    />
    <label
      htmlFor={label}
      className="absolute left-4 -top-2.5 bg-white px-1 text-sm font-medium text-gray-700 transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-gray-700"
    >
      {label}
    </label>
    {value && (
      <button
        type="button"
        onClick={() => setValue('')}
        className="absolute inset-y-0 right-8 pr-3 flex items-center"
      >
        <AiOutlineClose className="h-5 w-5 text-gray-400 hover:text-gray-600" />
      </button>
    )}
    {icon && (
      <button
        type="button"
        onClick={onIconClick}
        className="absolute inset-y-0 right-0 pr-3 flex items-center"
      >
        {icon}
      </button>
    )}
  </div>
);
