import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";

const ResetPasswordBody = () => {
  const [searchParams] = useSearchParams();
  const userEmail = searchParams.get("user");

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const response = await fetch(`/api/v1/passwordReset`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ newPassword, confirmPassword }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Password reset successful!");
      } else {
        setError(data.error || "Failed to reset password.");
      }
    } catch (err) {
      console.error(err);
      setError("An unexpected error occurred.");
    }
  };

  return (
    <div>
      {userEmail ? (
        <form onSubmit={handleSubmit}>
          <h2>Reset Password for {userEmail}</h2>
          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <button type="submit">Reset Password</button>
          {message && <p>{message}</p>}
          {error && <p>{error}</p>}
        </form>
      ) : (
        <p>Invalid or missing reset link.</p>
      )}
    </div>
  );
};

export default ResetPasswordBody;
