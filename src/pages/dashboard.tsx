import React, { useState } from "react"
import styles from "./index.module.css";

function Dashboard(): React.JSX.Element {
  return (
    <div className="text-center">
      <h1 className="text-3xl font-bold mb-4">Welcome to the Dashboard!</h1>
      <p className="text-lg">You are logged in. Enjoy your stay!</p>
    </div>
  );
}

export default Dashboard;
