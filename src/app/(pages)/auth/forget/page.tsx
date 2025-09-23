"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation"; 
import { apiServices } from "@/services/api";
import {
  ForgetPasswordForm,
  VerifyCodeForm,
  ResetPasswordForm,
  ForgetPasswordResponse,
  VerifyCodeResponse,
  ResetPasswordResponse,
} from "@/interfaces/index";

export default function ForgetPassword() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const router = useRouter(); 

  const emailForm = useForm<ForgetPasswordForm>();
  const codeForm = useForm<VerifyCodeForm>();
  const passwordForm = useForm<ResetPasswordForm>();

  async function handleForget(values: ForgetPasswordForm) {
    setLoading(true);
    setMessage(null);

    const res: ForgetPasswordResponse = await apiServices.forgetPassword(values.email, "");
    setEmail(values.email);

    if (res?.statusMsg === "success") {
      setStep(2);
      setMessage("Check your email for reset code.");
    } else {
      setMessage(res?.message || "Error sending reset email.");
    }

    setLoading(false);
  }

  async function handleCode(values: VerifyCodeForm) {
    setLoading(true);
    setMessage(null);

    const res: VerifyCodeResponse = await apiServices.verifyResetPassword(values.resetCode);

    if (res?.status === "Success") {
      setStep(3);
      setMessage("Code verified. Enter new password.");
    } else {
      setMessage("Invalid code.");
    }

    setLoading(false);
  }

  async function handleNewPassword(values: ResetPasswordForm) {
    setLoading(true);
    setMessage(null);

    const res: ResetPasswordResponse = await apiServices.resetPassword(email, values.newPassword);

    if (res?.token) {
      setMessage("Password reset successfully. Redirecting...");
      emailForm.reset();
      codeForm.reset();
      passwordForm.reset();

      setTimeout(() => {
        router.push("/products");
      }, 1500);
    } else {
      setMessage(res?.message || "Error resetting password.");
    }

    setLoading(false);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg mb-10">
        <h1 className="text-2xl font-bold mb-6 text-center text-black">
          Forget Password
        </h1>

        {message && (
          <p className="mb-4 text-center text-sm font-medium text-gray-700">
            {message}
          </p>
        )}

        {step === 1 && (
          <form
            onSubmit={emailForm.handleSubmit(handleForget)}
            className="space-y-4"
          >
            <input
              type="email"
              placeholder="Enter your email"
              {...emailForm.register("email", { required: true })}
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-black text-white py-3 rounded font-semibold hover:bg-gray-900 transition"
            >
              {loading ? "Sending..." : "Send Reset Email"}
            </button>
          </form>
        )}

        {step === 2 && (
          <form
            onSubmit={codeForm.handleSubmit(handleCode)}
            className="space-y-4"
          >
            <input
              type="text"
              placeholder="Enter reset code"
              {...codeForm.register("resetCode", { required: true })}
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-black text-white py-3 rounded font-semibold hover:bg-gray-900 transition"
            >
              {loading ? "Verifying..." : "Verify Code"}
            </button>
          </form>
        )}

        {step === 3 && (
          <form
            onSubmit={passwordForm.handleSubmit(handleNewPassword)}
            className="space-y-4"
          >
            <input
              type="password"
              placeholder="Enter new password"
              {...passwordForm.register("newPassword", { required: true })}
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-black text-white py-3 rounded font-semibold hover:bg-gray-900 transition"
            >
              {loading ? "Resetting..." : "Reset Password"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
