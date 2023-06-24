import React from 'react'
import NavBar from '@/components/NavBar'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: [ 'latin' ]})

export const metadata = {
  title: 'Loan Helper',
  description: 'Get an estimate of your loan details, including the ability to try custom payments!',
}

interface RootLayoutProps {
  children: React.ReactNode
}

export const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NavBar />
        {children}
      </body>
    </html>
  )
}

export default RootLayout