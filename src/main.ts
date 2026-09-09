import './styles.css'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { content, loadContent, type Locale, type SiteCopy } from './content'
import { calculateEstimate, formatArea, formatCurrency } from './estimate'
import { initAnalytics, track } from './analytics'

gsap.registerPlugin(ScrollTrigger)
ScrollTrigger.config({ ignoreMobileResize: true })

const app = document.querySelector<HTMLElement>('#app')
const loader = document.querySelector<HTMLElement>('#loader')

if (!app) throw new Error('Application root is missing')

const LEADS_ENDPOINT = '/api/leads'
const LEADS_STORAGE_KEY = 'elitstroy-leads'
const LEADS_ENDPOINT_KEY = 'elitstroy-leads-endpoint'

type Lead = {
  id: string
  ts: number
  locale: Locale
  name: string
  contact: string
  interest: string
  messenger: string
}

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
let viewportWidth = window.innerWidth
const syncViewportHeight = (force = false): void => {
  if (!force && Math.abs(window.innerWidth - viewportWidth) < 60) return
  viewportWidth = window.innerWidth
  const height = window.visualViewport?.height ?? window.innerHeight
  document.documentElement.style.setProperty('--vh', `${height / 100}px`)
}
syncViewportHeight(true)
window.addEventListener('resize', () => syncViewportHeight(), { passive: true })
window.addEventListener('orientationchange', () => window.setTimeout(() => {
  syncViewportHeight(true)
  ScrollTrigger.refresh()
}, 280))
let locale: Locale = localStorage.getItem('elitstroy-locale') === 'en' ? 'en' : 'uk'
let siteContent: Record<Locale, SiteCopy> = content
let cleanPage = (): void => undefined
let loaderDismissed = false

const arrowIcon = '<svg viewBox="0 0 20 20" aria-hidden="true"><path d="M4 10h11M11 5l5 5-5 5"/></svg>'
const cornerIcon = '<svg viewBox="0 0 20 20" aria-hidden="true"><path d="M5 15 15 5M7 5h8v8"/></svg>'
const checkIcon = '<svg viewBox="0 0 20 20" aria-hidden="true"><path d="m4 10 4 4 8-9"/></svg>'
const telegramIcon = '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M23.91 3.79 20.3 20.84c-.25 1.21-.98 1.5-2 .94l-5.5-4.07-2.66 2.57c-.3.3-.55.56-1.1.56-.72 0-.6-.27-.84-.95L6.3 13.7l-5.45-1.7c-1.18-.35-1.19-1.16.26-1.75l21.26-8.2c.97-.43 1.9.24 1.53 1.73z"/></svg>'
const whatsappIcon = '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12.04 2a9.9 9.9 0 0 0-8.4 15.2L2 22l4.9-1.6A9.9 9.9 0 1 0 12.04 2Zm0 1.8a8.1 8.1 0 1 1-4.1 15.1l-.3-.2-2.9 1 1-2.8-.2-.3A8.1 8.1 0 0 1 12.04 3.8Zm-3.3 3.6c-.2 0-.5 0-.7.3-.2.3-.9.9-.9 2.1s.9 2.4 1 2.6c.2.2 1.8 2.9 4.5 3.9 2.2.9 2.7.7 3.2.7.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.3-.2-.6-.3l-2-1c-.3-.1-.5-.2-.7.1l-1 1.2c-.2.2-.4.2-.6.1a8 8 0 0 1-2.4-1.5 8.8 8.8 0 0 1-1.6-2c-.2-.3 0-.5.1-.6l.5-.6c.2-.2.2-.3.3-.5.1-.2 0-.4 0-.6l-.9-2c-.2-.5-.4-.4-.6-.4h-.6Z"/></svg>'
const viberIcon = '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 2C6.5 2 2 5.9 2 10.7c0 2.6 1.3 4.9 3.4 6.5v4.3l3.9-2.1c.9.2 1.8.3 2.7.3 5.5 0 10-3.9 10-8.9S17.5 2 12 2Zm.2 2c1.9 0 3.8.6 5.2 1.9a6.7 6.7 0 0 1 2.3 5.2c0 1.9-.8 3.7-2.3 5a7.6 7.6 0 0 1-5.2 1.8l-.8-.1-2.4 1.3v-2.3l-.6-.4A6.6 6.6 0 0 1 5.3 11c0-1.9.8-3.7 2.3-5A7.6 7.6 0 0 1 12.2 4Zm-2.5 2.7c-.2 0-.5.1-.7.4-.3.3-.8.9-.8 1.9 0 1 .7 2 .8 2.2.1.2 1.4 2.3 3.5 3.1 1.7.7 2.1.6 2.5.5.5 0 1.1-.5 1.3-1 .2-.4.2-.8.1-.9l-1.5-.7c-.2-.1-.4-.1-.5.1l-.7.9c-.1.2-.3.2-.5.1a6.3 6.3 0 0 1-1.8-1.2 6.7 6.7 0 0 1-1.2-1.6c-.1-.2 0-.4.1-.5l.4-.5c.1-.2.2-.3.2-.5l-.7-1.7c-.1-.3-.3-.3-.5-.3h-.3Z"/></svg>'
const starIcon = '<svg viewBox="0 0 20 20" aria-hidden="true"><path fill="currentColor" d="m10 1.7 2.55 5.17 5.7.83-4.12 4.02.97 5.67L10 14.71l-5.1 2.68.97-5.67L1.75 7.7l5.7-.83L10 1.7Z"/></svg>'

