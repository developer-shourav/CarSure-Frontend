import React from "react";
import { cn } from "@/lib/utils"; // optional utility function for merging classes

type CustomModalProps = {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  className?: string;
};

export default function CustomModal({
  open,
  onClose,
  title,
  children,
  className,
}: CustomModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#27262618]">
      <div
        className={cn(
          "w-[90%] max-w-[480px] bg-white  text-black  rounded-xl shadow-md p-6",
          className
        )}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-red-500 transition"
          >
            ✕
          </button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
}
