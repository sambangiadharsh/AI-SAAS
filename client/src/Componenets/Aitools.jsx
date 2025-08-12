import React from 'react'
import { AiToolsData } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { useUser } from '@clerk/clerk-react'

const Aitools = () => {
  const navigate = useNavigate()
  const { user } = useUser()

  return (
    <div className='px-4 sm:px-20 xl:px-32 my-24'>
      <div className='text-center mb-12'>
        <h2 className='text-slate-700 text-4xl sm:text-5xl font-semibold mb-4'>
          Powerful AI Tools
        </h2>
        <p className='text-gray-500 max-w-xl mx-auto text-base sm:text-lg'>
          Everything you need to create, enhance, and optimize your content with cutting-edge AI technology.
        </p>
      </div>

      <div className='flex flex-wrap justify-center gap-6'>
        {AiToolsData.map((tool, index) => (
          <div
            key={index}
            onClick={() => user && navigate(tool.path)}
            className='group w-full max-w-xs cursor-pointer bg-white border border-gray-100 rounded-xl shadow-md hover:-translate-y-1 hover:shadow-lg transition-all duration-300 p-6 text-center'
          >
            <div
              className='w-14 h-14 mx-auto rounded-full flex items-center justify-center mb-4'
              style={{
                background: `linear-gradient(to bottom, ${tool.bg.from}, ${tool.bg.to})`
              }}
            >
              <tool.Icon className='w-7 h-7 text-white' />
            </div>
            <h3 className='text-lg font-semibold text-gray-800 mb-2'>{tool.title}</h3>
            <p className='text-gray-500 text-sm'>{tool.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Aitools
