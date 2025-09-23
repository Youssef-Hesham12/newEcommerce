"use client";
import { getSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { apiServices } from "@/services/api";
import { Session } from "next-auth";


export default function ProfilePage() {
  const [showPassword, setShowPassword] = useState(false);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(false);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [rePassword, setRePassword] = useState("");

  async function getName() {
    const sess = await getSession();
    setSession(sess);
  }

  async function handleChangePassword(e: React.FormEvent) {
    e.preventDefault();

    if (!currentPassword || !newPassword || !rePassword) {
      alert("Please fill all fields!");
      return;
    }

    if (newPassword !== rePassword) {
      alert("New passwords do not match!");
      return;
    }

    try {
      setLoading(true);

      const response = await apiServices.changePassword(
        currentPassword,
        newPassword,
        rePassword
      );

      if (response?.message === "success") {
        alert("Password changed successfully!");
      
        setCurrentPassword("");
        setNewPassword("");
        setRePassword("");
        setShowPassword(false);
      } else {
        alert(response?.message || "Failed to change password");
      }
    } catch (error) {
      console.error("Error changing password:", error);
      alert("Something went wrong!");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getName();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-black p-4">
      <div className="w-full max-w-sm bg-white rounded-xl shadow p-6 space-y-4">
        <h1 className="text-lg font-bold text-black">Profile</h1>

        <div className="space-y-2">
          <div className="px-3 py-2 border rounded-lg text-black">
            <p className="text-sm text-gray-500">Name</p>
            <p className="font-medium">{session?.user?.name}</p>
          </div>
          <div className="px-3 py-2 border rounded-lg text-black">
            <p className="text-sm text-gray-500">Email</p>
            <p className="font-medium">{session?.user?.email}</p>
          </div>
        </div>

        <button
          onClick={() => setShowPassword(!showPassword)}
          className="w-full py-2 bg-black text-white rounded-lg"
        >
          {showPassword ? "Close" : "Change Password"}
        </button>

        {showPassword && (
          <form onSubmit={handleChangePassword} className="space-y-3">
            <input
              type="password"
              placeholder="Current Password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg text-black"
              required
            />
            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg text-black"
              required
            />
            <input
              type="password"
              placeholder="Confirm New Password"
              value={rePassword}
              onChange={(e) => setRePassword(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg text-black"
              required
            />
            <button
              type="submit"
              className="w-full py-2 bg-black text-white rounded-lg disabled:opacity-50"
              disabled={loading}
            >
              {loading ? "Changing..." : "Change Password"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
