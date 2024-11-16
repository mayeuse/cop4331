import React, { useState } from "react"
import styles from "./index.module.css";

const ForgotPassBody = (): React.JSX.Element =>
{
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleForgotPassSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setMessage('');
        setError('');

        try {
        const response = await fetch('/api/v1/forgotPassword', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({email}),
        });

        const data = await response.json();

        if (response.ok && data.message) {
            setMessage(data.message);
            setError('');
        } else {
            setError(data.error || 'Failed to send reset link. Please try again.');
        }
        } catch (err) {
        console.error("Forgot Password Error:", err);
        setError('An error occurred. Please try again later.');
        }
    };

    return (
        <div>
            <h2>Forgot Password</h2>
            <form name="forgotpassword" onSubmit={handleForgotPassSubmit}>
                <div className="w-auto text-center">
                <input
                    className={styles.inputbox} type="email" name="email" value={email}
                    onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email"/>
                </div>

                <div className="text-center">
                    <button className={styles.submitbox} type="submit">Send Reset</button>
                </div>

                {message && <span className={styles.success}>{message}</span>}
                {error && <span className={styles.error}>{error}</span>}
            </form>
        </div>
    );
};

export default ForgotPassBody;