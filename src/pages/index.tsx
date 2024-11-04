import { useState } from "react";
import styles from "./index.module.css";
import { commonExample } from "@/utils/utils.ts";

const HomePage = (): JSX.Element => {
  const urlWithProxy = `api/v1/version`;
  const [data, setData] = useState<RespExampleType | null>(null);

  commonExample();

  async function getDataFromServer(): Promise<void> {
    const res = await fetch(urlWithProxy);
    const data: RespExampleType = await res.json();
    setData(data);
  }

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
    return (
      <div className={styles.wrapper}>
      <h2>Sign Up</h2>
      <form id="register">
          <div className={styles.inputcombo}>
              <input className={styles.inputbox} type="text" name="first_name" placeholder="First Name"/>
          </div>

          <div className={styles.inputcombo}>
              <input className={styles.inputbox} name="last_name" placeholder="Last Name"/>
          </div>

          <div className={styles.inputcombo}>
              <input className={styles.inputbox} name="username" placeholder="Username"/>
          </div>

          <div className={styles.inputcombo}>
              <input className={styles.inputbox} type="password" name="password" placeholder="Password"/>
          </div>
          
          <div className={styles.submitwrap}>
              <button className={styles.submitbox} type="button" id="submit_register">Submit</button>
          </div>
          <div className={styles.errormessage}></div>
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
      <div>
        <img src="/images/nasa-logo.svg" alt="nasa logo" />
        <button className={styles.button} onClick={getDataFromServer}>
          Access server using proxy
        </button>
        <p>data : {data?.version}</p>

      </div>
    )
  }

  return (
    <div className={styles.app}>
      <Test />      
      <Tabs />
      {/* <RegisterBody />
      <LoginBody /> */}
    </div>
  );
    
};

export default HomePage;
