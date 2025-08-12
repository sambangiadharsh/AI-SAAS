import React from 'react'
import { useNavigate } from 'react-router-dom'
import user_group from "../assets/user_group.png";

const Hero = () => {
  const navigate = useNavigate()

  return (
    <div className="relative w-full min-h-screen px-4 sm:px-20 xl:px-32 bg-[url('/gradientBackground.png')] bg-cover bg-no-repeat flex flex-col justify-center items-start">
      
      <div className="max-w-3xl text-left">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-800 leading-tight">
          Create amazing content with <br />
          <span className="text-blue-600">AI Tools</span>
        </h1>
        <p className="text-gray-600 mt-4 text-lg">
          Supercharge your content creation using powerful AI tools built to save time and boost productivity.
        </p>
      </div>

      <div className="flex flex-wrap gap-4 mt-8 text-sm">
        <button
          onClick={() => navigate('/ai')}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg shadow-md transition"
        >
          START CREATING NOW
        </button>
        <button
          className="bg-white border border-gray-300 hover:border-blue-600 text-gray-700 hover:text-blue-600 font-medium px-6 py-3 rounded-lg transition"
        >
          Watch Demo
        </button>
      </div>

      <div className="mt-10 flex items-center gap-3 text-gray-500 text-sm">
        <img
          src={user_group}
          alt="User Group"
          
        />
        <span>Trusted by 100k+ people</span>
      </div>
    </div>
  )
}

export default Hero
