import React, { useState, useEffect } from "react"
import styles from "./index.module.css";
import LandingPage from "./landing.tsx";
import Dashboard from "./dashboard.tsx";
import ResetPasswordBody from './resetpassword.tsx';

const HomePage = (): React.JSX.Element => {
  const storedIsLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  const [isLoggedIn, setIsLoggedIn] = useState(storedIsLoggedIn);

  useEffect(() => {
    localStorage.setItem("isLoggedIn", JSON.stringify(isLoggedIn));
  }, [isLoggedIn]);

  return (
    <div className="justify-center">
      {isLoggedIn ? (
        <Dashboard setIsLoggedIn={setIsLoggedIn} />
      ) : (
        <LandingPage />
      )}
    </div>
  );
    
};

export default HomePage;
