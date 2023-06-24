import React from 'react'
import Link from 'next/link'

const Home: React.FC = () => {
  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <div className='flex flex-col items-center justify-center'>
        <h1 className='text-4xl font-bold text-center border-2 border-gray-700 rounded-lg p-10'>
          Loan Helper
        </h1>
        <p className='text-xl text-center my-5'>
          Demystify your loan! Estimate loan details, experiment with pay-off schedules, and more! 
        </p>
        <Link href='/loans' className='p-3 rounded-lg bg-gray-700 font-bold text-xl'>
          Get Started
        </Link>
      </div>
    </main>
  )
}

export default Home
