import React, { useState } from "react";
import LoginSignupNavbar from "../navbar/LoginSignupNavbar";
import LoginSignupFooter from "../footer/LoginSignupFooter";
import { NavLink, Navigate, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { UserType } from "../type";
import {
  createUserAsync,
  getUserByEmailAsync,
} from "../../store/user/singleUserAsyncSlice";
import { setLogin } from "../../store/user/loginSlice";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase-config";
import Swal from "sweetalert2";

/**
 * Renders the sign-up page component.
 */
function SignUpPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const isLoggedIn: boolean = useSelector(
    (state: RootState) => state.login.value
  );

  const location = useLocation();
  const message = location.state?.message;

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [phoneNo, setPhoneNo] = useState("");

  /**
   * Function to handle user sign up.
   * It creates a new user with the provided email and password,
   * sets the user token in local storage, dispatches a login action,
   * displays a success toast notification, updates the user profile,
   * and retrieves the user by email.
   * If the user already exists, it navigates to the home page with an error message.
   */
  const signUp = async () => {
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = result.user;
      const emailId = user.email || "";
      const idToken = await user.getIdToken();
      window.localStorage.setItem("userToken", idToken);
      dispatch(setLogin(true));
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
        title: "Signed up successfully"
      });
      window.localStorage.setItem("isLoggedIn", "true");
      let emptyUserToBeUpdated: UserType = {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        phoneNo: "",
        boards: [],
      };
      let userToBeUpdate: UserType = {
        ...emptyUserToBeUpdated,
        email: emailId,
        firstName,
        lastName,
        phoneNo,
      };
      console.log("userToBeUpdate" + JSON.stringify(userToBeUpdate));
      await dispatch(createUserAsync(userToBeUpdate));
      window.localStorage.setItem("email", emailId);
      await dispatch(getUserByEmailAsync(emailId));
    } catch (err) {
      navigate("/", { state: { message: "User already exists" } });
    }
  };

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
   * @param password - The password to be validated.
   * @returns True if the password is valid, false otherwise.
   */
  const validatePassword = (password: string): boolean => {
    const passwordRegex =
      /^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*\d).{8,}$/;
    return passwordRegex.test(password);
  };

  /**
   * Handles the blur event of the email input field.
   * Validates the email address and sets the email error if it is invalid.
   */
  const handleEmailBlur = () => {
    if (!validateEmail(email)) {
      setEmailError("Invalid email address");
    } else {
      setEmailError("");
    }
  };

  /**
   * Handles the blur event of the password input field.
   * If the password is not valid, sets the password error message.
   * Otherwise, clears the password error message.
   */
  const handlePasswordBlur = () => {
    if (!validatePassword(password)) {
      setPasswordError(
        "Password must have at least 8 characters, one uppercase, one number, and one special character."
      );
    } else {
      setPasswordError("");
    }
  };

  /**
   * Handles the sign-up form submission.
   * 
   * @param event - The form submission event.
   */
  const handleSignUp = (event: React.FormEvent) => {
    event.preventDefault();
    if (!validateEmail(email)) {
      console.error("Invalid email address");
      return;
    }

    if (!validatePassword(password)) {
      console.error(
        "Password must have at least 8 characters, one uppercase, one number, and one special character."
      );
      return;
    }

    console.log("SignUp successful", {
      firstName,
      lastName,
      email,
      phoneNo,
      password,
    });
  };

  const url1 = "/assests/loginpage1.png";
  const url2 = "/assests/loginpage2.png";

  return (
    <>
      {message && (
        <p className="text-white bg-slate-800 p-4 rounded-md shadow-md mt-4 mb-8">
          {message}
        </p>
      )}
      {!isLoggedIn ? (
        <div
          className="w-full h-full flex flex-col lg:flex-row items-center"
          style={{
            background: 'linear-gradient(90deg, rgba(77,47,138,1) 0%, rgba(131,26,152,1) 55%, rgba(176,92,194,1) 100%)',
          }}
        >
          <div className="w-full lg:w-1/2 border-double hidden md:block">
            <div className="w-full lg:w-3/4 flex flex-col items-center text-center gap-5 mx-auto">
              <div>
                <h1 className="hidden md:block text-white text-2xl lg:text-5xl font-bold">
                  TaskSphere brings all your tasks, teammates, and tools
                  together
                </h1>
                <p className="hidden md:block text-white text-lg md:text-xl">
                  Keep everything in the same place, even if your team isn’t.
                </p>
              </div>
              <div className="flex flex-wrap justify-center gap-4">
                <img
                  src={url1}
                  alt=""
                  style={{ width: "300px", height: "245px" }}
                  className="hidden md:block"
                />
                <img
                  src={url2}
                  alt=""
                  style={{ width: "300px", height: "245px" }}
                  className="hidden md:block"
                />
              </div>
            </div>
          </div>

          <div className="w-11/12 lg:w-1/2 my-auto">
            <form className="max-w-lg p-4 bg-black bg-opacity-50 shadow-md rounded-md md:mx-auto">
              <h2 className="text-white text-2xl mb-4">Sign Up</h2>

              {/* First Name */}
              <div className="mb-4">
                <label
                  className="block text-white text-sm font-bold mb-2"
                  htmlFor="firstname"
                >
                  First Name
                </label>
                <input
                  className="bg-gray-800 border border-gray-300 rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
                  id="firstname"
                  type="text"
                  placeholder="John"
                  value={firstName
                  }
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>

              {/* Last Name */}
              <div className="mb-4">
                <label
                  className="block text-white text-sm font-bold mb-2"
                  htmlFor="lastname"
                >
                  Last Name
                </label>
                <input
                  className="bg-gray-800 border border-gray-300 rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
                  id="lastname"
                  type="text"
                  placeholder="Doe"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>

              {/* Email */}
              <div className="mb-4">
                <label
                  className="block text-white text-sm font-bold mb-2"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  className="bg-gray-800 border border-gray-300 rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={handleEmailBlur}
                  placeholder="johndoe@gmail.com"
                />
                {emailError && (
                  <p className="text-red-500 text-xs italic">{emailError}</p>
                )}
              </div>

              {/* Password */}
              <div className="mb-4">
                <label
                  className="block text-white text-sm font-bold mb-2"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  className="bg-gray-800 border border-gray-300 rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onBlur={handlePasswordBlur}
                  placeholder="********"
                />
                {passwordError && (
                  <p className="text-red-500 text-xs italic">{passwordError}</p>
                )}
              </div>

              {/* Phone Number */}
              <div className="mb-4">
                <label
                  className="block text-white text-sm font-bold mb-2"
                  htmlFor="phno"
                >
                  Phone No.
                </label>
                <input
                  className="bg-gray-800 border border-gray-300 rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
                  id="phno"
                  type="tel"
                  placeholder="000-000-0000"
                  value={phoneNo}
                  onChange={(e) => setPhoneNo(e.target.value)}
                />
              </div>

              {/* Sign Up Button */}
              <button
                className="w-full bg-purple-700 hover:bg-purple-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
                onClick={signUp}
              >
                Sign Up
              </button>
              <div className="text-center mt-8 text-sm text-gray-200">
                <p>
                  Existing user?
                  <NavLink
                    to="/"
                    className="text-purple-300 hover:text-purple-500"
                  >
                    Login
                  </NavLink>
                </p>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <Navigate to="/board" />
      )}
    </>
  );
}

export default SignUpPage;
