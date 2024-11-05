export default function RegisterBody()
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