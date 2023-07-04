'use client'
import React, { useState, useMemo } from 'react'
import { DateTime } from 'luxon'
import CurrencyInput from 'react-currency-input-field'

import { Loan } from '@/types/loan'

const CreateLoanForm: React.FC = () => {
  const [ amount, setAmount ] = useState<number>( 0 )
  const [ interestRate, setInterestRate ] = useState<number>( 0.0 )
  const [ period, setPeriod ] = useState<number>( 0 )
  const [ startDate, setStartDate ] = useState<DateTime>( DateTime.now())
  const [ loan, setLoan ] = useState<Loan | null>( null )

  const estimatedValues = useMemo((): {
    totalPaid: number
    totalInterestPaid: number
  } => {
    const totalPaid = ( loan && loan.calculateMonthlyPayment() || 0 ) * period * 12
    const totalInterestPaid = totalPaid - ( loan && loan.amount || 0 )

    return {
      totalPaid,
      totalInterestPaid,
    }
  }, [ loan, period ])

  const onSubmit = ( e: React.FormEvent<HTMLFormElement> ) => {
    e.preventDefault()

    setLoan( new Loan( amount, interestRate, period, startDate ))
  }

  const onReset = () => {
    setAmount( 0 )
    setInterestRate( 0.0 )
    setPeriod( 0 )
    setStartDate( DateTime.now())
    setLoan( null )
  }

  return (
    <div className='border-2 border-gray-700 rounded-lg w-1/3'>
      <h1 className='text-center font-semibold my-2 text-2xl'>Create New Loan</h1>
      <form className='flex flex-col p-3' onSubmit={ onSubmit }>
        <div className='flex flex-row'>
          <div className='flex flex-col w-1/2'>
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
              className='border-2 border-gray-700 rounded-lg w-1/2 text-black p-2 bg-gray-700 text-white'
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
              className='border-2 border-gray-700 rounded-lg w-1/2 text-black p-2 bg-gray-700 text-white'
            />
            <label htmlFor='period-length' className='text-xl font-semibold my-2'>
              Period (Years)
            </label>
            <input
              type='number'
              className='border-2 border-gray-700 rounded-lg w-1/2 text-black p-2 bg-gray-700 text-white'
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
              className='border-2 border-gray-700 rounded-lg w-1/2 text-black p-2 bg-gray-700 text-white'
              value={ startDate.toISODate() || '' }
              onChange={ e => setStartDate( DateTime.fromISO( e.target.value )) }
            />
          </div>
          <div className='w-1/2'>
            <h2 className='text-xl font-regular my-2'>
              Estimated Monthly Payment: <span className='font-semibold'>${ ( loan && loan.calculateMonthlyPayment() || 0 ).toFixed( 2 ) }</span>
            </h2>
            <h2 className='text-xl font-regular my-2'>
              Estimated Total Interest Paid: <span className='font-semibold'>${ estimatedValues.totalInterestPaid.toFixed( 2 ) }</span>
            </h2>
            <h2 className='text-xl font-regular my-2'>
              Estimated Total Paid: <span className='font-semibold'>${ estimatedValues.totalPaid.toFixed( 2 ) }</span>
            </h2>
          </div>
        </div>
        <div className='flex flex-row w-full space-between mt-5'>
          <button
            type='submit'
            className='p-3 rounded-lg bg-gray-700 font-bold text-xl w-1/4 mx-auto'
          >
            Calculate
          </button>
          <button
            className='p-3 rounded-lg bg-gray-700 font-bold text-xl w-1/4 mx-auto'
            onClick={ e => onReset() }
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  )
}

export default CreateLoanForm