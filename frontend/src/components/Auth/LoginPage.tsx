import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { NavLink, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { GoogleAuthProvider, sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import { getUserByEmailAsync } from '../../store/user/singleUserAsyncSlice';
import { setLogin } from '../../store/user/loginSlice';
import { auth } from '../../firebase-config';
import Swal from 'sweetalert2';


export default function LoginPage() {
  const provider = new GoogleAuthProvider();
  
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const location = useLocation();
  const isLoggedIn: boolean = useSelector((state: RootState) => state.login.value);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const message = location.state?.message;
  /**
   * Function to sign in the user.
   * @returns {Promise<void>} A promise that resolves when the sign-in process is complete.
   */
  const signIn = async () => {
    try {
      const result = await signInWithEmailAndPassword(auth, username, password);
      const user = result.user;
      const emailId = user.email || '';
      const idToken = await user.getIdToken();
      window.localStorage.setItem('userToken', idToken);
      dispatch(setLogin(true))
      window.localStorage.setItem('isLoggedIn', 'true');
      window.localStorage.setItem('email', emailId)
      await dispatch(getUserByEmailAsync(emailId))
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        }
      });
      Toast.fire({
        icon: "success",
        title: "Logged in successfully"
      });
    } 
    catch (err) {
      let errString: string = String(err);
      if(errString.includes("auth/user-not-found")){
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Email does not exist. Please signup.',
        })
        navigate("/signup")
      }
    }
  };

  /**
   * Handles the forgot password functionality.
   * If the email address is valid, it sends a password reset email.
   * Otherwise, it displays an error message.
   */
  function handleForgotPassword() {
    if (!validateEmail(username)) {
      setEmailError('Enter email address');
    } else {
      setEmailError('');
      sendPasswordResetEmail(auth, username)
        .then(() => {
          Swal.fire({
            icon: 'success',
            title: 'Success!',
            text: 'Password reset email sent',
          });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
        });
    }
  }

  /**
   * Validates an email address using a regular expression.
   * @param email - The email address to validate.
   * @returns True if the email address is valid, false otherwise.
   */
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  /**
   * Validates a password using a regular expression.
   * 
   * @param password - The password to validate.
   * @returns True if the password is valid, false otherwise.
   */
  const validatePassword = (password: string): boolean => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*\d).{8,}$/;
    return passwordRegex.test(password);
  };


  /**
   * Handles the blur event of the email input field.
   * Validates the email address and sets the email error state accordingly.
   */
  const handleEmailBlur = () => {
    if (!validateEmail(username)) {
      setEmailError('Invalid email address');
    } else {
      setEmailError('');
    }
  };

  /**
   * Handles the blur event of the password input field.
   * If the password is not valid, sets the password error message.
   * Otherwise, clears the password error message.
   */
  const handlePasswordBlur = () => {
    if (!validatePassword(password)) {
      setPasswordError('Password must have at least 8 characters, one uppercase, one number, and one special character.');
    } else {
      setPasswordError('');
    }
  };

  /**
   * Handles the login functionality.
   * Validates the email and password inputs.
   * If both inputs are valid, calls the signIn function and logs a success message.
   */
  const handleLogin = () => {
    let isValid = true;
    
    if (!validateEmail(username)) {
      setEmailError('Invalid email address');
      isValid = false;
    }
    if (!validatePassword(password)) {
      setPasswordError('Password must have at least 8 characters, one uppercase, one number, and one special character.');
      isValid = false;
    }
    if (isValid) {
      signIn();
      console.log('Login successful');
    }
  };

  const url1 = '/assests/loginpage1.png';
  const url2 = '/assests/loginpage2.png';

  return (
        <>
        {!isLoggedIn ?
          <div className="w-full h-full flex flex-col lg:flex-row items-center" style={{background: 'linear-gradient(90deg, rgba(77,47,138,1) 0%, rgba(131,26,152,1) 55%, rgba(176,92,194,1) 100%)'}}>
          <div className="w-full lg:w-1/2 border-double hidden md:block">
            <div className='w-full lg:w-3/4 flex flex-col items-center text-center gap-5 mx-auto'>
              <div>
                <h1 className="hidden md:block text-white text-2xl lg:text-5xl font-bold">TaskSphere brings all your tasks, teammates, and tools together</h1>
                <p className="hidden md:block text-white text-lg md:text-xl">Keep everything in the same place, even if your team isn’t.</p>
              </div>
              <div className='flex flex-wrap justify-center gap-4'>
                <img src={url1} alt="" style={{ width: '300px', height: '245px' }} className='hidden md:block'/>
                <img src={url2} alt=""  style={{ width: '300px', height: '245px' }} className='hidden md:block'/>
              </div>
            </div>
          </div>
          <div className="w-11/12 lg:w-1/2 my-auto">
            <form className="max-w-lg p-4 bg-black bg-opacity-50 shadow-md rounded-md md:mx-auto">
            <h1 className="text-white text-2xl mb-4">Login</h1>
              {message && (<p className="text-white bg-slate-800 p-4 rounded-md shadow-md mt-4 mb-8">{message}</p>)}
            <h4 className="text-white mb-2">Glad you are back!</h4>
                    {/* user name */}
                    <div className="mb-4">
                      <label className="block text-white text-sm font-bold mb-2" htmlFor="username">
                        Username
                      </label>
                      <input
                        className="bg-gray-800 border border-gray-300 rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
                        id="username"
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        onBlur={handleEmailBlur}
                      />
                      {emailError && <p className="text-red-500 text-xs italic">{emailError}</p>}
                    </div>

                    {/* password  */}
                  <div className="mb-4">
                    <label className="block text-white text-sm font-bold mb-2" htmlFor="password">
                      Password
                    </label>
                    <input
                      className="bg-gray-800 border border-gray-300 rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
                      id="password"
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      onBlur={handlePasswordBlur}
                    />
                    {passwordError && <p className="text-red-500 text-xs italic">{passwordError}</p>}
                  </div>

                  <div className="flex items-center justify-between">
                    <button
                      className="text-white font-bold py-4 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                      type="button"
                      onClick={handleLogin}
                      style={{
                          background: '#6644ab',
                          // border: '1px solid #fff',
                        }}
                    >
                      Sign In
                    </button>
                  </div>
                  <div className="flex items-center justify-center mt-4">
                  <button className="block text-white text-sm font-bold mb-2" onClick={handleForgotPassword} type='button'>
                      Forgot Password?
                    </button>
                  </div>
                  <div className="mt-8">
                <div className="flex justify-center items-center">
                  <hr className="w-full border-gray-700" />
                  <label className="block font-medium text-sm text-gray-200 w-12 text-center">Or</label>
                  <hr className="w-full border-gray-700" />
                </div>
                
              </div>
              <div className="text-center mt-8 text-sm text-gray-200">
                <p>Don't have an account? <NavLink to="/signup" className="text-purple-300 hover:text-purple-500">Signup</NavLink></p>
              </div>
              </form>
          </div>
          </div>
          :
          <Navigate to="/board"/>}
        </>
  )
}

