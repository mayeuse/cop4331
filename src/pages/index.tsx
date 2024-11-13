import React, { useState } from "react"
import styles from "./index.module.css";
import LandingPage from "./landing.tsx";
import Dashboard from "./dashboard.tsx";

const HomePage = (): React.JSX.Element => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State managed by App

  return (
    <div>
      {isLoggedIn ? (
        <Dashboard /> // Render Dashboard if logged in
      ) : (
        <LandingPage setIsLoggedIn={setIsLoggedIn} /> // Pass setter to LandingPage
      )}
    </div>
  );
    
};

export default HomePage;
