export default function LoginBody()
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