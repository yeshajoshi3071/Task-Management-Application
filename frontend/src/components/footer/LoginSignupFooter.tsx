import React from 'react';
/**
 * Represents the footer component for the login/signup page.
 * Displays the copyright information and credits for the developers.
 */
const LoginSignupFooter: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white pt-5">
      <div className="flex flex-col justify-between items-center">
        <div className="text-sm md:text-md mb-2">
          &copy; {new Date().getFullYear()} TaskSphere. All rights reserved.
        </div>
        <div className='pb-2'>Made with love ❤️ by</div>
        <div className="pb-2">
            <a href="https://www.linkedin.com/in/yeshajoshi3071/" className="font-bold rounded hover:text-purple-300" target="_blank">
                Yesha
            </a>
            <a href="https://www.linkedin.com/in/shashwat-shahi/" className="font-bold rounded hover:text-purple-300 ml-4" target="_blank">
                Shashwat
            </a>
            <a href="https://www.linkedin.com/in/tejashree-gore-58448265/" className="font-bold rounded hover:text-purple-300 ml-4" target="_blank">
                Tejashree
            </a>
            <a href="https://www.linkedin.com/in/sarvesh-gaurishankar-sawant-37b0b31a9/" className="font-bold rounded hover:text-purple-300 ml-4" target="_blank">
                Sarvesh
            </a>
        </div>
      </div>
    </footer>
  );
};

export default LoginSignupFooter;
