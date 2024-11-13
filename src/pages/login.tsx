import React, { useState } from "react"
import styles from "./index.module.css";

interface LoginBodyProps {
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>; // Accept setter as a prop
}

function LoginBody({ setIsLoggedIn }: LoginBodyProps): React.JSX.Element
{
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleLoginSubmit = async (event: React.FormEvent) => {
      event.preventDefault();
      console.log('Login submit triggered'); // Debugging if the function is called
    
      try {
        const response = await fetch('/api/v1/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            login: username,
            password: password,
          }),
        });
    
        const data = await response.json();
        console.log("API Response:", data); // Debugging response
    
        if (response.ok && !data.error) {
          setIsLoggedIn(true); 
          setSuccessMessage(`Login successful! Welcome, ${data.name}`);
          setError('');
        } else {
          console.error("API Error Response:", data);
          setSuccessMessage('');
          setError(data.error || 'Invalid credentials. Please try again.');
        }
      } catch (error) {
        console.error("Fetch Error:", error); // Log any fetch errors
        setSuccessMessage('');
        setError('An error occurred. Please try again later.');
      }
    };    

    return (
      <div className={styles.wrapper}>
      <h2>Login</h2>
      <form name="login" onSubmit={handleLoginSubmit}>
          <div className={styles.inputcombo}>
              <input className={styles.inputbox} type="text" name="username"  value={username}
              onChange={(e) => setUsername(e.target.value)} placeholder="Username"/>
          </div>

          <div className={styles.inputcombo}>
              <input className={styles.inputbox} type="password" name="password" value={password}
              onChange={(e) => setPassword(e.target.value)} placeholder="Password"/>
          </div>
          
          <div className={styles.submitwrap}>
              <button className={styles.submitbox} type="submit">Submit</button>
          </div>

          {successMessage && <span className={styles.success}>{successMessage}</span>}
          {error && <span className={styles.error}>{error}</span>}
      </form>
    </div>
    )
}

export default LoginBody;