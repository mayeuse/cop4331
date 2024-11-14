import React, { useState } from "react"
import styles from "./index.module.css";

const RegisterBody = (): React.JSX.Element =>
{
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleRegisterSubmit = async (event: React.FormEvent) => {
      event.preventDefault();
  
      try {
        const response = await fetch('/api/v1/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: `${firstName} ${lastName}`,
            email: email,
            login: username,
            password: password,
          }),
        });
  
        const data = await response.json();
  
        if (response.ok) {
          setSuccessMessage(`Registration successful! Please return to the login menu.`);
          setError('');
        } 
        else {
          setSuccessMessage('');
          setError(data.error || 'An error occurred during registration.');
        }
      } catch (error) {
        console.error('Registration error:', error);
        setSuccessMessage('');
        setError('An error occurred. Please try again later.');
      }
    };

    return (
      <div className={styles.wrapper}>
      <h2>Sign Up</h2>
      <form id="register" onSubmit={handleRegisterSubmit}>
          <div className={styles.inputcombo}>
              <input className={styles.inputbox} type="text" name="first_name" value={firstName} 
              onChange={(e) => setFirstName(e.target.value)} placeholder="First Name"/>
          </div>

          <div className={styles.inputcombo}>
              <input className={styles.inputbox} type="text" name="last_name" value={lastName} 
              onChange={(e) => setLastName(e.target.value)} placeholder="Last Name"/>
          </div>

          <div className={styles.inputcombo}>
              <input className={styles.inputbox} type="email" name="email" value={email}
              onChange={(e) => setEmail(e.target.value)} placeholder="Email"/>
          </div>

          <div className={styles.inputcombo}>
              <input className={styles.inputbox} type="text" name="username" value={username}
              onChange={(e) => setUsername(e.target.value)} placeholder="Username"/>
          </div>

          <div className={styles.inputcombo}>
              <input className={styles.inputbox} type="password" name="password" value={password}
              onChange={(e) => setPassword(e.target.value)} placeholder="Password"/>
          </div>
          
          <div className="text-center">
              <button className={styles.submitbox} type="submit" id="submit_register">Submit</button>
          </div>

          {successMessage && <span className={styles.success}>{successMessage}</span>}
          {error && <span className={styles.error}>{error}</span>}
      </form>
    </div>
    )
}

export default RegisterBody;