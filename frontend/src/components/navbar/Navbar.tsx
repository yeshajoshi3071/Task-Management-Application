import React from 'react';
import { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import MenuIcon from '@mui/icons-material/Menu';
import { setSideBarFlag } from "../../store/flags/sideBarFlagSlice"
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store"
import TaskCard from '../Tasks/TaskCard';
import Notification from '../Tasks/Notification';
import { BoardType } from '../type';
import {setNotificationMessage} from "../../store/notification/notificationSlice"
import '../../styles/styles.css';
import { Dialog, DialogContent, DialogTitle, List, ListItem, ListItemText, IconButton } from '@mui/material';
import { cols } from '../../components/LoadJson/LoadJson';
import { translate } from '../Translations/translate';
import AccountMenu from '../Auth/AccountMenu';
import EditBoard from '../Boards/EditBoard';
import { useLocation } from 'react-router-dom';
import Edit from '../../icons/Edit';
import Swal from 'sweetalert2';



/**
 * Represents the navigation bar component.
 */

const NavBar: React.FC = () => {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [languageModalOpen, setLanguageModalOpen] = useState<boolean>(false);


  const handleLanguageSelect = async (languageCode: string) => {
    setLanguageModalOpen(false);
    await translate(languageCode);
  };

  const dispatch = useDispatch<AppDispatch>();

  const openLanguageModal = () => {
    setLanguageModalOpen(true);
  };

  const closeLanguageModal = () => {
    setLanguageModalOpen(false);
  };

  let isSidebarOpen: boolean = useSelector((state: RootState) => state.sideBarFlag.value);

  const emptyBoard: BoardType= {
    columns: [],
    name: "",
    tasks: [],
    _id: ""
  }
  let boardData: BoardType = useSelector((state: RootState) => state.activeBoard.value) || emptyBoard;

  let notificationMessage: string = useSelector((state: RootState) => state.notification.value);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // Adjust as needed for your mobile breakpoint
    };

    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

 

  const [isModalOpen, setIsModalOpen] = useState(false);


  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const [editModalOpen, setEditModalOpen] = useState(false);
  // const openEditModal = () => setEditModalOpen(true)
  // const closeEditModal = () => setEditModalOpen(false)
  

  const handleTaskCreationSuccess = () => {
    closeModal();
    // dispatch(setNotificationMessage('Task successfully created!'));
    Swal.fire({
      icon: 'success',
      title: 'Success!',
      text: 'Task Created successfully!',
  });
  };

  const location = useLocation();
  
  return (
    <div className={`fixed top-0 right-0 ${isMobile ? 'w-full' : 'w-4/5'} bg-gray-800 h-24 flex justify-between items-center border border-gray-900`}>
      {isMobile && (
        <div className='ml-2'>
          {/* Hamburger Icon for mobile */}
          <MenuIcon
            className="mobile-view-toggle h-6 w-6 cursor-pointer text-white"
            onClick={() => dispatch(setSideBarFlag(!isSidebarOpen))} // Toggle sidebar on click
          />
        </div>
      )}
      <div className='flex items-center flex-grow'>
        <div className='ml-2'>
          {/* Platform Launch Text */}
          <Typography variant="h5" noWrap component="a" href="#app-bar-with-responsive-menu" className="text-white text-lg font-bold font-['Plus Jakarta Sans']">
            {boardData.name}
          </Typography>
        </div>
        <div className='flex-grow' />
        {!isMobile && (
          <div className='mr-5 flex items-center gap-6'>
            {/* Add Button - Desktop View */}
            {boardData.name !== "" && location.pathname !== "/board" && <button className={`border border-gray-600 flex items-center justify-center h-12 w-[12rem] bg-[#625FC7] text-white rounded-full py-2 px-4 hover:bg-purple-400`} onClick={openModal}>
              <AddIcon sx={{ marginRight: 1 }} />
              Add new task
            </button>}
            {boardData.name !== "" && location.pathname !== "/board" && <div className={`border border-gray-600 flex items-center justify-center h-12 w-[12rem] bg-[#625FC7] text-white rounded-full py-2 px-4 hover:bg-purple-400`}>
              {/* <AddIcon sx={{ marginRight: 1 }} /> */}
              <EditBoard />
            </div>}
            {/* Kebab Menu - Desktop View */}
            <button onClick={openLanguageModal}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 21l5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 016-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 01-3.827-5.802" />
              </svg>
            </button>
            {/* {boardData.name!=="" && location.pathname !== "/board" && <EditBoard />} */}
            <AccountMenu />

            {/* Language Selection Modal */}



            <Dialog open={languageModalOpen} onClose={closeLanguageModal}>  
                <div className="flex items-center justify-between">
                  <DialogTitle style={{ textAlign: 'center' }}>Select Language</DialogTitle>
                  <button type="button" className="mr-4 text-gray-400 hover:text-red-500" onClick={closeLanguageModal}>&#x2715;</button>
                </div>
              <DialogContent style={{ backgroundColor: '#303030' }}>
                <div style={{ display: 'flex', gap: '20px', color: 'white' }}>
                  {cols.map((column, index) => (
                    <List key={index} style={{ flex: 1 }}>
                      {column.map((language: { native_name: string; language_code: React.Key | null | undefined; display_name: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; }) => (
                        <button onClick={() => {
                          if (typeof language.language_code === 'string') {
                            handleLanguageSelect(language.language_code);
                          }
                        }}>
                          <ListItem button key={language.language_code}>
                            <ListItemText primary={language.display_name + '(' + language.native_name + ')'} />
                          </ListItem>
                        </button>
                      ))}
                    </List>
                  ))}
                </div>
              </DialogContent>
            </Dialog>

          </div>
        )}
        {isMobile && (
          <div className='mr-5 flex items-center gap-6'>
            {/* Add Button - Mobile View */}
            <button className={`border border-gray-600 flex items-center justify-center h-8 w-8 bg-[#625FC7] text-white rounded-full py-1 px-2 hover:bg-purple-400`} onClick={openModal}>
              <AddIcon />
            </button>
            {boardData.name !== "" && location.pathname !== "/board" && <div className={`border border-gray-600 flex items-center justify-center h-8 w-8 bg-[#625FC7] text-white rounded-full py-1 px-2 hover:bg-purple-400`}>
              {/* <AddIcon sx={{ marginRight: 1 }} /> */}
              <Edit />
              <EditBoard />
            </div>}
            <button onClick={openLanguageModal}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 21l5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 016-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 01-3.827-5.802" />
              </svg>

            </button>
            {/* {boardData.name !== "" && location.pathname !== "/board" && <EditBoard />} */}
            <AccountMenu />

            {/* Language Selection Modal */}
            <Dialog open={languageModalOpen} onClose={closeLanguageModal}>
            <div className="flex items-center justify-between">
                  <DialogTitle style={{ textAlign: 'center' }}>Select Language</DialogTitle>
                  <button type="button" className="mr-4 text-gray-400 hover:text-red-500" onClick={closeLanguageModal}>&#x2715;</button>
                </div>
              <DialogContent style={{ backgroundColor: '#303030' }}>
                <div style={{ display: 'flex', gap: '20px', color: 'white' }}>
                  {cols.map((column, index) => (
                    <List key={index} style={{ flex: 1 }}>
                      {column.map((language: { native_name: string; language_code: React.Key | null | undefined; display_name: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; }) => (
                        <button onClick={() => {
                          if (typeof language.language_code === 'string') {
                            handleLanguageSelect(language.language_code);
                          }
                        }}>
                          <ListItem key={language.language_code}>
                            <ListItemText primary={language.display_name + '(' + language.native_name + ')'} />
                          </ListItem>
                        </button>
                      ))}
                    </List>
                  ))}
                </div>
              </DialogContent>
            </Dialog>
          </div>
        )}
        
        
        {isModalOpen && <TaskCard  isOpen={isModalOpen} onTaskCreate={() => {closeModal();handleTaskCreationSuccess();}} onClose={() =>  closeModal()}/>}

        {notificationMessage && (<Notification/>)}
      </div>
    </div>
  );
};

export default NavBar;