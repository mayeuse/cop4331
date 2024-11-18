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

interface StepGoal {
  target: number;
  units: string;
  interval: string;
}

interface CalorieGoal {
  target: number;
  units: string;
  interval: string;
}

interface Goal {
  stepcount?: StepGoal;
  calorie?: CalorieGoal;
}

const ProgressBody = (): React.JSX.Element => {
  const [exerciseLog, setExerciseLog] = useState<ExerciseLog[]>([]);
  const [goal, setGoal] = useState<Goal | null>(null);
  const [error, setError] = useState<string>("");
  const [cookies] = useAuthCookie(); // Assuming this hook gives you cookies
  const userId = cookies["appley-auth"]; // The user ID from cookies

  // console.log("Cookies:", cookies);  // Add this line to check all cookies
  // console.log("User ID:", userId);  // Check if the userId is being set correctly 

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
        console.log(data); //Shows data for user
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

  //console.log('Goal:', goal);  // Add this to check if goal is being set correctly

  return (
    <div className={styles.wrapper}>
      <h2 className="text-center text-4xl text-red-700">Your Progress</h2>

      {error && <div className="text-center text-red-500 mt-4">{error}</div>}

      {goal ? (
        <div className="mx-auto w-3/4 mt-6 p-4 border-2 border-green-500 rounded-lg shadow-md bg-amber-100">
          <h3 className="text-3xl text-center text-green-700">Goal</h3>
          {goal.stepcount ? (
            <>
              <p className="text-center text-xl mt-2">
                Target Steps: <span className="font-semibold">{goal.stepcount.target} {goal.stepcount.units}</span>
              </p>
              <p className="text-center text-xl">
                Interval: <span className="font-semibold">{goal.stepcount.interval}</span>
              </p>
            </>
          ) : goal.calorie ? (
            <>
              <p className="text-center text-xl mt-2">
                Target Calories: <span className="font-semibold">{goal.calorie.target} {goal.calorie.units}</span>
              </p>
              <p className="text-center text-xl">
                Interval: <span className="font-semibold">{goal.calorie.interval}</span>
              </p>
            </>
          ) : (
            <p className="text-center text-xl mt-2 text-gray-500">No specific goal set</p>
          )}
        </div>
      ) : (
        <div className="text-center text-xl mt-4 text-gray-500">No goal data available</div>
      )}


      <h3 className="text-3xl text-center text-red-700 mt-6">Exercise Log</h3>
      {exerciseLog.length > 0 ? (
        <ul className="space-y-4 mt-4">
          {exerciseLog.map((entry, index) => (
            <li key={index} className="mx-auto w-3/4 bg-amber-100 p-4 rounded-lg shadow-lg border-2 border-green-500">
              <p className="text-xl font-semibold">Type: {entry.type}</p>
              <p className="text-lg">Calories: {entry.calories}</p>
              <p className="text-lg">Date: {entry.date}</p>
            </li>
          ))}
        </ul>
      ) : (
        <div className="text-center text-xl mt-4 text-gray-500">No exercise data available</div>
      )}
    </div>
  );
};

export default ProgressBody;