const asset = (path: string): string => {
  if (/^(https?:)?\/\//.test(path) || path.startsWith(import.meta.env.BASE_URL)) return path
  return `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`
}

const brand = (copy: SiteCopy): string => `
  <a class="brand" href="#top" aria-label="${copy.metaTitle}">
    <img src="${asset(copy.brand.image)}" alt="" width="42" height="42" decoding="async">
    <span><b>${copy.brand.top}</b><b>${copy.brand.bottom}</b></span>
  </a>
`

const buttonLink = (href: string, label: string, variant = 'button--primary'): string => `
  <a class="button ${variant}" href="${href}" data-track="${label}">
    <span>${label}</span>${arrowIcon}
  </a>
`

const ctaBanner = (
  banner: { eyebrow: string; title: string; text?: string; button: string },
  href: string,
  variant = ''
): string => `
  <aside class="cta-banner ${variant} reveal">
    <div class="cta-banner__copy">
      <p class="eyebrow">${banner.eyebrow}</p>
      <h3>${banner.title}</h3>
      ${banner.text ? `<p>${banner.text}</p>` : ''}
    </div>
    ${buttonLink(href, banner.button)}
  </aside>
`

const createMarkup = (copy: SiteCopy): string => {
  const renovationCards = copy.estimate.renovationTypes.map((type) => `
    <button class="strategy-card${type.id === 'turnkey' ? ' is-active' : ''}" type="button" data-renovation="${type.id}" data-price="${type.pricePerSqm}" data-weeks="${type.weeksPerSqm}" aria-pressed="${type.id === 'turnkey'}">
      <span class="strategy-card__radio"></span>
      <span><b>${type.name}</b><small>${type.description}</small></span>
      <strong>$${type.pricePerSqm}/${copy.estimate.areaUnit}</strong>
    </button>
  `).join('')
  const conditionButtons = copy.estimate.conditions.map((condition, index) => `
    <button type="button" data-condition="${condition.id}" data-multiplier="${condition.multiplier}"${index === 1 ? ' class="is-active"' : ''}>${condition.name}</button>
  `).join('')

  const galleryItems = copy.gallery.items.map((item) => `
    <article class="gallery-card">
      <div class="gallery-card__media"><img src="${item.image}" alt="${item.title}" loading="lazy" decoding="async" width="1280" height="860"></div>
      <div class="gallery-card__meta">
        <span>${item.index} / ${String(copy.gallery.items.length).padStart(2, '0')}</span>
        <div><p>${item.tag}</p><h3>${item.title}</h3><small>${item.location}</small></div>
      </div>
    </article>
  `).join('')
  const faqItems = copy.faq.items.map((item, index) => `
    <article class="faq-item${index === 0 ? ' is-open' : ''}">
      <button type="button" aria-expanded="${index === 0}">
        <span>${String(index + 1).padStart(2, '0')}</span><strong>${item.question}</strong><i></i>
      </button>
      <div class="faq-item__answer"><p>${item.answer}</p></div>
    </article>
  `).join('')
  const messengerIcon = (type: string): string => {
    if (type === 'Telegram') return telegramIcon
    if (type === 'WhatsApp') return whatsappIcon
    return viberIcon
  }

  const testimonialSlides = copy.testimonials.items.map((item, index) => {
    const rating = Math.max(0, Math.min(5, Math.round(item.rating)))
    const stars = Array.from({ length: 5 }, (_, star) => `<span class="${star < rating ? 'is-filled' : ''}">${starIcon}</span>`).join('')
    const monogram = Array.from(item.author.trim())[0]?.toUpperCase() ?? 'E'
    const messengerClass = `testimonial-slide__messenger--${item.messenger.toLowerCase()}`
    const slideAria = locale === 'uk' ? `${index + 1} з ${copy.testimonials.items.length}` : `${index + 1} of ${copy.testimonials.items.length}`
    return `
      <div class="testimonial-slide${index === 0 ? ' is-active' : ''}" data-index="${index}" role="group" aria-roledescription="slide" aria-label="${slideAria}">
        <article class="testimonial-card">
          <div class="testimonial-card__header">
            <div class="testimonial-card__author">
              <span class="testimonial-card__avatar">${monogram}</span>
              <div>
                <strong>${item.author}</strong>
                <small>${item.role}</small>
              </div>
            </div>
            <div class="testimonial-card__meta">
              <span class="testimonial-slide__messenger ${messengerClass}">
                ${messengerIcon(item.messenger)}
                <span>${item.messenger}</span>
              </span>
              <div class="testimonial-card__rating" aria-label="${rating} / 5">${stars}</div>
            </div>
          </div>
          <div class="testimonial-card__screen">
            <img src="${asset(item.image)}" alt="${item.author} - ${item.messenger}" loading="lazy" decoding="async" width="480" height="850">
          </div>
        </article>
      </div>
    `
  }).join('')

  const testimonialDots = copy.testimonials.items.map((_, index) => `
    <button class="testimonials__dot${index === 0 ? ' is-active' : ''}" data-slide-to="${index}" type="button" aria-label="${locale === 'uk' ? `Перейти до відгуку ${index + 1}` : `Go to review ${index + 1}`}"></button>
  `).join('')

  const processSteps = copy.process.steps.map((step) => `
    <article class="process-step reveal">
      <div class="process-step__media">
        <img src="${step.image}" alt="${step.title}" loading="lazy" decoding="async" width="400" height="400">
        <span class="process-step__badge">${step.index}</span>
      </div>
      <div class="process-step__content">
        <h3>${step.title}</h3>
        <p>${step.body}</p>
      </div>
      ${cornerIcon}
    </article>
  `).join('')

  const interestOptions = copy.contact.fields.interestOptions.map((option) => `<option>${option}</option>`).join('')

  return `
    <div class="site-progress" aria-hidden="true"><span></span></div>
    <header class="site-header" id="site-header">
      <div class="site-header__inner">
        ${brand(copy)}
        <nav class="desktop-nav" aria-label="${locale === 'uk' ? 'Головна навігація' : 'Main navigation'}">
          <a href="#estimate">${copy.nav.estimate}</a>
          <a href="#process">${copy.nav.process}</a>
        </nav>
        <div class="header-actions">
          <div class="locale-switch" aria-label="Language">
            <button type="button" data-locale="uk" class="${locale === 'uk' ? 'is-active' : ''}" aria-pressed="${locale === 'uk'}">UA</button>
            <i></i>
            <button type="button" data-locale="en" class="${locale === 'en' ? 'is-active' : ''}" aria-pressed="${locale === 'en'}">EN</button>
          </div>
          <a class="header-cta" href="#contact" data-track="header-cta"><span>${copy.common.discuss}</span>${arrowIcon}</a>
          <button class="menu-toggle" type="button" aria-label="Menu" aria-expanded="false"><i></i><i></i></button>
        </div>
      </div>
      <div class="mobile-menu" aria-hidden="true">
        <nav>
          <a href="#estimate"><span>01</span>${copy.nav.estimate}</a>
          <a href="#process"><span>02</span>${copy.nav.process}</a>
          <a href="#contact"><span>03</span>${copy.nav.contact}</a>
        </nav>
        <p>Kharkiv · Ukraine · 49.9935° N</p>
      </div>
    </header>

    <main>
      <section class="hero scene-section" id="top" data-scene="hero">
        <div class="hero__media" aria-hidden="true">
          <img class="hero__photo" src="${copy.hero.image}" alt="" width="1920" height="1080" fetchpriority="high" decoding="async">
          <img class="hero__photo-focus" src="${copy.hero.image}" alt="" width="1920" height="1080" fetchpriority="high" decoding="async">
          <div class="hero__media-tint"></div>
        </div>
        <div class="hero__grid-lines" aria-hidden="true"><i></i><i></i><i></i><i></i></div>
        <div class="container hero__content">
          <div class="hero__topline hero-animate">
            <p class="eyebrow"><span></span>${copy.hero.eyebrow}</p>
            <p class="hero__availability">${copy.hero.availability}<i></i></p>
          </div>
          <div class="hero__title-wrap">
            <p class="hero__model hero-animate">${copy.hero.model}</p>
            <h1><span class="hero-title-line">${copy.hero.titleTop}</span><span class="hero-title-line hero-title-line--accent">${copy.hero.titleAccent}</span></h1>
          </div>
          <div class="hero__bottom">
            <p class="hero__lead hero-animate">${copy.hero.lead}</p>
            <div class="hero__actions hero-animate">
              ${buttonLink('#contact', copy.hero.primary)}
              ${buttonLink('#estimate', copy.hero.secondary, 'button--ghost')}
            </div>
          </div>
          <div class="hero__stats hero-animate">
            ${copy.hero.stats.map((stat) => `<div><strong>${stat.value}</strong><span>${stat.label}</span></div>`).join('')}
          </div>
        </div>
        <div class="scroll-cue"><i></i><span>${copy.hero.scroll}</span></div>
        <div class="scene-index"><span>CGI · 001</span><span>49.9935° N · 36.2304° E</span></div>
      </section>

      <section class="packages" id="packages" data-scene="hidden">
        <div class="container">
          <div class="section-head reveal">
            <p class="eyebrow"><span>01</span>${copy.packages.eyebrow}</p>
            <p class="section-index">PACKAGES / FIXED PRICE</p>
          </div>
          <div class="packages__heading">
            <h2 class="display-title split-reveal">${copy.packages.title}</h2>
            <p class="reveal">${copy.packages.intro}</p>
          </div>
          <div class="packages__grid">
            ${copy.packages.items.map((pkg, index) => `
              <article class="package-card${index === 1 ? ' package-card--featured' : ''} reveal">
                <div class="package-card__head">
                  <span class="package-card__badge">${pkg.badge}</span>
                  <h3>${pkg.name}</h3>
                </div>
                <div class="package-card__price">
                  <strong>${pkg.pricePerSqm}</strong>
                  <span>${pkg.timeline}</span>
                  <small>${pkg.guarantee}</small>
                </div>
                <p class="package-card__desc">${pkg.description}</p>
                <ul class="package-card__features">
                  ${pkg.features.map((feature) => `<li>${feature}</li>`).join('')}
                </ul>
                ${buttonLink('#estimate', pkg.cta, index === 1 ? '' : 'button--ghost')}
              </article>
            `).join('')}
          </div>
        </div>
      </section>

      <section class="gallery" id="gallery" data-scene="hidden">
        <div class="container gallery__heading">
          <div class="section-head section-head--dark reveal">
            <p class="eyebrow"><span>02</span>${copy.gallery.eyebrow}</p>
            <p class="section-index">COLLECTION / 01—06</p>
          </div>
          <div class="gallery__intro">
            <h2 class="display-title split-reveal">${copy.gallery.title}</h2>
            <p class="reveal">${copy.gallery.intro}</p>
          </div>
        </div>
        <div class="gallery__pin">
          <div class="gallery__track">${galleryItems}</div>
          <div class="gallery__status"><span>${copy.gallery.cue}</span><div><i></i></div><b id="gallery-current">01</b></div>
        </div>
      </section>

      <div class="container">
        ${ctaBanner(copy.cta.galleryBanner, '#contact', 'cta-banner--gold')}
      </div>

      <section class="investment" id="estimate" data-scene="hidden">
        <div class="container">
          <div class="section-head reveal">
            <p class="eyebrow"><span>03</span>${copy.estimate.eyebrow}</p>
            <p class="section-index">ESTIMATE / COST—SIMULATION</p>
          </div>
          <div class="investment__heading">
            <h2 class="display-title split-reveal">${copy.estimate.title}</h2>
            <p class="reveal">${copy.estimate.intro}</p>
          </div>
          <div class="calculator reveal" id="calculator">
            <div class="calculator__controls">
              <div class="control-group">
                <div class="control-label"><label for="area">${copy.estimate.area}</label><output id="area-display">60 ${copy.estimate.areaUnit}</output></div>
                <input id="area" type="range" min="20" max="200" step="5" value="60" aria-label="${copy.estimate.area}">
                <div class="range-limits"><span>20 ${copy.estimate.areaUnit}</span><span>200 ${copy.estimate.areaUnit}</span></div>
              </div>
              <fieldset class="control-group">
                <legend>${copy.estimate.condition}</legend>
                <div class="term-buttons">${conditionButtons}</div>
              </fieldset>
              <fieldset class="control-group strategy-group">
                <legend>${copy.estimate.renovation}</legend>
                <div class="strategy-list">${renovationCards}</div>
              </fieldset>
            </div>
            <div class="calculator__result">
              <div class="result-head"><p class="eyebrow">${copy.estimate.estimateLabel}</p><span>USD · DEMO</span></div>
              <div class="roi-orbit" id="roi-orbit">
                <div><small>${copy.estimate.total}</small><strong id="total-result">$31,200</strong><span id="orbit-context">60 ${copy.estimate.areaUnit}</span></div>
                <i></i><i></i><i></i>
              </div>
              <dl class="result-list">
                <div><dt>${copy.estimate.area}</dt><dd id="area-result">60 ${copy.estimate.areaUnit}</dd></div>
                <div><dt>${copy.estimate.perSqm}</dt><dd id="per-sqm-result">$520</dd></div>
                <div><dt>${copy.estimate.timeline}</dt><dd id="weeks-result">9–11 ${copy.estimate.weeksUnit}</dd></div>
              </dl>
            </div>
          </div>
          <p class="calculator-disclaimer reveal"><span>i</span>${copy.estimate.disclaimer}</p>
          ${ctaBanner(copy.cta.estimateBanner, '#contact')}
        </div>
      </section>

      <section class="process" id="process" data-scene="hidden">
        <div class="container">
          <div class="section-head section-head--dark reveal">
            <p class="eyebrow"><span>04</span>${copy.process.eyebrow}</p>
            <p class="section-index">DELIVERY / 01—04</p>
          </div>
          <div class="process__heading">
            <h2 class="display-title split-reveal">${copy.process.title}</h2>
            <p class="reveal">${copy.process.intro}</p>
          </div>
          <div class="process__steps">${processSteps}</div>
          <div class="trust-panel reveal">
            <div class="trust-panel__visual">
              <img class="trust-panel__img" src="${copy.process.trustImage}" alt="${copy.process.trustBadge}" loading="lazy" decoding="async" width="800" height="600">
              <div class="trust-panel__overlay"></div>
              <div class="trust-panel__tag">
                <span class="live-dot"></span>
                <p>${copy.process.trustBadge}</p>
              </div>
            </div>
            <div class="trust-panel__copy">
              <p class="eyebrow">TRANSPARENCY</p>
              <h3>${copy.process.trustTitle}</h3>
              <p>${copy.process.trustBody}</p>
              <ul>${copy.process.trustItems.map((item) => `<li>${checkIcon}<span>${item}</span></li>`).join('')}</ul>
            </div>
          </div>
          ${ctaBanner(copy.cta.processBanner, '#contact')}
        </div>
      </section>

      <section class="faq" id="faq" data-scene="hidden">
        <div class="container">
          <div class="section-head reveal">
            <p class="eyebrow"><span>05</span>${copy.faq.eyebrow}</p>
            <p class="section-index">FAQ / CLEAR ANSWERS</p>
          </div>
          <div class="faq__layout">
            <div class="faq__heading"><h2 class="display-title split-reveal">${copy.faq.title}</h2><p class="reveal">${copy.faq.lead}</p></div>
            <div class="faq__items">${faqItems}</div>
          </div>
          ${ctaBanner(copy.cta.faqBanner, '#contact')}
        </div>
      </section>

      <section class="testimonials" id="testimonials" data-scene="hidden">
        <div class="container">
          <div class="section-head section-head--dark reveal">
            <p class="eyebrow"><span>06</span>${copy.testimonials.eyebrow}</p>
            <p class="section-index">CLIENT VOICES / 01—${String(copy.testimonials.items.length).padStart(2, '0')}</p>
          </div>
          <div class="testimonials__heading">
            <h2 class="display-title split-reveal">${copy.testimonials.title}</h2>
            <p class="reveal">${copy.testimonials.lead}</p>
          </div>
          <div class="testimonials__slider-wrapper reveal">
            <div class="testimonials__slider" aria-live="polite">
              <div class="testimonials__track">${testimonialSlides}</div>
            </div>
            <div class="testimonials__controls">
              <div class="testimonials__dots">${testimonialDots}</div>
            </div>
          </div>
          ${ctaBanner(copy.cta.testimonialsBanner, '#estimate', 'cta-banner--paper')}
        </div>
      </section>

      <section class="contact" id="contact" data-scene="hidden">
        <div class="contact__grid" aria-hidden="true"></div>
        <div class="container">
          <div class="section-head section-head--dark reveal">
            <p class="eyebrow"><span>07</span>${copy.contact.eyebrow}</p>
            <p class="section-index">CONTACT / START HERE</p>
          </div>
          <div class="contact__heading">
            <h2 class="display-title split-reveal">${copy.contact.title}</h2>
            <p class="reveal">${copy.contact.lead}</p>
          </div>
          <div class="contact__layout">
            <div class="contact__details reveal">
              <div class="contact-detail"><span>${copy.contact.locationLabel}</span><strong>${copy.contact.location}</strong></div>
              <div class="contact-detail"><span>${copy.contact.scheduleLabel}</span><strong>${copy.contact.schedule}</strong></div>
              <div class="messenger-picker">
                <span>${copy.contact.messengers}</span>
                <div>
                  <button type="button" data-messenger="Telegram" class="is-active">TG</button>
                  <button type="button" data-messenger="WhatsApp">WA</button>
                  <button type="button" data-messenger="Viber">VB</button>
                </div>
              </div>
              <div class="map-card">
                <img class="map-card__bg" src="${copy.contact.mapImage}" alt="" loading="lazy" decoding="async" width="800" height="600">
                <iframe class="map-card__map" src="${copy.contact.mapEmbedUrl}" loading="lazy" title="${copy.contact.mapLabel}" referrerpolicy="no-referrer-when-downgrade" allowfullscreen></iframe>
                <div class="map-card__overlay"></div>
                <div class="map-pin"><span>KH</span><i></i></div>
                <div class="map-card__meta">
                  <p>${copy.contact.mapLabel}</p>
                  <small>49.9935° N · 36.2304° E</small>
                </div>
              </div>
            </div>
            <div class="form-card reveal">
              <form id="contact-form" novalidate>
                <div class="field" data-field="name">
                  <label for="name">${copy.contact.fields.name}</label>
                  <input id="name" name="name" type="text" autocomplete="name" placeholder="${copy.contact.fields.namePlaceholder}">
                  <span class="field__error"></span>
                </div>
                <div class="field" data-field="contact">
                  <label for="contact-value">${copy.contact.fields.contact}</label>
                  <input id="contact-value" name="contact" type="text" autocomplete="email" placeholder="${copy.contact.fields.contactPlaceholder}">
                  <span class="field__error"></span>
                </div>
                <div class="field">
                  <label for="interest">${copy.contact.fields.interest}</label>
                  <div class="select-wrap"><select id="interest" name="interest">${interestOptions}</select><i></i></div>
                </div>
                <label class="consent" data-field="consent">
                  <input type="checkbox" name="consent">
                  <span class="consent__box">${checkIcon}</span>
                  <span>${copy.contact.fields.consent}</span>
                  <small class="field__error"></small>
                </label>
                <input type="hidden" name="messenger" value="Telegram">
                <button class="submit-button" type="submit"><span>${copy.contact.fields.submit}</span>${arrowIcon}</button>
              </form>
              <div class="form-success" id="form-success" hidden>
                <div class="form-success__mark">${checkIcon}</div>
                <p class="eyebrow">REQUEST / DEMO</p>
                <h3>${copy.contact.successTitle}</h3>
                <p>${copy.contact.successBody}</p>
                <button type="button" id="form-reset">${copy.contact.successAgain}</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>

    <footer class="site-footer">
      <div class="container">
        <div class="footer__top">
          ${brand(copy)}
          <p>${copy.footer.line}</p>
          ${buttonLink('#contact', copy.footer.ctaButton)}
          <a href="#top" aria-label="Back to top">↑</a>
        </div>
        <div class="footer__bottom"><span>© ${copy.footer.rights}</span><span>${copy.footer.privacy}</span><span>KH · UA</span></div>
      </div>
    </footer>

    <nav class="mobile-cta-bar" aria-label="${locale === 'uk' ? 'Швидкі дії' : 'Quick actions'}">
      <a class="mobile-cta-bar__calculate" href="#estimate" data-track="mobile-${copy.cta.mobileBar.calculate}"><span>${copy.cta.mobileBar.calculate}</span>${arrowIcon}</a>
      <a class="mobile-cta-bar__write" href="#contact" data-track="mobile-${copy.cta.mobileBar.write}"><span>${copy.cta.mobileBar.write}</span>${arrowIcon}</a>
    </nav>

    <div class="messenger-fab" aria-label="Messengers">
      <a class="messenger-fab__btn" href="${copy.contact.telegram}" target="_blank" rel="noopener" data-fab-messenger="Telegram" aria-label="Telegram">${telegramIcon}</a>
      <a class="messenger-fab__btn" href="${copy.contact.whatsapp}" target="_blank" rel="noopener" data-fab-messenger="WhatsApp" aria-label="WhatsApp">${whatsappIcon}</a>
      <a class="messenger-fab__btn" href="${copy.contact.viber}" data-fab-messenger="Viber" aria-label="Viber">${viberIcon}</a>
    </div>
  `.replace(/src="\/(images|videos|brand-mark\.svg|favicon\.svg)\//g, `src="${import.meta.env.BASE_URL}$1/`)
}

const select = <T extends Element>(selector: string, root: ParentNode = document): T => {
  const element = root.querySelector<T>(selector)
  if (!element) throw new Error(`Element not found: ${selector}`)
  return element
}

const setupCalculator = (): (() => void) => {
  const area = select<HTMLInputElement>('#area')
  const areaDisplay = select<HTMLOutputElement>('#area-display')
  const totalResult = select<HTMLElement>('#total-result')
  const areaResult = select<HTMLElement>('#area-result')
  const perSqmResult = select<HTMLElement>('#per-sqm-result')
  const weeksResult = select<HTMLElement>('#weeks-result')
  const orbitContext = select<HTMLElement>('#orbit-context')
  const orbit = select<HTMLElement>('#roi-orbit')
  const conditionButtons = [...document.querySelectorAll<HTMLButtonElement>('[data-condition]')]
  const renovationButtons = [...document.querySelectorAll<HTMLButtonElement>('[data-renovation]')]
  let conditionMultiplier = 1.18
  let pricePerSqm = 520
  let weeksPerSqm = 0.14

  const update = (shouldTrack = true): void => {
    const areaValue = Number(area.value)
    const estimate = calculateEstimate({
      area: areaValue,
      pricePerSqm,
      conditionMultiplier,
      weeksPerSqm
    })
    const rangeProgress = ((areaValue - Number(area.min)) / (Number(area.max) - Number(area.min))) * 100
    area.style.setProperty('--range-progress', `${rangeProgress}%`)
    areaDisplay.value = formatArea(areaValue, locale)
    totalResult.textContent = formatCurrency(estimate.total, locale)
    areaResult.textContent = formatArea(areaValue, locale)
    perSqmResult.textContent = formatCurrency(estimate.perSqm, locale)
    weeksResult.textContent = `${estimate.weeks}–${estimate.weeks + 2} ${siteContent[locale].estimate.weeksUnit}`
    orbitContext.textContent = formatArea(areaValue, locale)
    orbit.style.setProperty('--roi-angle', `${Math.min(100, (estimate.perSqm / 650) * 100) * 3.6}deg`)
    if (!reducedMotion) {
      gsap.fromTo([totalResult, perSqmResult, weeksResult], { y: 5, opacity: 0.55 }, { y: 0, opacity: 1, duration: 0.28, stagger: 0.03 })
    }
    if (shouldTrack) track('calculator_change', { area: areaValue, pricePerSqm, conditionMultiplier })
  }

  const onArea = (): void => update(false)
  const onAreaChange = (): void => update(true)
  area.addEventListener('input', onArea)
  area.addEventListener('change', onAreaChange)

  conditionButtons.forEach((button) => {
    button.addEventListener('click', () => {
      conditionButtons.forEach((item) => item.classList.toggle('is-active', item === button))
      conditionMultiplier = Number(button.dataset.multiplier)
      update()
    })
  })

  renovationButtons.forEach((button) => {
    button.addEventListener('click', () => {
      renovationButtons.forEach((item) => {
        const active = item === button
        item.classList.toggle('is-active', active)
        item.setAttribute('aria-pressed', String(active))
      })
      pricePerSqm = Number(button.dataset.price)
      weeksPerSqm = Number(button.dataset.weeks)
      update()
    })
  })

  update(false)
  return () => {
    area.removeEventListener('input', onArea)
    area.removeEventListener('change', onAreaChange)
  }
}

const saveLead = (lead: Lead): void => {
  try {
    const stored = JSON.parse(localStorage.getItem(LEADS_STORAGE_KEY) ?? '[]') as Lead[]
    stored.unshift(lead)
    localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(stored.slice(0, 200)))
  } catch {
    localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify([lead]))
  }
  const endpoint = localStorage.getItem(LEADS_ENDPOINT_KEY) ?? LEADS_ENDPOINT
  if (endpoint) {
    const sameOrigin = endpoint.startsWith('/')
    void fetch(endpoint, sameOrigin ? {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(lead)
    } : {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(lead)
    }).catch(() => undefined)
  }
}

const setupForm = (copy: SiteCopy): (() => void) => {
  const form = select<HTMLFormElement>('#contact-form')
  const success = select<HTMLElement>('#form-success')
  const reset = select<HTMLButtonElement>('#form-reset')
  const messengerInput = select<HTMLInputElement>('input[name="messenger"]', form)
  const messengerButtons = [...document.querySelectorAll<HTMLButtonElement>('[data-messenger]')]

  const setError = (fieldName: 'name' | 'contact' | 'consent', message: string): void => {
    const field = select<HTMLElement>(`[data-field="${fieldName}"]`, form)
    field.classList.toggle('has-error', Boolean(message))
    select<HTMLElement>('.field__error', field).textContent = message
  }

  const validate = (): boolean => {
    const name = select<HTMLInputElement>('input[name="name"]', form).value.trim()
    const contactValue = select<HTMLInputElement>('input[name="contact"]', form).value.trim()
    const consent = select<HTMLInputElement>('input[name="consent"]', form).checked
    const contactValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactValue) || /^\+?[\d\s()-]{9,}$/.test(contactValue)
    setError('name', name ? '' : copy.contact.errors.required)
    setError('contact', contactValue ? (contactValid ? '' : copy.contact.errors.contact) : copy.contact.errors.required)
    setError('consent', consent ? '' : copy.contact.errors.consent)
    return Boolean(name && contactValid && consent)
  }

  const onSubmit = (event: SubmitEvent): void => {
    event.preventDefault()
    if (!validate()) return
    const lead: Lead = {
      id: `lead-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      ts: Date.now(),
      locale,
      name: select<HTMLInputElement>('input[name="name"]', form).value.trim(),
      contact: select<HTMLInputElement>('input[name="contact"]', form).value.trim(),
      interest: select<HTMLSelectElement>('#interest', form).value,
      messenger: messengerInput.value
    }
    saveLead(lead)
    track('form_submit', { messenger: lead.messenger, interest: lead.interest })
    form.hidden = true
    success.hidden = false
    if (!reducedMotion) gsap.fromTo(success, { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' })
  }

  const onReset = (): void => {
    form.reset()
    messengerInput.value = 'Telegram'
    messengerButtons.forEach((button, index) => button.classList.toggle('is-active', index === 0))
    success.hidden = true
    form.hidden = false
  }

  form.addEventListener('submit', onSubmit)
  reset.addEventListener('click', onReset)
  messengerButtons.forEach((button) => {
    button.addEventListener('click', () => {
      messengerButtons.forEach((item) => item.classList.toggle('is-active', item === button))
      messengerInput.value = button.dataset.messenger ?? 'Telegram'
      track('messenger_select', { messenger: messengerInput.value })
    })
  })

  return () => {
    form.removeEventListener('submit', onSubmit)
    reset.removeEventListener('click', onReset)
  }
}

const setupMessengerFab = (): (() => void) => {
  const links = [...document.querySelectorAll<HTMLAnchorElement>('[data-fab-messenger]')]
  const handlers = new Map<HTMLAnchorElement, () => void>()
  links.forEach((link) => {
    const handler = (): void => {
      track('messenger_select', { messenger: link.dataset.fabMessenger ?? '', source: 'fab' })
    }
    handlers.set(link, handler)
    link.addEventListener('click', handler)
  })
  return () => handlers.forEach((handler, link) => link.removeEventListener('click', handler))
}

const setupMobileCta = (): (() => void) => {
  const hero = select<HTMLElement>('.hero')
  const contact = select<HTMLElement>('.contact')
  let pastHero = false
  let reachedContact = false

  const update = (): void => {
    document.body.classList.toggle('has-cta-bar', pastHero && !reachedContact)
  }
  const sync = (): void => {
    pastHero = hero.getBoundingClientRect().bottom <= 0
    reachedContact = contact.getBoundingClientRect().top <= window.innerHeight * 0.9
    update()
  }
  const heroTrigger = ScrollTrigger.create({
    trigger: hero,
    start: 'bottom top',
    end: 'max',
    onEnter: () => {
      pastHero = true
      update()
    },
    onLeaveBack: () => {
      pastHero = false
      update()
    }
  })
  const contactTrigger = ScrollTrigger.create({
    trigger: contact,
    start: 'top 90%',
    end: 'max',
    onEnter: () => {
      reachedContact = true
      update()
    },
    onLeaveBack: () => {
      reachedContact = false
      update()
    }
  })
  const frame = requestAnimationFrame(sync)

  return () => {
    cancelAnimationFrame(frame)
    heroTrigger.kill()
    contactTrigger.kill()
    document.body.classList.remove('has-cta-bar')
  }
}

const setupFaq = (): (() => void) => {
  const items = [...document.querySelectorAll<HTMLElement>('.faq-item')]
  const handlers = new Map<HTMLButtonElement, () => void>()
  items.forEach((item) => {
    const button = select<HTMLButtonElement>('button', item)
    const handler = (): void => {
      const open = !item.classList.contains('is-open')
      items.forEach((entry) => {
        entry.classList.remove('is-open')
        select<HTMLButtonElement>('button', entry).setAttribute('aria-expanded', 'false')
      })
      item.classList.toggle('is-open', open)
      button.setAttribute('aria-expanded', String(open))
    }
    handlers.set(button, handler)
    button.addEventListener('click', handler)
  })
  return () => handlers.forEach((handler, button) => button.removeEventListener('click', handler))
}

const setupTestimonialsSlider = (): (() => void) => {
  const slider = document.querySelector<HTMLElement>('.testimonials__slider')
  const track = document.querySelector<HTMLElement>('.testimonials__track')
  const slides = [...document.querySelectorAll<HTMLElement>('.testimonial-slide')]
  const dots = [...document.querySelectorAll<HTMLButtonElement>('.testimonials__dot')]
  const wrapper = document.querySelector<HTMLElement>('.testimonials__slider-wrapper')

  if (!slider || !track || slides.length === 0) return () => undefined

  let currentIndex = 0
  let timer: number | undefined

  const getSlideWidth = (): number => {
    const first = slides[0]
    if (!first) return 340
    const style = window.getComputedStyle(track)
    const gap = parseFloat(style.gap) || 28
    return first.offsetWidth + gap
  }

  const getMaxIndex = (): number => {
    if (window.innerWidth <= 820) {
      return slides.length - 1
    }
    const slideWidth = getSlideWidth()
    if (slideWidth <= 0) return 0
    const visibleWidth = slider.offsetWidth
    const totalWidth = track.scrollWidth
    const maxScroll = Math.max(0, totalWidth - visibleWidth)
    return Math.max(0, Math.ceil(maxScroll / slideWidth))
  }

  const updateSlidePosition = (): void => {
    const isMobile = window.innerWidth <= 820
    const slideWidth = getSlideWidth()
    const maxScroll = Math.max(0, track.scrollWidth - slider.offsetWidth)
    const targetOffset = isMobile
      ? (slides[currentIndex]?.offsetLeft ?? currentIndex * slideWidth)
      : Math.min(currentIndex * slideWidth, maxScroll)
    track.style.transform = `translateX(-${targetOffset}px)`

    slides.forEach((slide, idx) => {
      slide.classList.toggle('is-active', idx === currentIndex)
    })

    dots.forEach((dot, idx) => {
      const active = idx === currentIndex
      dot.classList.toggle('is-active', active)
      dot.setAttribute('aria-current', String(active))
    })
  }

  const goToSlide = (index: number): void => {
    const max = getMaxIndex()
    if (index > max) {
      currentIndex = 0
    } else if (index < 0) {
      currentIndex = max
    } else {
      currentIndex = index
    }
    updateSlidePosition()
  }

  const startAutoplay = (): void => {
    stopAutoplay()
    timer = window.setInterval(() => {
      goToSlide(currentIndex + 1)
    }, 4200)
  }

  const stopAutoplay = (): void => {
    if (timer) {
      clearInterval(timer)
      timer = undefined
    }
  }

  dots.forEach((dot, idx) => {
    dot.addEventListener('click', () => {
      goToSlide(idx)
    })
  })

  const onMouseEnter = (): void => stopAutoplay()
  const onMouseLeave = (): void => startAutoplay()
  const onFocusIn = (): void => stopAutoplay()
  const onFocusOut = (): void => startAutoplay()

  wrapper?.addEventListener('mouseenter', onMouseEnter)
  wrapper?.addEventListener('mouseleave', onMouseLeave)
  wrapper?.addEventListener('focusin', onFocusIn)
  wrapper?.addEventListener('focusout', onFocusOut)

  let startX = 0
  let isDragging = false

  const onTouchStart = (e: TouchEvent): void => {
    stopAutoplay()
    startX = e.touches[0].clientX
  }

  const onTouchEnd = (e: TouchEvent): void => {
    const diff = startX - e.changedTouches[0].clientX
    if (Math.abs(diff) > 40) {
      if (diff > 0) goToSlide(currentIndex + 1)
      else goToSlide(currentIndex - 1)
    }
    window.setTimeout(startAutoplay, 2500)
  }

  slider.addEventListener('touchstart', onTouchStart, { passive: true })
  slider.addEventListener('touchend', onTouchEnd, { passive: true })

  const onPointerDown = (e: PointerEvent): void => {
    if (e.pointerType === 'touch') return
    startX = e.clientX
    isDragging = true
  }

  const onPointerUp = (e: PointerEvent): void => {
    if (!isDragging) return
    isDragging = false
    const diff = startX - e.clientX
    if (Math.abs(diff) > 50) {
      if (diff > 0) goToSlide(currentIndex + 1)
      else goToSlide(currentIndex - 1)
    }
  }

  slider.addEventListener('pointerdown', onPointerDown)
  window.addEventListener('pointerup', onPointerUp)

  const onResize = (): void => {
    updateSlidePosition()
  }
  window.addEventListener('resize', onResize, { passive: true })

  updateSlidePosition()
  startAutoplay()

  return () => {
    stopAutoplay()
    wrapper?.removeEventListener('mouseenter', onMouseEnter)
    wrapper?.removeEventListener('mouseleave', onMouseLeave)
    wrapper?.removeEventListener('focusin', onFocusIn)
    wrapper?.removeEventListener('focusout', onFocusOut)
    slider.removeEventListener('touchstart', onTouchStart)
    slider.removeEventListener('touchend', onTouchEnd)
    slider.removeEventListener('pointerdown', onPointerDown)
    window.removeEventListener('pointerup', onPointerUp)
    window.removeEventListener('resize', onResize)
  }
}

const setupPointerHud = (): (() => void) => {
  const x = document.querySelector<HTMLElement>('#stage-coordinate-x')
  const y = document.querySelector<HTMLElement>('#stage-coordinate-y')
  const hero = document.querySelector<HTMLElement>('.hero')
  const photo = document.querySelector<HTMLElement>('.hero__photo')
  const focus = document.querySelector<HTMLElement>('.hero__photo-focus')
  const photoX = photo ? gsap.quickTo(photo, 'xPercent', { duration: 1.3, ease: 'power3.out' }) : null
  const photoY = photo ? gsap.quickTo(photo, 'yPercent', { duration: 1.3, ease: 'power3.out' }) : null
  const focusX = focus ? gsap.quickTo(focus, 'xPercent', { duration: 1.05, ease: 'power3.out' }) : null
  const focusY = focus ? gsap.quickTo(focus, 'yPercent', { duration: 1.05, ease: 'power3.out' }) : null
  const onPointerMove = (event: PointerEvent): void => {
    if (x) x.textContent = (event.clientX / window.innerWidth).toFixed(2)
    if (y) y.textContent = (event.clientY / window.innerHeight).toFixed(2)
    if (!hero || hero.getBoundingClientRect().bottom <= 0) return
    const normalizedX = event.clientX / window.innerWidth - 0.5
    const normalizedY = event.clientY / window.innerHeight - 0.5
    photoX?.(normalizedX * -2.2)
    photoY?.(normalizedY * -1.5)
    focusX?.(normalizedX * 3.2)
    focusY?.(normalizedY * 2.2)
  }
  if (!reducedMotion) window.addEventListener('pointermove', onPointerMove, { passive: true })
  return () => window.removeEventListener('pointermove', onPointerMove)
}

const setupNavigation = (): (() => void) => {
  const header = select<HTMLElement>('#site-header')
  const menuToggle = select<HTMLButtonElement>('.menu-toggle')
  const mobileMenu = select<HTMLElement>('.mobile-menu')
  const mobileLinks = [...mobileMenu.querySelectorAll<HTMLAnchorElement>('a')]

  const closeMenu = (): void => {
    document.body.classList.remove('menu-open')
    menuToggle.setAttribute('aria-expanded', 'false')
    mobileMenu.setAttribute('aria-hidden', 'true')
  }

  const toggleMenu = (): void => {
    const open = !document.body.classList.contains('menu-open')
    document.body.classList.toggle('menu-open', open)
    menuToggle.setAttribute('aria-expanded', String(open))
    mobileMenu.setAttribute('aria-hidden', String(!open))
  }

  const onScroll = (): void => {
    header.classList.toggle('is-scrolled', window.scrollY > 28)
  }
  menuToggle.addEventListener('click', toggleMenu)
  mobileLinks.forEach((link) => link.addEventListener('click', closeMenu))
  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()

  document.querySelectorAll<HTMLAnchorElement>('[data-track]').forEach((link) => {
    link.addEventListener('click', () => track('cta_click', { label: link.dataset.track ?? 'cta', href: link.hash }))
  })

  return () => {
    menuToggle.removeEventListener('click', toggleMenu)
    mobileLinks.forEach((link) => link.removeEventListener('click', closeMenu))
    window.removeEventListener('scroll', onScroll)
  }
}

const setupAnimations = (): (() => void) => {
  const progress = select<HTMLElement>('.site-progress span')
  const context = gsap.context(() => {
    ScrollTrigger.create({
      start: 0,
      end: 'max',
      onUpdate: (self) => gsap.set(progress, { scaleX: self.progress })
    })

    const galleryTrack = document.querySelector<HTMLElement>('.gallery__track')
    const galleryStatus = document.querySelector<HTMLElement>('.gallery__status')
    const galleryCurrent = document.querySelector<HTMLElement>('#gallery-current')
    if (!reducedMotion && window.innerWidth > 820 && galleryTrack) {
      const getDistance = (): number => Math.max(0, galleryTrack.scrollWidth - window.innerWidth)
      gsap.to(galleryTrack, {
        x: () => -getDistance(),
        ease: 'none',
        scrollTrigger: {
          trigger: '.gallery__pin',
          start: 'top top',
          end: () => `+=${getDistance()}`,
          pin: true,
          scrub: 0.8,
          invalidateOnRefresh: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            galleryStatus?.style.setProperty('--gallery-progress', `${self.progress * 100}%`)
            if (galleryCurrent) galleryCurrent.textContent = String(Math.min(siteContent[locale].gallery.items.length, Math.floor(self.progress * siteContent[locale].gallery.items.length) + 1)).padStart(2, '0')
          }
        }
      })
    }

    if (!reducedMotion) {
      const mobile = window.innerWidth <= 820
      gsap.utils.toArray<HTMLElement>('.reveal').forEach((element) => {
        gsap.fromTo(element, { y: mobile ? 18 : 44, opacity: 0 }, {
          y: 0,
          opacity: 1,
          duration: mobile ? 0.45 : 0.9,
          ease: 'power3.out',
          scrollTrigger: { trigger: element, start: 'top 88%', once: true }
        })
      })
      gsap.utils.toArray<HTMLElement>('.split-reveal').forEach((element) => {
        gsap.fromTo(element, { clipPath: 'inset(0 0 100% 0)', y: mobile ? 12 : 30 }, {
          clipPath: 'inset(0 0 0% 0)',
          y: 0,
          duration: mobile ? 0.5 : 1.15,
          ease: 'power3.out',
          scrollTrigger: { trigger: element, start: 'top 84%', once: true }
        })
      })
      gsap.fromTo('.hero__photo', { scale: 1.06 }, {
        scale: 1.18,
        yPercent: 6,
        ease: 'none',
        scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 0.8 }
      })
      gsap.fromTo('.hero__photo-focus', { scale: 1.08 }, {
        scale: 1.24,
        yPercent: -3,
        ease: 'none',
        scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1.1 }
      })
      gsap.fromTo('.hero-title-line', { yPercent: 115 }, { yPercent: 0, duration: mobile ? 0.7 : 1.2, stagger: 0.1, ease: 'power4.out', delay: mobile ? 0.1 : 0.2 })
      gsap.fromTo('.hero-animate', { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.8, stagger: 0.08, delay: mobile ? 0.25 : 0.55, ease: 'power2.out' })
      gsap.to('.hero__content', {
        yPercent: 10,
        opacity: 0.35,
        ease: 'none',
        scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 0.6 }
      })
    } else {
      document.querySelectorAll<HTMLElement>('.reveal').forEach((element) => element.classList.add('is-visible'))
    }
  })

  requestAnimationFrame(() => ScrollTrigger.refresh())
  return () => context.revert()
}

