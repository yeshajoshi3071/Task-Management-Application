import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import Delete from '../../icons/Delete';
import { BoardType } from '../type';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { deleteBoardAsync, updateBoardAsync } from '../../store/board/singleBoardSlice';
import { reloadBoard } from '../../store/flags/reloadBoardSlice';
import { useNavigate } from 'react-router-dom';
import { getBoardFromUserAsync } from '../../store/board/getBoardFromUserSlice';
import { setActiveBoard } from '../../store/active/activeBoardSlice';
import { useState } from 'react';
import Edit from '../../icons/Edit';
import Swal from 'sweetalert2';
/**
 * Component for editing a board.
 * 
 * @returns The EditBoard component.
 */

export default function EditBoard() {

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate()
  const emptyBoard: BoardType = {
    columns: [],
    name: "",
    tasks: [],
    _id: ""
  }

  const [isMobileView, setIsMobileView] = useState<boolean>(false);

  // Function to check screen size and update state accordingly
  const checkIsMobile = () => {
    const screenWidth = window.innerWidth;
    if (screenWidth < 768) {
      setIsMobileView(true);
    } else {
      setIsMobileView(false);
    }
  };

  // useEffect to add event listener on mount and remove on unmount
  React.useEffect(() => {
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    return () => {
      window.removeEventListener('resize', checkIsMobile);
    };
  }, []);


  let boardData: BoardType = useSelector((state: RootState) => state.activeBoard.value) || emptyBoard;
  let reloadBoardFlag: boolean = useSelector((state: RootState) => state.reloadBoard.value);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    dispatch(reloadBoard(!reloadBoardFlag))
    if (boardName !== "" && !(inputValues.filter(val => val === "").length > 0)) {
      setOpen(false);
    }
  };

  // State to manage the inputs' values
  const [inputValues, setInputValues] = React.useState<string[]>([]);
  const [boardName, setBoardName] = React.useState("");


  React.useEffect(
    () => {
      setBoardName(boardData.name);
      setInputValues(boardData.columns);
    },
    [boardData]
  )

  //Update board
  const boardColumnNameUpdate = async () => {
    await dispatch(updateBoardAsync({
      ...boardData,
      columns: inputValues,
      name: boardName
    }))
    await dispatch(getBoardFromUserAsync(boardData?.user || ''))
    handleClose();
  };

  /**
   * Handles the deletion of a board.
   * Deletes the board using the deleteBoardAsync action,
   * retrieves the updated board list using the getBoardFromUserAsync action,
   * navigates to the '/board' route,
   * closes the modal,
   * and displays a success message using Swal.fire.
   */
  const handleDeleteBoard = async () => {
    await dispatch(deleteBoardAsync(boardData._id || ''))
    await dispatch(getBoardFromUserAsync(boardData?.user || ''))

    navigate('/board')
    handleClose();
    Swal.fire({
      title: 'Board Deleted!',
      text: 'Board has been deleted.',
      icon: 'success',
      confirmButtonText: 'Ok'
    })
  }

  // Function to handle changes in input values
  const handleInputChange = (index: number, value: string) => {
    const newValues: string[] = [...inputValues];
    newValues[index] = value;
    setInputValues(newValues);
  };

  // Function to add a new input
  const addInput = () => {
    setInputValues([...inputValues, '']);
  };

  // Function to remove an input
  const removeInput = (index: number) => {
    const newValues = [...inputValues];
    newValues.splice(index, 1);
    setInputValues(newValues);
  };

  function handleBoardNameChange(event: React.ChangeEvent<HTMLInputElement>) {
    setBoardName(event.target.value)
  }





  return (
    <React.Fragment>
      {/* <button onClick={handleClickOpen} >
      Edit the task
      </button> */}
      <button onClick={handleClickOpen} className="flex items-center">
      <span >
        <Edit />
      </span>
      <span className={isMobileView ? 'hidden' : 'inline-block mr-2'}>Edit board</span>
    </button>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm" PaperProps={{ style: { backgroundColor: 'transparent' } }} >
        <form className='bg-[#2B2C37] flex flex-col w-full rounded-lg px-4 py-8'>
          <div className='flex items-center justify-between'>
          <h2 className='mb-4 text-white font-bold text-xl'>Edit Board</h2>
          <button type="button" className="mb-6 text-gray-400 hover:text-red-500" onClick={() => setOpen(false)}>&#x2715;</button>
          </div>
          <div className='flex justify-between'><h3 className='mb-5 text-white font-bold'>Board Name</h3><button className="mb-5 text-white font-bold text-lg bg-red-500 hover:bg-red-700 rounded-md px-2 py-0.5" type='button' onClick={handleDeleteBoard}>Delete Board</button>
          </div>
          <input
            type="text"
            name="boardname"
            value={boardName}
            className='mx-auto w-10/12 mb-4 rounded-sm px-3.5 py-2 bg-[#2B2C37] border-solid border-gray-500 border-2 text-white'
            onChange={handleBoardNameChange}
            required
          />
          <h3 className='mb-2 text-white font-bold'>Board Columns</h3>
          {inputValues && inputValues.map((value, index) => (
            <div key={index} className='mx-auto flex flex-row w-10/12 justify-between mb-3'>
              <input
                type="text"
                value={value}
                onChange={(e) => handleInputChange(index, e.target.value)}
                className='rounded-sm px-3.5 py-2 w-10/12 bg-[#2B2C37] border-solid border-gray-500 border-2 text-white'
                required
              />
              <button type='button' onClick={() => removeInput(index)}><Delete /></button>
            </div>
          ))}
          <button className="bg-[#FFFFFF] text-[#635FC7] mx-auto w-10/12 mb-4 font-bold px-3.5 py-2 rounded-xl" onClick={addInput} type='button'>+ Add New Columns</button>
          <button className="bg-[#635FC7] mx-auto w-10/12 text-white font-bold px-3.5 py-2 rounded-xl" onClick={boardColumnNameUpdate} type='button'>Save Changes</button>
        </form>
      </Dialog>
    </React.Fragment>
  );
}