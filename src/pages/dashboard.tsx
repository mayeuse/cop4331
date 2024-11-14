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
      <div className="relative">
        <button className={`absolute top-4 right-4 ${styles.button}`} onClick={handleLogout}>Logout</button>
        {isModalVisible && (<Modal message="Are you sure you want to log out?" 
        onConfirm={handleConfirmLogout} onCancel={handleCancelLogout} />)}
      </div>
      )
  }

  function Tabs()
    {
        const [activeTab, setActiveTab] = useState("dashboard");

        const handleTabChange = (tab: string) => {
          setActiveTab(tab);
        };

        return (
          <div className="min-h-screen flex flex-col items-center">
          <div className="mt-3">
              <div className="flex border-b border-gray-300">
              <button
                  className={`py-3 px-8 ${
                  activeTab === "dashboard"
                      ? "border-b-2 border-blue-500 text-blue-500 font-bold"
                      : "text-gray-500 hover:text-blue-500"
                  }`}
                  onClick={() => handleTabChange("dashboard")}
              >
                  Dashboard
              </button>
              <button
                  className={`py-3 px-8 ${
                  activeTab === "progress"
                      ? "border-b-2 border-blue-500 text-blue-500 font-bold"
                      : "text-gray-500 hover:text-blue-500"
                  }`}
                  onClick={() => handleTabChange("progress")}
              >
                  Progress
              </button>
              <button
                  className={`py-3 px-8 ${
                  activeTab === "goal"
                      ? "border-b-2 border-blue-500 text-blue-500 font-bold"
                      : "text-gray-500 hover:text-blue-500"
                  }`}
                  onClick={() => handleTabChange("goal")}
              >
                  Weekly Goal
              </button>
              <button
                  className={`py-3 px-8 ${
                  activeTab === "document"
                      ? "border-b-2 border-blue-500 text-blue-500 font-bold"
                      : "text-gray-500 hover:text-blue-500"
                  }`}
                  onClick={() => handleTabChange("document")}
              >
                  Log Exercise
              </button>
              </div>
          </div>

          {/* Tab Content */}
          <div className="mt-8 max-w-3/4 w-full px-4">
              {activeTab === "dashboard" && <DashboardBody />}
              {activeTab === "progress" && <ProgressBody />}
              {activeTab === "goal" && <GoalBody />}
              {activeTab === "document" && <DocumentBody />}
          </div>
      </div>
        )
    }

  function DashboardBody()
  {
    return (
      <div className="text-center text-rose-500">
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
      <div className="text-center text-yellow-300">
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
      <div className="text-center text-rose-500">
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
      <div className="text-center text-rose-500">
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
    </div>
  );
}

export default Dashboard;
