"use client";

import { motion } from "motion/react";

interface AuthButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit";
}

export default function AuthButton({
  children,
  onClick,
  disabled,
  type = "button",
}: AuthButtonProps) {
  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      whileHover={{ scale: disabled ? 1 : 1.03 }}
      whileTap={{ scale: disabled ? 1 : 0.97 }}
      className="w-full rounded-2xl bg-white py-4 font-medium text-black transition disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {children}
    </motion.button>
  );
}