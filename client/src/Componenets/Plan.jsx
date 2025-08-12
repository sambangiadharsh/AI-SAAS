import React from 'react'
import { PricingTable } from '@clerk/clerk-react'

const Plan = () => {
  return (
    <div className='px-4 sm:px-8 md:px-16 lg:px-32 xl:px-48 py-24 bg-gray-50 min-h-screen'>
      <div className='text-center mb-12'>
        <h1 className='text-4xl sm:text-5xl font-bold text-slate-800 mb-4'>
          Premium Plans
        </h1>
        <p className='text-gray-500 text-lg max-w-2xl mx-auto'>
          Start with the free plan and expand as your business grows. Upgrade for more features and better scalability.
        </p>
      </div>

      <div className='flex justify-center'>
        <div className='w-full max-w-5xl'>
          <PricingTable />
        </div>
      </div>
    </div>
  )
}

export default Plan
