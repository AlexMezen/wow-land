type AnalyticsEvent =
  | 'cta_click'
  | 'calculator_change'
  | 'form_submit'
  | 'language_change'
  | 'messenger_select'

type EventPayload = Record<string, string | number | boolean>

type GtagFn = (...args: unknown[]) => void

type FbqFn = ((...args: unknown[]) => void) & {
  queue?: unknown[]
  loaded?: boolean
  version?: string
  push?: FbqFn
}

type ClarityFn = ((...args: unknown[]) => void) & { q?: unknown[] }

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: GtagFn
    fbq?: FbqFn
    clarity?: ClarityFn
  }
}

const GA_ID = import.meta.env.VITE_GA_ID as string | undefined
const META_PIXEL_ID = import.meta.env.VITE_META_PIXEL_ID as string | undefined
const CLARITY_ID = import.meta.env.VITE_CLARITY_ID as string | undefined

const isConfigured = (id: string | undefined): boolean =>
  Boolean(id) && !/X{5,}/i.test(id ?? '')

const injectScript = (src: string): void => {
  const script = document.createElement('script')
  script.async = true
  script.src = src
  document.head.appendChild(script)
}

const initGoogleAnalytics = (): void => {
  if (!isConfigured(GA_ID) || window.gtag) return
  window.dataLayer = window.dataLayer || []
  window.gtag = (...args: unknown[]) => {
    window.dataLayer?.push(args)
  }
  window.gtag('js', new Date())
  window.gtag('config', GA_ID)
  injectScript(`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`)
}

const initMetaPixel = (): void => {
  if (!isConfigured(META_PIXEL_ID) || window.fbq) return
  const fbq = ((...args: unknown[]) => {
    fbq.queue?.push(args)
  }) as FbqFn
  fbq.queue = []
  fbq.loaded = true
  fbq.version = '2.0'
  fbq.push = fbq
  window.fbq = fbq
  injectScript('https://connect.facebook.net/en_US/fbevents.js')
  fbq('init', META_PIXEL_ID)
  fbq('track', 'PageView')
}

const initClarity = (): void => {
  if (!isConfigured(CLARITY_ID)) return
  if (!window.clarity) {
    const clarity = ((...args: unknown[]) => {
      clarity.q?.push(args)
    }) as ClarityFn
    clarity.q = []
    window.clarity = clarity
  }
  injectScript(`https://www.clarity.ms/tag/${CLARITY_ID}`)
}

export const initAnalytics = (): void => {
  window.dataLayer = window.dataLayer || []
  initGoogleAnalytics()
  initMetaPixel()
  initClarity()
}

export const track = (event: AnalyticsEvent, payload: EventPayload = {}): void => {
  window.dataLayer?.push({ event, ...payload })
  window.gtag?.('event', event, payload)
  window.fbq?.('trackCustom', event, payload)
  window.clarity?.('event', event)
  window.dispatchEvent(new CustomEvent('elitstroy:analytics', { detail: { event, payload } }))
}
