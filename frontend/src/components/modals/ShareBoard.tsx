import { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import * as React from 'react';
import { useSelector } from "react-redux";
import { RootState } from "../../store/store"
import { BoardType } from "../../components/type";
import Swal from 'sweetalert2';


/**
 * Fetches data from the server based on the provided user email.
 * @param userEmail - The email of the user to fetch data for.
 * @returns A Promise that resolves to the fetched data.
 */
async function FetchData(userEmail: string): Promise<any> {
    try {
        const response = await fetch(`http://localhost:3001/users/email/${userEmail}`);

        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }

        const data = await response.json();
        console.log('Data:', data);
        return data;

    } catch (error) {
        console.error('Error fetching data:', error);
    }
}
/**
 * Updates the user data for a given user ID.
 * @param userData - The data to be updated for the user.
 * @param userID - The ID of the user.
 * @returns A promise that resolves to the updated user data.
 */
async function UpdateUserData(userData: any, userID: string): Promise<any> {
    try {
        const response = await fetch(`http://localhost:3001/users/${userID}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });

        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }

        const data = await response.json();
        // console.log('Data:', data);

        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}
/**
 * Component for sharing a board with another user.
 */

const ShareBoardModal: React.FC = () => {
    const [open, setOpen] = useState(false);
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);

    };

    const emptyBoard: BoardType = {
        columns: [],
        name: "",
        tasks: [],
        _id: ""
    }

    let board: BoardType = useSelector((state: RootState) => state.activeBoard.value) || emptyBoard;
    let boardId: string = board._id || "";


    const handleSubmit = async () => {
        setLoading(true);
        try {
            // Fetch initial user details based on email
            const userData = await FetchData(email);

            if (!userData) {
                throw new Error('User not found');
            }
    
            // Modify the boards in the response by adding the current board id to it
            if (userData && userData.boards) {
                const updatedBoards = [...userData.boards, boardId];

                // Update the user data with the modified 'boards' array
                const updatedUserData = { ...userData, boards: updatedBoards };

                // console.log('Updated user data:', updatedUserData);
    
                // Hit another endpoint with the updated user data
                const secondResponse = await UpdateUserData(updatedUserData, userData._id);
                // console.log('Updated user data:', secondResponse);

                if (secondResponse) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Success!',
                        text: 'User added successfully!',
                    });
                }
            }
        } catch (error) {
            // Handle error if any API call fails
            console.error('Error:', error);
            // Display an error message using SweetAlert if the API call fails
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: `Something went wrong!\n${error}`,
            });
        }
        setLoading(false);
        handleClose(); // Close the modal after the API call
    };
    


    return (
        <React.Fragment>
            <button onClick={handleOpen} className="text-white">
                Team up with fellow users
            </button>
            <Dialog
                open={open}
                fullWidth
                maxWidth="sm"
                PaperProps={{ style: { backgroundColor: 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center' } }}
            >
                <div className="absolute top-0 right-0 m-2">
                    <button onClick={handleClose} className="text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white hover:text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <form className='bg-[#2B2C37] flex flex-col w-full rounded-lg px-4 py-8'>
                    <h2 className='mb-4 text-white font-bold text-xl text-center'>Share the board with another user</h2>
                    <h3 className='mb-2 text-white font-bold text-center'>User's Email Address</h3>
                    <input
                        type="email"
                        name="useremail"
                        className='mx-auto w-10/12 mb-4 rounded-sm px-3.5 py-2 bg-[#2B2C37] border-solid border-gray-500 border-2 text-white'
                        required
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <button
                        className="bg-[#635FC7] mx-auto w-10/12 text-white font-bold px-3.5 py-2 rounded-xl"
                        type='button'
                        onClick={handleSubmit}
                        disabled={loading}
                    >
                        {loading ? 'Loading...' : 'Share Board'}
                    </button>
                </form>
            </Dialog>
        </React.Fragment>
    );
};

export default ShareBoardModal;
