import React from 'react'
import CreateLoanForm from '@/components/loans/CreateLoanForm'

const LoansPage: React.FC = () => {
  return (
    <div>
      Create a loan
      <div className='flex w-full items-center justify-center'>
        <CreateLoanForm />
      </div>
    </div>
  )
}

export default LoansPage