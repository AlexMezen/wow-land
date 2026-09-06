export type EstimateInput = {
  area: number
  pricePerSqm: number
  conditionMultiplier: number
  weeksPerSqm: number
}

export type Estimate = {
  total: number
  perSqm: number
  weeks: number
}

export const calculateEstimate = ({
  area,
  pricePerSqm,
  conditionMultiplier,
  weeksPerSqm
}: EstimateInput): Estimate => {
  const safeArea = Math.max(0, area)
  const safePrice = Math.max(0, pricePerSqm)
  const safeMultiplier = Math.max(0, conditionMultiplier)
  const total = safeArea * safePrice * safeMultiplier
  const perSqm = safeArea > 0 ? total / safeArea : 0
  const weeks = Math.max(1, Math.ceil(safeArea * Math.max(0, weeksPerSqm) * safeMultiplier))

  return { total, perSqm, weeks }
}

export const formatCurrency = (value: number, locale: 'uk' | 'en'): string =>
  new Intl.NumberFormat(locale === 'uk' ? 'uk-UA' : 'en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  }).format(value)

export const formatArea = (value: number, locale: 'uk' | 'en'): string =>
  `${new Intl.NumberFormat(locale === 'uk' ? 'uk-UA' : 'en-US', { maximumFractionDigits: 0 }).format(value)} ${locale === 'uk' ? 'м²' : 'm²'}`
