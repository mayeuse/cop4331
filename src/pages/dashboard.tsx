import React, { useContext, useState } from "react";
import styles from "./index.module.css";
import Modal from "./modal.tsx";
import { USER_CONTEXT } from "@/index.tsx";
import { LoaderFunctionArgs, NavLink, Outlet } from "react-router-dom";

export default function(): React.JSX.Element {
  const [ isModalVisible, setModalVisible ] = useState(false);
  
  const userDataContext = useContext(USER_CONTEXT);
  
  function Logout() {
    return (
      <div className="relative">
        <button className={ `absolute top-4 right-4 ${ styles.button }` } onClick={ handleLogout }>Logout</button>
        { isModalVisible && (<Modal message="Are you sure you want to log out?"
                                    onConfirm={ handleConfirmLogout } onCancel={ handleCancelLogout } />) }
      </div>
    );
  }
  
  
  const handleLogout = () => {
    setModalVisible(true); // Show the modal when the user clicks logout
  };
  
  const handleConfirmLogout = () => {
    userDataContext.data = null; // remove user data
    // setIsLoggedIn(false);
    // localStorage.removeItem("isLoggedIn");
    setModalVisible(false); // Close the modal after logout
  };
  
  const handleCancelLogout = () => {
    setModalVisible(false); // Close the modal if user cancels
  };
  
  return (
    <div className="text-center">
      <Logout />
      <div className="min-h-screen flex flex-col items-center">
        <div className="mt-3">
          <div className="flex border-b border-yellow-700">
            <NavLink to={ "" } end
                     className={ ({ isActive }) => `py-3 px-8 ${
                       isActive
                         ? "border-b-2 border-yellow-700 text-lime-900 font-bold"
                         : "text-yellow-700 hover:text-lime-900"
                     }` }
            >
              Dashboard
            </NavLink>
            <NavLink to={ "progress" }
                     className={ ({ isActive }) => `py-3 px-8 ${
                       isActive
                         ? "border-b-2 border-yellow-700 text-lime-900 font-bold"
                         : "text-yellow-700 hover:text-lime-900"
                     }` }
            >
              Progress
            </NavLink>
            <NavLink to={ "goals" }
                     className={ ({ isActive }) => `py-3 px-8 ${
                       isActive
                         ? "border-b-2 border-yellow-700 text-lime-900 font-bold"
                         : "text-yellow-700 hover:text-lime-900"
                     }` }
            >
              Weekly Goal
            </NavLink>
            <NavLink to={ "exercise" }
                     className={ ({ isActive }) => `py-3 px-8 ${
                       isActive
                         ? "border-b-2 border-yellow-700 text-lime-900 font-bold"
                         : "text-yellow-700 hover:text-lime-900"
                     }` }
            >
              Log Exercise
            </NavLink>
          </div>
        </div>
        
        {/* Tab Content */ }
        <div className="mt-8 max-w-3/4 w-full px-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export function DashboardBody() {
  return (
    <div className="text-center text-rose-500">
      <h1 className="text-3xl font-bold mb-4">Welcome to the Dashboard!</h1>
      <p className="text-lg">You are logged in. Time to break that body down!!!</p>
      <div className="mx-auto my-8 justify-center size-fit">
        <img src="/images/Appley.png" alt="Appley" className="mx-auto my-8 w-1/2 h-1/2" />
      </div>
      <h1 className="text-lg">你的肌肉是我的</h1>
    </div>
  );
}

export function ProgressBody() //maybe import to own file later
{
  return (
    <div className="text-center text-rose-500">
      <h1 className="text-3xl font-bold mb-4">Welcome to your Progress!</h1>
      <p className="text-lg">Progress Bar goes here?</p>
      <div className="mx-auto my-8 justify-center size-fit">
        <img src="/images/Appley.png" alt="Appley" className="mx-auto my-8 w-1/2 h-1/2" />
      </div>
      <h1 className="text-lg">Are you doing good? Hmmm?</h1>
      <h1 className="text-lg">ARE YOU?!?!?!?!?!?</h1>
    </div>
  );
}

export function GoalBody() //import to own file later
{
  return (
    <div className="text-center text-rose-500">
      <h1 className="text-3xl font-bold mb-4">Insert your Weekly Goal here!</h1>
      <p className="text-lg">Goal Form goes here?</p>
      <div className="mx-auto my-8 justify-center size-fit">
        <img src="/images/Appley.png" alt="Appley" className="mx-auto my-8 w-1/2 h-1/2" />
      </div>
      <h1 className="text-lg">Be ambitious, but reasonable.</h1>
    </div>
  );
}

export function ExerciseBody() //import to own file later
{
  return (
    <div className="text-center text-rose-500">
      <h1 className="text-3xl font-bold mb-4">Document your Exercise here!</h1>
      <p className="text-lg">Exercise Log goes here?</p>
      <div className="mx-auto my-8 justify-center size-fit">
        <img src="/images/Appley.png" alt="Appley" className="mx-auto my-8 w-1/2 h-1/2" />
      </div>
      <h1 className="text-lg">Be Honest, I know when you lie.</h1>
    </div>
  );
}

export function loader(args: LoaderFunctionArgs) {

}

