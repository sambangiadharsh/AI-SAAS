import React, { useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'
import { Menu, X } from 'lucide-react'
import Sidebar from '../Componenets/Sidebar'
import { useUser,SignIn } from '@clerk/clerk-react'

const Layout = () => {
  const navigate = useNavigate();
  const { isSignedIn } = useUser();
  const [sidebar, setSidebar] = useState(false);
  

  if (!isSignedIn) {
    // Full-screen centered SignIn
    return (
      <div className="flex items-center justify-center min-h-screen w-full">
        <SignIn />
      </div>
    );
  } 
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-4 py-3 shadow-md bg-white">
        <div 
          className="w-12 h-12 sm:w-44 sm:h-16 overflow-hidden rounded-md cursor-pointer"
          onClick={() => navigate('/')}
        >
          <img
            src={assets.logo}
            alt="logo"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Mobile menu toggle */}
        <div className="sm:hidden">
          {sidebar ? (
            <X
              onClick={() => setSidebar(false)}
              className="w-7 h-7 text-gray-600 cursor-pointer"
            />
          ) : (
            <Menu
              onClick={() => setSidebar(true)}
              className="w-7 h-7 text-gray-600 cursor-pointer"
            />
          )}
        </div>
      </nav>

      {/* Sidebar + Content */}
      <div className="flex flex-1">
        {/* Conditionally render sidebar on mobile */}
        {sidebar && (
          <div className="sm:hidden fixed top-0 left-0 z-50 w-64 h-full bg-white shadow-md">
            <Sidebar sidebar={sidebar} setSidebar={setSidebar} />
          </div>
        )}

        {/* Permanent sidebar on larger screens */}
        <div className="hidden sm:block w-64 bg-white shadow-md">
          <Sidebar />
        </div>

        {/* Main content */}
        <div className="flex-1 bg-[#F4F7FB] p-4">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Layout;
