import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store"
import {setNotificationMessage} from "../../store/notification/notificationSlice"
  
/**
 * Notification component displays a notification message and automatically hides it after a certain duration.
 */

const Notification: React.FC = () => {

  const dispatch = useDispatch<AppDispatch>();
  
  let notificationMessage: string = useSelector((state: RootState) => state.notification.value);

  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      dispatch(setNotificationMessage(''))
    }, 2000);
    return () => clearTimeout(timer);
  }, [notificationMessage]);

  return (
  <div className="notification fixed top-16 right-4 p-10 border-4 border-purple-500 font-bold	bg-[#2B2C37] rounded-md z-100">
    {notificationMessage}
  </div>
  );
};

export default Notification;
