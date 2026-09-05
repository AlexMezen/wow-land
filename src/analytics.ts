type AnalyticsEvent =
  | 'cta_click'
  | 'calculator_change'
  | 'form_submit'
  | 'language_change'
  | 'messenger_select'

type EventPayload = Record<string, string | number | boolean>

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>
  }
}

export const track = (event: AnalyticsEvent, payload: EventPayload = {}): void => {
  if (Array.isArray(window.dataLayer)) {
    window.dataLayer.push({ event, ...payload })
  }
  window.dispatchEvent(new CustomEvent('cottage-invest:analytics', { detail: { event, payload } }))
}
