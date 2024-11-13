import React, { useState } from "react"
import styles from "./index.module.css";
import Modal from "./modal.tsx";

interface DashboardProps {
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>; // Accept setter as a prop
}

const Dashboard = ({ setIsLoggedIn }: DashboardProps): React.JSX.Element => 
{
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
        const [content, setContent] = useState(<ProfileBody />);

        function ProfileOn()
        {
        setContent(<ProfileBody />)
        }

        return (
        <div>
            <button className={styles.button} onClick={ProfileOn}>
            Home
            </button>
            
            {content}
        </div>
        )
    }
  
  function ProfileBody()
  {
    return (
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">Welcome to the Dashboard!</h1>
        <p className="text-lg">You are logged in. Enjoy your stay!</p>
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
      <img src="/images/nasa-logo.svg" alt="nasa logo" />
      <Logout />
      <Tabs />
    </div>
  );
}

export default Dashboard;
