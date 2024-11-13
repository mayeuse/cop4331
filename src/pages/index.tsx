import React, { useState } from "react"
import styles from "./index.module.css";

const HomePage = (): React.JSX.Element => {
  function Tabs()
  {
    const [content, setContent] = useState(<LandingBody />);

    function LandingOn()
    {
      setContent(<LandingBody />)
    }
    
    function RegisterOn()
    {
      setContent(<RegisterBody />)
    }

    function LoginOn()
    {
      setContent(<LoginBody />)
    }

    function TeamOn()
    {
      setContent(<Team />)
    }

    return (
      <div>
        <button className={styles.button} onClick={LandingOn}>
          Home
        </button>
        <button className={styles.button} onClick={RegisterOn}>
          Register
        </button>
        <button className={styles.button} onClick={LoginOn}>
          Login
        </button>
        <button className={styles.button} onClick={TeamOn}>
          Our Team
        </button>

        {content}
      </div>
    )
  }

  function LandingBody()
  {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <h1 className="bg-blue-500 text-white">Hello Please Work</h1>
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
          // setIsRegistered(true);
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
          
          <div className={styles.submitwrap}>
              <button className={styles.submitbox} type="submit" id="submit_register">Submit</button>
          </div>

          {successMessage && <span className={styles.success}>{successMessage}</span>}
          {error && <span className={styles.error}>{error}</span>}
      </form>
    </div>
    )
  }

  function LoginBody()
  {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLoginSubmit = async (event: React.FormEvent) => {
      event.preventDefault();
  
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
  
        if (response.ok && !data.error) {
          setIsLoggedIn(true); 
          setSuccessMessage(`Login successful! Welcome, ${data.name}`);
          setError('');
        } 
        else {
          setSuccessMessage('');
          setError(data.error || 'Invalid credentials. Please try again.');
        }
      } catch (error) {
        console.error('Login error:', error);
        setSuccessMessage('');
        setError('An error occurred. Please try again later.');
      }
    };
  
    if (isLoggedIn) {
      return (
        <div className="text-center">
          <Test />
        </div>
      );
    }

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

  function Test()
  {
    return(
      <div className={styles.wrapper}>
        <h1 className="text-3xl font-bold mb-4">Welcome to the Home Page!</h1>
        <p className="text-lg mb-4">You are successfully logged in or registered.</p>
      </div>
    )
  }
  
  function Team() {
    const people = [
      {
        name: 'Billy Bob Joe',
        role: 'Person',
        imageUrl:
          'https://creatorset.com/cdn/shop/files/preview_images/Green_Screen_theia_elmo_staring_meme_1_530x@2x.png?v=1711572280',
      },
    ]

    return (
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto grid max-w-7xl gap-20 px-6 lg:px-8 xl:grid-cols-3">
          <div className="max-w-xl">
            <h2 className="text-pretty text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl">
              Meet our leadership
            </h2>
            <p className="mt-6 text-lg/8 text-gray-600">
              We’re a dynamic group of individuals who are passionate about what we do and dedicated to delivering the
              best results for our clients.
            </p>
          </div>
          <ul role="list" className="grid gap-x-8 gap-y-12 sm:grid-cols-2 sm:gap-y-16 xl:col-span-2">
            {people.map((person) => (
              <li key={person.name}>
                <div className="flex items-center gap-x-6">
                  <img alt="" src={person.imageUrl} className="h-16 w-16 rounded-full" />
                  <div>
                    <h3 className="text-base/7 font-semibold tracking-tight text-gray-900">{person.name}</h3>
                    <p className="text-sm/6 font-semibold text-indigo-600">{person.role}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  }
  

  return (
    <div className={"text-center"}>
      <img src="/images/nasa-logo.svg" alt="nasa logo" />
      <Tabs />
    </div>
  );
    
};

export default HomePage;
