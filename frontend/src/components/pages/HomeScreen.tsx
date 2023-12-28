import React, { useEffect, useState } from 'react';
import Sidebar from '../sidebar/sidebar';
import Navbar from "../navbar/Navbar";
import '../../styles/styles.css';
import { Navigate, Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { setUserSlice } from '../../store/user/userSlice';
import { UserType } from '../type';
import { getUserByEmailAsync } from '../../store/user/singleUserAsyncSlice';

/**
 * Represents the HomeScreen component.
 * @returns The rendered HomeScreen component.
 */

const HomeScreen = () => {

  let isLoggedIn: boolean = useSelector((state: RootState) => state.login.value);
  const dispatch = useDispatch<AppDispatch>();


  useEffect(() => {
    async function setVal() {
      await dispatch(getUserByEmailAsync(window.localStorage.getItem('email') || ""))
      if(userObject._id){
        dispatch(setUserSlice(userObject._id || ""))
      }
      
    }
    setVal()
  }, [isLoggedIn])

  let emptyUser: UserType = {
    email: ""
  }

  let userObject: UserType = useSelector((state: RootState) => state.singleUserObjectFromDb.value) || emptyUser;
  
  if(!isLoggedIn){
    return (
      <Navigate to="/" />
    )
  }


  return (
    <div className="bg-gray-900 h-screen flex relative">
      <Sidebar />
      <Navbar />
      <Outlet />
    </div>
  );
};

export default HomeScreen;
