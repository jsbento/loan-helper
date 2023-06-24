'use client'
import React, { useState } from 'react'
import { DateTime } from 'luxon'
import CurrencyInput from 'react-currency-input-field'

import { Loan } from '@/types/loan'

const CreateLoanForm: React.FC = () => {
  const [ amount, setAmount ] = useState<number>( 0 )
  const [ interestRate, setInterestRate ] = useState<number>( 0.0 )
  const [ period, setPeriod ] = useState<number>( 0 )
  const [ startDate, setStartDate ] = useState<DateTime>( DateTime.now())

  const onSubmit = ( e: React.FormEvent<HTMLFormElement> ) => {
    e.preventDefault()

    const loan = new Loan( amount, interestRate, period, startDate )
    console.log( loan )
  }

  return (
    <div className='border-2 border-gray-700 rounded-lg w-1/3'>
      <h1 className='text-center font-semibold my-2 text-2xl'>Create New Loan</h1>
      <form className='flex flex-col p-3' onSubmit={ onSubmit }>
        <label htmlFor='amount' className='text-xl font-semibold my-2'>
          Amount
        </label>
        <CurrencyInput
          id='amount'
          name='amount'
          value={ amount }
          onValueChange={ v => setAmount( parseFloat( v || '0' )) }
          prefix='$'
          decimalsLimit={ 2 }
          allowNegativeValue={ false }
          className='border-2 border-gray-700 rounded-lg w-1/4 text-black p-2'
        />
        <label htmlFor='interest-rate' className='text-xl font-semibold my-2'>
          Interest Rate
        </label>
        <CurrencyInput
          id='interest-rate'
          name='interest-rate'
          value={ interestRate }
          onValueChange={ v => setInterestRate( parseFloat( v || '0' )) }
          suffix='%'
          fixedDecimalLength={ 2 }
          allowNegativeValue={ false }
          className='border-2 border-gray-700 rounded-lg w-1/4 text-black p-2'
        />
        <label htmlFor='period-length' className='text-xl font-semibold my-2'>
          Period (Years)
        </label>
        <input
          type='number'
          className='border-2 border-gray-700 rounded-lg w-1/4 text-black p-2'
          value={ period }
          onChange={ e  => setPeriod( parseInt( e.target.value )) }
        />
        <label htmlFor='start-date' className='text-xl font-semibold my-2'>
          Start Date
        </label>
        <input
          id='start-date'
          name='start-date'
          type='date'
          className='border-2 border-gray-700 rounded-lg w-1/4 text-black p-2'
          value={ startDate.toISODate() || '' }
          onChange={ e => setStartDate( DateTime.fromISO( e.target.value )) }
        />
        <button
          type='submit'
          className='p-3 rounded-lg bg-gray-700 font-bold text-xl w-1/4 mx-auto'
        >
          Create
        </button>
      </form>
    </div>
  )
}

export default CreateLoanForm