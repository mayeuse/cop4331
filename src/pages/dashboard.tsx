import React, { useContext, useState } from 'react';
import styles from './index.module.css';
import Modal from './modal.tsx';
import { NavLink, Outlet, useLoaderData, useNavigate } from 'react-router-dom';
import { useAuthCookie, UserContext, UserDataContext } from '@/client_ts/Contexts.ts';

function Dashboard(): React.JSX.Element {
  const [ isModalVisible, setModalVisible ] = useState(false);
  const userDataContext = UserContext;
  const {removeCookie} = useAuthCookie();
  const navigate = useNavigate();
  
  const loaderData = useLoaderData();
  if (loaderData) {
    userDataContext.setData(loaderData as UserDataContext);
    console.log("setting user data: " + JSON.stringify(loaderData))
  }
  
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
    setModalVisible(true);
  };
  
  const handleConfirmLogout = () => {
    userDataContext.setData(null);
    removeCookie()
    setModalVisible(false);
    navigate('/');
  };
  
  const handleCancelLogout = () => {
    setModalVisible(false);
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
        
        <div className="mt-8 max-w-3/4 w-full px-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Dashboard

export function DashboardBody() {
  return (
    <div className="text-center text-rose-500">
      <h1 className="text-3xl font-bold mb-4">Welcome to the Dashboard!</h1>
      <p className="text-lg">You are logged in. Time to break that body down!!!</p>
      <div className="mx-auto my-8 justify-center size-fit">
        <img src="/images/Appley.png" alt="Appley" className="mx-auto my-8 w-1/2 h-1/2" />
      </div>
    </div>
  );
}