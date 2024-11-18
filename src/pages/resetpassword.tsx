import React, { useState } from "react";
import { useAuthCookie } from "@/index"; // Assuming this is the correct import for your cookie hook

const ResetPasswordBody = (): React.JSX.Element => {
  const [cookies] = useAuthCookie();
  const userId = cookies["appley-auth"]; // Retrieve the user ID from the cookie

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (!newPassword || !confirmPassword) {
      setError("Both fields are required.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (!userId) {
      setError("No user logged in. Please log in and try again.");
      return;
    }

    try {
      const response = await fetch(`/api/v1/passwordReset`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ newPassword, confirmPassword, userId }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Password reset successful!");
      } else {
        setError(data.error || "Failed to reset password.");
      }
    } catch (err) {
      console.error("Error during password reset:", err);
      setError("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div className="reset-password-container">
      {userId ? (
        <form onSubmit={handleSubmit} className="p-4 border rounded shadow-md max-w-md mx-auto mt-8">
          <h2 className="text-center text-2xl mb-4">Reset Password</h2>
          <div className="mb-4">
            <label className="block mb-2 font-semibold">New Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 border rounded"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 font-semibold">Confirm Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 border rounded"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-700">
            Reset Password
          </button>
          {message && <p className="text-green-500 mt-4">{message}</p>}
          {error && <p className="text-red-500 mt-4">{error}</p>}
        </form>
      ) : (
        <p className="text-center text-red-500 mt-8">No user logged in. Please log in and try again.</p>
      )}
    </div>
  );
};

export default ResetPasswordBody;
