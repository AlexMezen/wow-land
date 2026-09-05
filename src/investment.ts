export type ProjectionInput = {
  principal: number
  months: number
  annualYieldPercent: number
  annualAppreciationPercent: number
}

export type Projection = {
  rentalIncome: number
  appreciation: number
  profit: number
  projectedValue: number
  roiPercent: number
}

export const calculateProjection = ({
  principal,
  months,
  annualYieldPercent,
  annualAppreciationPercent
}: ProjectionInput): Projection => {
  const safePrincipal = Math.max(0, principal)
  const safeMonths = Math.max(0, months)
  const years = safeMonths / 12
  const rentalIncome = safePrincipal * (Math.max(0, annualYieldPercent) / 100) * years
  const appreciation = safePrincipal * ((1 + Math.max(0, annualAppreciationPercent) / 100) ** years - 1)
  const profit = rentalIncome + appreciation
  const projectedValue = safePrincipal + profit
  const roiPercent = safePrincipal > 0 ? (profit / safePrincipal) * 100 : 0

  return { rentalIncome, appreciation, profit, projectedValue, roiPercent }
}

export const formatCurrency = (value: number, locale: 'uk' | 'en'): string =>
  new Intl.NumberFormat(locale === 'uk' ? 'uk-UA' : 'en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  }).format(value)

export const formatPercent = (value: number): string => `${value.toFixed(1)}%`
