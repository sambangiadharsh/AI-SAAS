import React from 'react'
import {useNavigate} from 'react-router-dom'
import {assets} from "../assets/assets"
import { ArrowRight } from 'lucide-react'
import {useUser,UserButton, useClerk} from "@clerk/clerk-react"
const Navbar = () => {
  const navigate=useNavigate()

  const {user}=useUser()
  const {openSignIn}=useClerk()
  return (
    <div className='fixed z-5 w-full backdrop-blur-2xl flex  justify-between items-center py-3 px-4 sm:px-20 xl:px-32 '>
      <div className="w-12 h-12 rounded-full  sm:w-44 sm:h-16 overflow-hidden">
  <img
    src={assets.logo}
    alt="logo"
    className="w-full h-full py-1 object-cover cursor-pointer"
    onClick={() => navigate('/')}
  />
</div>

      

      {
        user?<UserButton/>:(
<button onClick={openSignIn} className=''>Get started <ArrowRight className='w-4 h-4'/> </button>
   
        )
      }
      </div>
  )
}

export default Navbar