const setupLocale = (): (() => void) => {
  const buttons = [...document.querySelectorAll<HTMLButtonElement>('[data-locale]')]
  const handlers = new Map<HTMLButtonElement, () => void>()
  buttons.forEach((button) => {
    const handler = (): void => {
      const next = button.dataset.locale as Locale
      if (next === locale) return
      locale = next
      localStorage.setItem('elitstroy-locale', locale)
      track('language_change', { locale })
      renderPage()
    }
    handlers.set(button, handler)
    button.addEventListener('click', handler)
  })
  return () => handlers.forEach((handler, button) => button.removeEventListener('click', handler))
}

const dismissLoader = (): void => {
  if (loaderDismissed || !loader) return
  loaderDismissed = true
  if (reducedMotion) {
    loader.remove()
    document.body.classList.add('is-ready')
    return
  }
  const timeline = gsap.timeline({ onComplete: () => loader.remove() })
  timeline.to('.loader__line span', { scaleX: 1, duration: 0.65, ease: 'power2.inOut' })
  timeline.to('.loader__inner', { opacity: 0, y: -12, duration: 0.35 }, '+=0.08')
  timeline.to(loader, { yPercent: -100, duration: 0.7, ease: 'power3.inOut' }, '-=0.15')
  timeline.call(() => document.body.classList.add('is-ready'), undefined, '-=0.5')
}

