import React, { useState, useEffect } from "react";
import { ReactComponent as FullLogo } from '../../assets/svg/full-icon.svg';
import PlusIcon from "../../icons/PlusIcon";
import DisplayCharts from "../../analytics/DisplayCharts";
import Board from "../Boards/Board";
import { BoardType } from "../type";
import ShareBoardModal from "../modals/ShareBoard";
import { NavLink, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store"
import CreateNewBoard from "../Boards/CreateNewBoard";
import { setUserSlice } from "../../store/user/userSlice";
import { UserType } from "../type";
import { getBoardFromUserAsync } from "../../store/board/getBoardFromUserSlice";


/**
 * Represents a board in the application.
 */
interface Board {
    _id: string;
    name: string;
    columns: string[];
    tasks: any[];
}


/**
 * Sidebar component.
 * Renders the sidebar with board navigation, user information, and actions.
 */

const Sidebar: React.FC = () => {
    
    const emptyBoard: BoardType= {
        columns: [],
        name: "",
        tasks: [],
        _id: ""
      }
      let boardData: BoardType = useSelector((state: RootState) => state.activeBoard.value) || emptyBoard;
      
      const location = useLocation();
    let userId: string = useSelector((state: RootState) => state.singleUser.value);
    console.log(userId + "userId is")

    let isSidebarOpen: boolean = useSelector((state: RootState) => state.sideBarFlag.value);

    let boards: Board[] = useSelector((state: RootState) => state.getBoardFromUser.value)

    let reloadBoardFlag: boolean = useSelector((state: RootState) => state.reloadBoard.value);

    const dispatch = useDispatch<AppDispatch>();

    let emptyUser: UserType = {
        email: ""
      }
    
    let userObject: UserType = useSelector((state: RootState) => state.singleUserObjectFromDb.value) || emptyUser;
      
    if(userObject.email !== "" && userObject._id){
        dispatch(setUserSlice(userObject._id || ""))
    }
    
    useEffect(() => {
        const fetchBoards = async () => {
            await dispatch(getBoardFromUserAsync(userId))
        };
        fetchBoards();
    }, [userId, reloadBoardFlag]);

    const totalBoards = boards.length;


    return (
        <aside className={isSidebarOpen ? 'sidebar open' : 'sidebar'}>
            <div className={`fixed block sm:flex flex-col bg-gray-800 w-3/5 h-screen sm:h-screen sm:w-1/5 border border-gray-900`}>
                <div className={`fixed flex flex-col bg-gray-800 h-screen w-3/5 sm:w-1/5 border border-gray-900`}>
                    <div className="h-screen">
                        <div className="flex mx-auto mt-8">
                            <FullLogo className="mx-auto" />
                        </div>
                        <div className="flex flex-col mt-24">
                            <div className="w-full ">
                                <div className="text-center py-2 h-2 mb-10 uppercase text-slate-400 text-xs font-bold font-['Plus Jakarta Sans'] mx-auto tracking-[2.40px]">
                                    all boards ({totalBoards})
                                </div>
                                {boards.length > 0 && boards.map((board, index) => (
                                    <NavLink
                                        key={index}
                                        className={({ isActive }) => (
                                            ` mb-3 w-11/12 h-12 border border-gray-600 text-hm rounded-full rounded-l-none flex text-white uppercase items-center hover:bg-purple-500 justify-center ${isActive && 'bg-purple-500'}`
                                        )}
                                        to={board._id}
                                        
                                    >
                                        <span className="mb-3">{board.name}</span>
                                    </NavLink>
                                ))}
                            </div>
                        </div>

                        <div className="absolute inset-x-0 bottom-10 text-center">
                            {boardData.name !== "" && location.pathname !== "/board" &&<div className="flex border border-gray-600 mb-3 items-center justify-center h-12 w-full bg-[#625FC7] text-white rounded-full py-2 px-4 mx-auto hover:bg-purple-400">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="white" className="w-6 h-6 mr-2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
                            </svg>
                            <ShareBoardModal />
                        </div>}
                            {
                                boardData.name !== "" && location.pathname !== "/board" && <div className="flex border border-gray-600 mb-3 items-center justify-center h-12 w-full bg-[#625FC7] text-white rounded-full py-2 px-4 mx-auto hover:bg-purple-400">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="white" className="w-6 h-6 mr-2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
                                </svg>
                                {/* <DisplayCharts boardId=""}/> */}
                                <DisplayCharts />
                            </div>
                            }
                        <CreateNewBoard />
                        </div>
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
