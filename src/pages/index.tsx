import { useState } from "react";
import styles from "./index.module.css";
import { commonExample } from "@/utils/utils.ts";

const HomePage = (): JSX.Element => {
  // const urlWithProxy = `api/v1/version`;
  // const [data, setData] = useState<RespExampleType | null>(null);

  commonExample();

  // async function getDataFromServer(): Promise<void> {
  //   const res = await fetch(urlWithProxy);
  //   const data: RespExampleType = await res.json();
  //   setData(data);
  // }

  function Tabs()
  {
    const [content, setContent] = useState(<LoginBody />);

    function RegisterOn()
    {
      setContent(<RegisterBody />)
    }

    function LoginOn()
    {
      setContent(<LoginBody />)
    }

    return (
      <div>
        <button className={styles.button} onClick={RegisterOn}>
          Register
        </button>
        <button className={styles.button} onClick={LoginOn}>
          Login
        </button>

        {content}
      </div>
    )
  }

  function RegisterBody()
  {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [isRegistered, setIsRegistered] = useState(false);

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
          setIsRegistered(true);
          setSuccessMessage(`Registration successful! Your ID: ${data.id}`);
          setError(''); // Clear any previous error messages
        } else {
          setSuccessMessage(''); // Clear any previous success messages
          setError(data.error || 'An error occurred during registration.');
        }
      } catch (error) {
        console.error('Registration error:', error);
        setSuccessMessage(''); // Clear any previous success messages
        setError('An error occurred. Please try again later.');
      }
    };

    if (isRegistered) {
      return <Test />;
    }

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
          
          <div className={styles.submitwrap}>
              <button className={styles.submitbox} type="submit" id="submit_register">Submit</button>
          </div>

          {/* Display success or error message */}
          {successMessage && <span className={styles.success}>{successMessage}</span>}
          {error && <span className={styles.error}>{error}</span>}
      </form>
    </div>
    )
  }

  function LoginBody()
  {
    return (
      <div className={styles.wrapper}>
      <h2>Login</h2>
      <form name="login">
          <div className={styles.inputcombo}>
              <input className={styles.inputbox} type="text" id="loginName" name="username" placeholder="Username"/>
          </div>

          <div className={styles.inputcombo}>
              <input className={styles.inputbox} type="password" id="loginPassword" name="password" placeholder="Password"/>
          </div>
          
          <div className={styles.submitwrap}>
              <button className={styles.submitbox} type="button" id="loginButton">Submit</button>
          </div>

          <span id="loginResult"></span>
      </form>
    </div>
    )
  }

  function Test()
  {
    return(
      <div className={styles.wrapper}>
        <h1 className="text-3xl font-bold mb-4">Welcome to the Home Page!</h1>
        <p className="text-lg mb-4">You are successfully logged in or registered.</p>
      </div>
    )
  }

  return (
    <div className={styles.app}>
      <img src="/images/nasa-logo.svg" alt="nasa logo" />
      <Tabs />
    </div>
  );
    
};

export default HomePage;
