import React from 'react'

export const metadata = {
  title: 'Loan Helper | Loans',
  description: 'View, create, and experiment with loans!',
}

interface LoansLayoutProps {
  children: React.ReactNode
}

export const LoansLayout: React.FC<LoansLayoutProps> = ({ children }) => {
  return (
    <section>
      {children}
    </section>
  )
}

export default LoansLayout