const renderPage = (): void => {
  const scrollPosition = window.scrollY
  cleanPage()
  document.body.classList.remove('menu-open')
  document.documentElement.lang = locale
  document.title = siteContent[locale].metaTitle
  document.querySelector<HTMLMetaElement>('meta[name="description"]')?.setAttribute('content', siteContent[locale].metaDescription)
  app.innerHTML = createMarkup(siteContent[locale])

  const cleanups = [
    setupNavigation(),
    setupCalculator(),
    setupForm(siteContent[locale]),
    setupMessengerFab(),
    setupMobileCta(),
    setupFaq(),
    setupTestimonialsSlider(),
    setupPointerHud(),
    setupAnimations(),
    setupLocale()
  ]
  cleanPage = () => cleanups.forEach((cleanup) => cleanup())
  if (scrollPosition > 0) requestAnimationFrame(() => window.scrollTo(0, scrollPosition))
}

const bootstrap = async (): Promise<void> => {
  siteContent = await loadContent()
  initAnalytics()
  const loaderImage = loader?.querySelector('img')
  if (loaderImage) loaderImage.src = asset(siteContent[locale].brand.image)
  renderPage()

  dismissLoader()
  window.setTimeout(dismissLoader, 1800)
  const heroImg = new Image()
  heroImg.onload = dismissLoader
  heroImg.onerror = dismissLoader
  heroImg.src = asset(siteContent[locale].hero.image)
  if (document.readyState === 'complete') dismissLoader()
  else window.addEventListener('load', dismissLoader, { once: true })
}

void bootstrap()
