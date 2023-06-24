import React from 'react'
import Link from 'next/link'

interface NavBarProps {

}

const NavBar: React.FC<NavBarProps> = ({}) => {
  return (
    <div className='w-full h-16 p-5 bg-gray-700'>
      <Link href='/' className='font-bold mr-5'>
        Home
      </Link>
      <Link href='/loans' className='font-bold'>
        Loans
      </Link>
    </div>
  )
}

export default NavBar