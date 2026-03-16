"use client";

import { Loader2, CheckCircle, AlertCircle } from "lucide-react";

interface FormFeedbackProps {
  loading: boolean;
  success: boolean;
  error: string | null;
  successMessage?: string;
  reset: () => void;
}

export default function FormFeedback({
  loading,
  success,
  error,
  successMessage = "Message sent successfully!",
  reset,
}: FormFeedbackProps) {
  if (loading) {
    return (
      <div className="flex items-center gap-3 mt-4 text-[#E8385D]">
        <Loader2 className="w-5 h-5 animate-spin" />
        <span className="text-sm">Sending...</span>
      </div>
    );
  }

  if (success) {
    return (
      <div className="flex items-center gap-3 mt-4 text-green-400">
        <CheckCircle className="w-5 h-5" />
        <span className="text-sm">{successMessage}</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center gap-3 mt-4 text-red-400">
        <AlertCircle className="w-5 h-5" />
        <span className="text-sm">{error}</span>
        <button
          onClick={reset}
          className="text-sm underline hover:text-red-300 transition-colors ml-2"
        >
          Try Again
        </button>
      </div>
    );
  }

  return null;
}
