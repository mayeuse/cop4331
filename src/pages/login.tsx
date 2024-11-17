import React, { useContext, useState } from "react";
import styles from "./index.module.css";
import ForgotPassBody from "./forgotpassword.tsx";
import { ENDPOINTS, LoginPacket } from "@/typings";
import { useAuthCookie, USER_CONTEXT } from "@/index.tsx";

export default function(): React.JSX.Element {
  const [authCookie] = useAuthCookie()
  
  if (authCookie["appley-auth"]) {
    return <div className={ styles.wrapper }>Already logged in!</div>;
  }
  
  const [ username, setUsername ] = useState("");
  const [ password, setPassword ] = useState("");
  const [ error, setError ] = useState("");
  const [ successMessage, setSuccessMessage ] = useState("");
  const [ isForgotPassword, setIsForgotPassword ] = useState(false);
  
  const handleLoginSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    console.log("Login submit triggered"); // Debugging if the function is called
    
    try {
      const response = await fetch(ENDPOINTS.Forms.Login, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: new LoginPacket(username, password).serialize(),
      });
      
      const data = await response.json();
      console.log("API Response:", data);
      
      if (response.ok && !data.error) {
        setSuccessMessage(`Login successful! Welcome, ${ data.name }`);
        setError("");
        
        useContext(USER_CONTEXT).data = data;
        window.location.href = "dashboard"; // navigate to dashboard
      } else {
        console.error("API Error Response:", data);
        setSuccessMessage("");
        setError(data.error || "Invalid credentials. Please try again.");
      }
    } catch (error) {
      console.error("Fetch Error:", error); // Log any fetch errors
      setSuccessMessage("");
      setError("An error occurred. Please try again later.");
    }
  };
  
  return (
    <div className={ styles.wrapper }>
      { isForgotPassword ? (
        <div>
          <ForgotPassBody />
          <button
            className="text-blue-500 underline mt-4"
            onClick={ () => setIsForgotPassword(false) }
          >
            Back to Login
          </button>
        </div>
      ) : (
        <div>
          <h2>Login</h2>
          <form name="login" onSubmit={ handleLoginSubmit }>
            <div className="w-auto text-center">
              <input className={ styles.inputbox } type="text" name="username" value={ username }
                     onChange={ (e) => setUsername(e.target.value) } placeholder="Username" />
            </div>
            
            <div className="w-auto text-center">
              <input className={ styles.inputbox } type="password" name="password" value={ password }
                     onChange={ (e) => setPassword(e.target.value) } placeholder="Password" />
            </div>
            
            <div className="text-center">
              <button className={ styles.submitbox } type="submit">Submit</button>
            </div>
            
            { successMessage && <span className={ styles.success }>{ successMessage }</span> }
            { error && <span className={ styles.error }>{ error }</span> }
          </form>
          <button className="text-blue-500 underline mt-4" onClick={ () => setIsForgotPassword(true) }>
            Forgot Password?
          </button>
        </div>
      ) }
    </div>
  );
}