import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Logout from '@mui/icons-material/Logout';
import { auth } from "../../firebase-config";
import { signOut } from "firebase/auth";
import { setLogin } from '../../store/user/loginSlice';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Swal from 'sweetalert2';
import { setActiveBoard } from '../../store/active/activeBoardSlice';

export default function AccountMenu() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  /**
   * Logs out the user.
   * 
   * @returns {Promise<void>} A promise that resolves when the user is logged out successfully.
   */
  const logout = async () => {
    try {
      await signOut(auth);
      dispatch(setLogin(false))
      window.localStorage.removeItem('userToken')
      window.localStorage.removeItem('email')
      window.localStorage.setItem('isLoggedIn', 'false');
      dispatch(setActiveBoard(null))
      navigate("/")
      Swal.fire({
        icon: 'success',
        title: 'Logged out successfully!',
        showConfirmButton: false,
        timer: 1500
      })
    } catch (err) {
      console.error(err);
    }
  };

    let isLoggedIn: boolean = useSelector((state: RootState) => state.reloadTask.value);

    let userId: string = useSelector((state: RootState) => state.singleUser.value);

    /**
     * Fetches data for a given user ID.
     * @param userId - The ID of the user.
     * @returns A promise that resolves to the first name of the user.
     */
    async function FetchData(userId: string): Promise<any> {
      try {
        const response = await fetch(`http://localhost:3001/users/${userId}`);

        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const data = await response.json();

        const firstName: string[] = data.firstName;
        return firstName;
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    const [firstName, setFirstName] = React.useState<string[]>([]);
  
    /**
     * Fetches data for the user and sets the first name in the component state.
     * @param {string} userId - The ID of the user.
     */
    React.useEffect(() => {
      const fetchAndSetData = async () => {
        const data = await FetchData(userId);
        setFirstName(data);
      };

      fetchAndSetData();
    }, [userId]);

  
  /**
   * Renders the account menu component.
   * 
   * @returns The JSX element representing the account menu.
   */
  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Tooltip title="User Welcome Message">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Typography variant="body1" sx={{ color: 'white', textTransform: 'none', fontSize: '1.5rem' }}>Hi, {firstName}</Typography>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={handleClose} style={{ display: 'flex', alignItems: 'center' }}>
          <div onClick={logout} style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            <button onClick={logout} style={{ background: 'none', border: 'none', color: 'black', marginLeft: '10px' }}>Logout</button>
          </div>
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}