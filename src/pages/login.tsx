import React, { useContext, useState } from "react";
import styles from "./index.module.css";
import ForgotPassBody from "./forgotpassword.tsx";
import { ENDPOINTS, LoginPacket } from "@/typings";
import { AuthCookie, IUserContext, useAuthCookie, UserContext, UserDataContext } from '@/client_ts/Contexts.ts';
import { ActionFunctionArgs, redirect, useActionData } from 'react-router';
import { Form, json } from 'react-router-dom';


export default function(): React.JSX.Element {
  const [ username, setUsername ] = useState("");
  const [ password, setPassword ] = useState("");
  const [ isForgotPassword, setIsForgotPassword ] = useState(false);
  
  const actionData: {error: string} = useActionData() as {error: string}
  
  return (
    <div className={ styles.wrapper }>
      { isForgotPassword ? (
        <div>
          <ForgotPassBody />
          <button
            className="text-blue-500 underline mt-1"
            onClick={ () => setIsForgotPassword(false) }
          >
            Back to Login
          </button>
        </div>
      ) : (
        <div>
          <h2>Login</h2>
          <Form name="login" method="POST">
            <div className="w-auto text-center">
              <input className={ styles.inputbox } type="text" name="username" value={ username }
                     onChange={ (e) => setUsername(e.target.value) } placeholder="Username" required/>
            </div>
            
            <div className="w-auto text-center">
              <input className={ styles.inputbox } type="password" name="password" value={ password }
                     onChange={ (e) => setPassword(e.target.value) } placeholder="Password" required/>
            </div>
            
            <div className="text-center">
              <button className={`${ styles.submitbox } w-1/4 py-1 rounded min-h-fit`} type="submit">Submit</button>
            </div>
            
            { actionData?.error && <span className={ styles.error }>{ actionData.error }</span> }
          </Form>
          <button className="text-blue-500 underline mt-1" onClick={ () => setIsForgotPassword(true) }>
            Forgot Password?
          </button>
        </div>
      ) }
    </div>
  );
}

export const loginAction = (userDataContext: IUserContext, cookieCtx: AuthCookie) => async ({ request }: ActionFunctionArgs) => {  
  const data = await request.formData();
  
  try {
    const response = await fetch(ENDPOINTS.Forms.Login, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: new LoginPacket(data.get("username") as string, data.get("password") as string).serialize(),
    });
    
    const ctx: UserDataContext = await response.json();
    console.log("API Response:", ctx);
    
    if (response.ok && !ctx.error) {
      if (!ctx._id)
        console.log("User ID is not in received user data!")
      
      userDataContext.setData(ctx);
      console.log("set user data to " + JSON.stringify(ctx))
      cookieCtx.setCookie(ctx._id!);
      
      return redirect('/dashboard');
    } else {
      console.error("API Error Response:", ctx);
      return json({error: ctx.error || "Invalid credentials. Please try again."})
    }
  } catch (error) {
    console.error("Fetch Error:", error);
    return json({error: "An error occurred. Please try again later."})
  }
};