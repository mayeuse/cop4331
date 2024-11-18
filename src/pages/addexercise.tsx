import React, {useContext, useState} from "react";
import styles from "./index.module.css";
import {ENDPOINTS, AddExercisePacket} from "@/typings";
import { useAuthCookie, UserContext } from '@/client_ts/Contexts.ts';

const ExerciseBody = (): React.JSX.Element => 
{
    const [calories, setCalories] = useState<number | ''>('');
    const [date, setDate] = useState('');
    const [type, setType] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const {getCookie} = useAuthCookie();
    const user = getCookie()

    const formatDate = (dateString: string): string => {
        const [year, month, day] = dateString.split('-');
        return `${month}/${day}/${year}`;
    };

    const handleAddExerciseSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        try {
        if (!user) {
            throw new Error("User is null.");
        }
        const payload = {
            userId: user,
            calories: Number(calories),
            date: formatDate(date),
            type,
        };

        const response = await fetch(ENDPOINTS.Forms.AddExercise, {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });

        if (response.ok) {
            setSuccessMessage("Exercise added successfully!");
            setError("");
            setCalories('');
            setDate('');
            setType('');
        } else {
            const data = await response.json();
            setError(data.error || "Failed to add exercise.");
            setSuccessMessage("");
        }
        } catch (error) {
        console.error("Error adding exercise:", error);
        setError("An unexpected error occurred.");
        setSuccessMessage("");
        }
    };

    return (
        <div className={styles.wrapper}>
        <h2>Add Exercise</h2>
        <form id="add-exercise" onSubmit={handleAddExerciseSubmit}>
            <div className="w-3/4 text-center mx-auto">
                <input className={styles.inputbox} type="number" name="calories" value={calories}
                onChange={(e) => setCalories(e.target.valueAsNumber || '')} placeholder="Calories Burned" min="0" required/>
            </div>

            <div className="w-3/4 text-center mx-auto">
                <input className={styles.inputbox} type="date" name="date" value={date}
                onChange={(e) => setDate(e.target.value)} required/>
            </div>

            <div className="w-3/4 text-center mx-auto">
                <input className={styles.inputbox} type="text" name="type" value={type}
                onChange={(e) => setType(e.target.value)} placeholder="Exercise Type: e.g., Running, Swimming" required/>
            </div>

            <div className="text-center">
                <button className={`${ styles.submitbox } w-1/4 py-1 rounded min-h-fit`} type="submit">Submit</button>
            </div>

            {successMessage && <span className={styles.success}>{successMessage}</span>}
            {error && <span className={styles.error}>{error}</span>}
        </form>
        </div>
    );
};

export default ExerciseBody;
