import { DateTime } from 'luxon'

export type ApiLoan = {
  id: string
  amount: number
  principal: number
  interestRate: number
  period: number
  monthlyPayment: number
  totalPrincipalPaid: number
  totalInterestPaid: number
  startDate: string | null
}

export class Loan {
  id?: string
  amount: number
  principal: number
  interestRate: number
  period: number
  monthlyPayment: number
  totalPrincipalPaid: number
  totalInterestPaid: number
  startDate: DateTime | null

  constructor(
    amount: number,
    interestRate: number,
    period: number,
    startDate: DateTime | null
  ) {
    this.amount = amount
    this.principal = amount
    this.interestRate = interestRate
    this.period = period
    this.startDate = startDate
    this.totalPrincipalPaid = 0.0
    this.totalInterestPaid = 0.0
    this.monthlyPayment = this.calculateMonthlyPayment()
  }

  static fromApiLoan( apiLoan: ApiLoan ): Loan {
    return new this(
      apiLoan.amount,
      apiLoan.interestRate,
      apiLoan.period,
      ( apiLoan.startDate && DateTime.fromISO( apiLoan.startDate )) || null
    )
  }

  toApiLoan(): ApiLoan {
    return {
      id: this.id || '',
      amount: this.amount,
      principal: this.principal,
      interestRate: this.interestRate,
      period: this.period,
      monthlyPayment: this.monthlyPayment,
      totalPrincipalPaid: this.totalPrincipalPaid,
      totalInterestPaid: this.totalInterestPaid,
      startDate: ( this.startDate && this.startDate.toISODate()) || null,
    }
  }

  calculateMonthlyPayment(): number {
    const i = ( this.interestRate / 100 ) / 12
    const n = this.period * 12

    return this.amount * (( i * Math.pow(( 1 + i ), n )) / ( Math.pow(( 1 + i ), n ) - 1 ))
  }

  principalPayment(): number {
    return this.monthlyPayment - this.interestPayment()
  }

  interestPayment(): number {
    return this.principal * ( this.interestRate / 100 ) / 12
  }

  makePayment( customPayment: number | undefined = undefined ): Payment {
    if( this.principal <= 0.0 ) {
      return {
        amount: 0.0,
        principal: 0.0,
        interest: 0.0,
        note: 'Loan has been paid off',
        type: PaymentType.Payoff,
      }
    }

    let pmtAmount = customPayment ?? this.monthlyPayment

    const interestPayment = this.interestPayment()
    if( pmtAmount <= interestPayment ) {
      this.totalInterestPaid += pmtAmount

      return {
        amount: pmtAmount,
        principal: 0.0,
        interest: pmtAmount,
        note: 'Payment is less than interest',
        type: PaymentType.InterestOnly,
      }
    } else {
      this.totalInterestPaid += interestPayment
    }

    let principalPayment = pmtAmount - interestPayment
    if( principalPayment > this.principal ) {
      principalPayment = this.principal
    }

    this.principal -= principalPayment
    this.totalPrincipalPaid += principalPayment

    return {
      amount: pmtAmount,
      principal: principalPayment,
      interest: interestPayment,
      note: customPayment ? 'Custom payment' : 'Monthly payment',
      type: customPayment ? PaymentType.Custom : PaymentType.Monthly,
    }
  }

  amortizationSchedule(): Payment[] {
    const schedule: Payment[] = []
    const oPrincipal = this.principal

    for( let i = 1; i <= this.period * 12; i++ ) {
      schedule.push( this.makePayment())
      if( this.principal <= 0.0 ) {
        break
      }
    }

    this.principal = oPrincipal
    this.totalPrincipalPaid = 0.0
    this.totalInterestPaid = 0.0

    return schedule
  }
}

export type Payment = {
  amount: number
  principal: number
  interest: number
  note: string
  type: PaymentType
}

export enum PaymentType {
  Custom = 'custom',
  Monthly = 'monthly',
  InterestOnly = 'interest-only',
  Payoff = 'payoff'
}