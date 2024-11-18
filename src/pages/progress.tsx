import React, { useState, useEffect } from "react";
import { useAuthCookie } from "@/index.tsx";  // Assuming you have this hook
import { ENDPOINTS } from "@/typings";  // Assuming ENDPOINTS is imported from your typings
import styles from "./index.module.css";

// Define the structure for exercise log and goal
interface ExerciseLog {
  type: string;
  calories: number;
  date: string;
}

interface Goal {
  target: number;
  units: string;
  type: string;
}

const ProgressBody = (): React.JSX.Element => {
  const [exerciseLog, setExerciseLog] = useState<ExerciseLog[]>([]);
  const [goal, setGoal] = useState<Goal | null>(null);
  const [error, setError] = useState<string>("");
  const [cookies] = useAuthCookie(); // Assuming this hook gives you cookies
  const userId = cookies["appley-auth"]; // The user ID from cookies

  const handleUserProgress = async () => {
    if (!userId) {
      setError("User not logged in");
      console.log("User not logged in");
      return;
    }

    try {
      const response = await fetch(ENDPOINTS.Data.RetrieveUserData, {
        method: "POST",  // Send a POST request
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: userId }),  // Send the userId in the body
      });

      // Parse the response as JSON
      const data = await response.json();
      
      if (response.ok) {
        setExerciseLog(data.exerciseLog);
        setGoal(data.goals);
      } else {
        setError(data.error || "Error fetching user progress");
        console.error("Error fetching user progress:", data.error);
      }
    } catch (error) {
      setError("Error fetching user progress");
      console.error("Error fetching user progress:", error);
    }
  };

  // Run the handleUserProgress function when the component mounts
  useEffect(() => {
    handleUserProgress();
  }, []);  // Empty dependency array ensures this runs once after the component mounts

  return (
    <div className={styles.wrapper}>
      <h2>Your Progress</h2>

      {error && <div className="error">{error}</div>}

      {goal && (
        <div>
          <h3>Goal:</h3>
          <p>Target: {goal.target}</p>
          <p>Units: {goal.units}</p>
          <p>Type: {goal.type}</p>
        </div>
      )}

      <h3>Exercise Log:</h3>
      {exerciseLog.length > 0 ? (
        <ul>
          {exerciseLog.map((entry, index) => (
            <li key={index}>
              <p>Type: {entry.type}</p>
              <p>Calories: {entry.calories}</p>
              <p>Date: {entry.date}</p>
            </li>
          ))}
        </ul>
      ) : (
        <div>No exercise data available</div>
      )}
    </div>
  );
};

export default ProgressBody;
