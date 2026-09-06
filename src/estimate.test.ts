import { describe, expect, it } from 'vitest'
import { calculateEstimate, formatArea, formatCurrency } from './estimate'

describe('calculateEstimate', () => {
  it('combines area, price per sqm and condition multiplier', () => {
    const result = calculateEstimate({
      area: 60,
      pricePerSqm: 520,
      conditionMultiplier: 1.18,
      weeksPerSqm: 0.14
    })

    expect(result.total).toBeCloseTo(36816)
    expect(result.perSqm).toBeCloseTo(613.6)
    expect(result.weeks).toBe(10)
  })

  it('clamps negative input and avoids invalid output', () => {
    expect(calculateEstimate({
      area: -60,
      pricePerSqm: -520,
      conditionMultiplier: -1,
      weeksPerSqm: -0.14
    })).toEqual({ total: 0, perSqm: 0, weeks: 1 })
  })
})

describe('formatters', () => {
  it('formats stable display values', () => {
    expect(formatCurrency(36816, 'en')).toContain('$36,816')
    expect(formatArea(60, 'uk')).toBe('60 м²')
    expect(formatArea(60, 'en')).toBe('60 m²')
  })
})
