import React, { useState } from "react"
import styles from "./index.module.css";
import { ENDPOINTS, RegisterPacket } from "@/typings";

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
        const response = await fetch(ENDPOINTS.Forms.Register, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: new RegisterPacket(`${firstName} ${lastName}`, email, username, password).serialize(),
        });
  
        const data = await response.json();
  
        if (response.ok) {
          setSuccessMessage(`Please check your email for verification.`);
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
          <div className="w-auto text-center">
              <input className={styles.inputbox} type="text" name="first_name" value={firstName} 
              onChange={(e) => setFirstName(e.target.value)} placeholder="First Name" required/>
          </div>

          <div className="w-auto text-center">
              <input className={styles.inputbox} type="text" name="last_name" value={lastName} 
              onChange={(e) => setLastName(e.target.value)} placeholder="Last Name" required/>
          </div>

          <div className="w-auto text-center">
              <input className={styles.inputbox} type="email" name="email" value={email}
              onChange={(e) => setEmail(e.target.value)} placeholder="Email" required/>
          </div>

          <div className="w-auto text-center">
              <input className={styles.inputbox} type="text" name="username" value={username}
              onChange={(e) => setUsername(e.target.value)} placeholder="Username" required/>
          </div>

          <div className="w-auto text-center">
              <input className={styles.inputbox} type="password" name="password" value={password}
              onChange={(e) => setPassword(e.target.value)} placeholder="Password" required/>
          </div>
          
          <div className="text-center">
              <button className={`${ styles.submitbox } w-1/4 py-1 rounded min-h-fit`} type="submit" id="submit_register">Submit</button>
          </div>

          {successMessage && <span className={styles.success}>{successMessage}</span>}
          {error && <span className={styles.error}>{error}</span>}
      </form>
    </div>
    )
}

export default RegisterBody;