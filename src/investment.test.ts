import { describe, expect, it } from 'vitest'
import { calculateProjection, formatCurrency, formatPercent } from './investment'

describe('calculateProjection', () => {
  it('combines rental income and compounded appreciation', () => {
    const result = calculateProjection({
      principal: 100000,
      months: 24,
      annualYieldPercent: 10,
      annualAppreciationPercent: 5
    })

    expect(result.rentalIncome).toBe(20000)
    expect(result.appreciation).toBeCloseTo(10250)
    expect(result.profit).toBeCloseTo(30250)
    expect(result.projectedValue).toBeCloseTo(130250)
    expect(result.roiPercent).toBeCloseTo(30.25)
  })

  it('clamps negative input and avoids invalid output', () => {
    expect(calculateProjection({
      principal: -100,
      months: -12,
      annualYieldPercent: -3,
      annualAppreciationPercent: -4
    })).toEqual({ rentalIncome: 0, appreciation: 0, profit: 0, projectedValue: 0, roiPercent: 0 })
  })
})

describe('formatters', () => {
  it('formats stable display values', () => {
    expect(formatCurrency(150000, 'en')).toContain('$150,000')
    expect(formatPercent(18.25)).toBe('18.3%')
  })
})
