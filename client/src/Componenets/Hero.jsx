import React from 'react'
import { useNavigate } from 'react-router-dom'
import user_group from "../assets/user_group.png"
import { CheckCircle } from "lucide-react"

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

    <div className="mt-14 w-full overflow-hidden">
  <div className="flex items-center gap-10 animate-slide-left whitespace-nowrap hover:[animation-play-state:paused]">
    
    {["Idea", "Create", "Improve", "Publish"].map((step, i) => (
      <div key={i} className="flex items-center gap-8">
        
        {/* Step Pill */}
        <div className="px-8 py-3 rounded-full 
                        bg-gradient-to-r from-blue-50 to-indigo-50
                        border border-blue-200
                        text-blue-700
                        text-base sm:text-lg
                        font-semibold
                        shadow-md">
          {step}
        </div>

        {/* Connector */}
        {i < 3 && (
          <div className="flex items-center">
            <div className="w-10 h-[2px] bg-gradient-to-r from-blue-300 to-indigo-300"></div>
            <span className="mx-2 text-blue-400 text-xl">➜</span>
            <div className="w-10 h-[2px] bg-gradient-to-r from-indigo-300 to-blue-300"></div>
          </div>
        )}
      </div>
    ))}

  </div>
</div>

    </div>
  )
}

export default Hero
