import React, { useState } from "react"
import styles from "./index.module.css";
import Modal from "./modal.tsx";

interface DashboardProps {
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>; // Accept setter as a prop
}

const Dashboard = ({ setIsLoggedIn }: DashboardProps): React.JSX.Element => 
{
  const [content, setContent] = useState(<DashboardBody />);
  const [isModalVisible, setModalVisible] = useState(false);

  function Logout()
  {
    return(
      <div>
        <button className={styles.button} onClick={handleLogout}>Logout</button>
        {isModalVisible && (<Modal message="Are you sure you want to log out?" 
        onConfirm={handleConfirmLogout} onCancel={handleCancelLogout} />)}
      </div>
      )
  }

  function Tabs()
    {
        function DashboardOn()
        {
        setContent(<DashboardBody />)
        }

        function ProgressOn()
        {
        setContent(<ProgressBody />)
        }

        function GoalOn()
        {
        setContent(<GoalBody />)
        }

        function DocumentOn()
        {
        setContent(<DocumentBody />)
        }

        return (
        <div>
            <button className={styles.button} onClick={DashboardOn}>
            Dashboard
            </button>
            <button className={styles.button} onClick={ProgressOn}>
            Progress
            </button>
            <button className={styles.button} onClick={GoalOn}>
            Weekly Goals
            </button>
            <button className={styles.button} onClick={DocumentOn}>
            Log Exercise
            </button>
        </div>
        )
    }

  function DashboardBody()
  {
    return (
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">Welcome to the Dashboard!</h1>
        <p className="text-lg">You are logged in. Time to break that body down!!!</p>
        <div className="mx-auto my-8 justify-center size-fit">
          <img src="/images/Appley.png" alt="Appley" className="mx-auto my-8 w-1/2 h-1/2"/>
        </div>
        <h1 className="text-lg">你的肌肉是我的</h1>
      </div>
    );
  }

  function ProgressBody() //maybe import to own file later
  {
    return (
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">Welcome to your Progress!</h1>
        <p className="text-lg">Progress Bar goes here?</p>
        <div className="mx-auto my-8 justify-center size-fit">
          <img src="/images/Appley.png" alt="Appley" className="mx-auto my-8 w-1/2 h-1/2"/>
        </div>
        <h1 className="text-lg">Are you doing good? Hmmm?</h1>
        <h1 className="text-lg">ARE YOU?!?!?!?!?!?</h1>
      </div>
    );
  }

  function GoalBody() //import to own file later
  {
    return (
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">Insert your Weekly Goal here!</h1>
        <p className="text-lg">Goal Form goes here?</p>
        <div className="mx-auto my-8 justify-center size-fit">
          <img src="/images/Appley.png" alt="Appley" className="mx-auto my-8 w-1/2 h-1/2"/>
        </div>
        <h1 className="text-lg">Be ambitious, but reasonable.</h1>
      </div>
    );
  }

  function DocumentBody() //import to own file later
  {
    return (
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">Document your Exercise here!</h1>
        <p className="text-lg">Exercise Log goes here?</p>
        <div className="mx-auto my-8 justify-center size-fit">
          <img src="/images/Appley.png" alt="Appley" className="mx-auto my-8 w-1/2 h-1/2"/>
        </div>
        <h1 className="text-lg">Be Honest, I know when you lie.</h1>
      </div>
    );
  }

  const handleLogout = () => {
    setModalVisible(true); // Show the modal when the user clicks logout
  };

  const handleConfirmLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("isLoggedIn");
    setModalVisible(false); // Close the modal after logout
  };

  const handleCancelLogout = () => {
    setModalVisible(false); // Close the modal if user cancels
  };

  return (
    <div className="text-center">
      <Logout />
      <Tabs />

      {content}
    </div>
  );
}

export default Dashboard;
