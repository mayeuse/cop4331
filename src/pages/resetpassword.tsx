import React, { useState } from "react";
import styles from "./index.module.css"; // Import your styles
import Modal from "./modal.tsx";
import { UserContext, useAuthCookie } from "@/client_ts/Contexts.ts";
import { useNavigate } from 'react-router-dom';

const ResetPasswordBody = (): React.JSX.Element => {
  const {getCookie} = useAuthCookie();
  const userId = getCookie(); // Retrieve the user ID from the cookie

  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [ isModalVisible, setModalVisible ] = useState(false);
  const userDataContext = useContext(UserContext);
  const [cookies, setCookie] = useAuthCookie();  // Access the cookies
  const navigate = useNavigate();  // To handle navigation after logout

  // Extract the "user" query parameter from the URL
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const user = searchParams.get("user");
    if (user) {
      setUserEmail(user);
    } else {
      setError("Invalid reset link or missing user information.");
    }
  }, []);

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

    if (!userEmail) {
      setError("No user identified. Please ensure you are using a valid reset link.");
      return;
    }

    try {
      const response = await fetch(`/api/v1/passwordReset`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ newPassword, confirmPassword, userEmail }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Password reset successful! Please return home.");
      } else {
        setError(data.error || "Failed to reset password.");
      }
    } catch (err) {
      console.error("Error during password reset:", err);
      setError("An unexpected error occurred. Please try again.");
    }
  };

  function Backout() {
    return (
      <div className="relative">
        <button className={ `absolute top-4 right-4 ${ styles.button }` } onClick={ handleBackout }>Logout</button>
        { isModalVisible && (<Modal message="Are you sure you want to log out?"
                                    onConfirm={ handleConfirmBackout } onCancel={ handleCancelBackout } />) }
      </div>
    );
  }
  
  const handleBackout = () => {
    setModalVisible(true); // Show the modal when the user clicks logout
  };
  
  const handleConfirmBackout = () => {
    userDataContext.setData(null); // remove user data
    setCookie('appley-auth', '')
    setModalVisible(false); // Close the modal after logout
    navigate('/');  // This will navigate to the landing page ("/")
  };
  
  const handleCancelBackout = () => {
    setModalVisible(false); // Close the modal if user cancels
  };

  return (
    <div className="text-center">
      <Backout />
      <div className="p-8">
        <div className={`${ styles.wrapper }`}>
          <h2 className="text-center text-4xl text-red-700">Reset Password</h2>
          {userEmail ? (
            <form onSubmit={handleSubmit} className="mx-auto w-3/4 mt-6">
              <div>
                <label className="block mb-2 font-semibold text-lg">New Password</label>
                <input type="password" className="w-full px-4 py-2 border rounded" placeholder="Enter new password" value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)} required/>
              </div>
              <div className="mt-4">
                <label className="block mb-2 font-semibold text-lg">Confirm Password</label>
                <input type="password" className="w-full px-4 py-2 border rounded" placeholder="Confirm new password" value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)} required/>
              </div>
              <div className="text-center">
                <button type="submit" className={`${ styles.submitbox } w-3/4 py-2 rounded mt-6`}>
                  Reset Password
                </button>
              </div>
              {message && <p className="text-green-500 mt-4 text-center">{message}</p>}
              {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
            </form>
          ) : (
            <div className="mt-6 text-center">
              <p className="text-red-500">{error}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordBody;
