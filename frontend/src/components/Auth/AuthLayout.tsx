import React from 'react'
import LoginSignupNavbar from '../navbar/LoginSignupNavbar'
import LoginSignupFooter from '../footer/LoginSignupFooter'
import { Outlet } from 'react-router-dom'

/**
 * Renders the layout for the authentication pages.
 * 
 * @returns The JSX element representing the authentication layout.
 */
function AuthLayout() {
  return (
    <div className='flex flex-col border-double h-screen w-screen justify-between'>
      <div>
        <LoginSignupNavbar />
      </div>
      <Outlet />
      <div>
        <LoginSignupFooter />
      </div>
    </div>
  )
}

export default AuthLayout;