import './admin.css'
import { content as defaultContent, type Locale, type SiteCopy } from './content'

const AUTH_KEY = 'elitstroy-admin-authed'
const TOKEN_KEY = 'elitstroy-admin-token'
const LEADS_STORAGE_KEY = 'elitstroy-leads'
const DEFAULT_PASSWORD = 'wow-admin'

type Lead = {
  id: string
  ts: number
  locale: string
  name: string
  contact: string
  interest: string
  messenger: string
}

const configuredHash = (import.meta.env.VITE_ADMIN_PASSWORD_HASH as string | undefined) ?? ''
const hashActive = configuredHash.length === 64 && !/^0+$/.test(configuredHash)

const state = {
  authed: sessionStorage.getItem(AUTH_KEY) === '1',
  tab: 'leads' as 'leads' | 'content',
  locale: 'uk' as Locale,
  content: defaultContent as Record<Locale, SiteCopy>,
  status: { text: '', kind: '' as '' | 'ok' | 'error' }
}

const root = document.querySelector<HTMLElement>('#admin-root')
if (!root) throw new Error('Admin root is missing')

const el = <K extends keyof HTMLElementTagNameMap>(tag: K, className?: string): HTMLElementTagNameMap[K] => {
  const node = document.createElement(tag)
  if (className) node.className = className
  return node
}

const SECTION_LABELS: Record<string, string> = {
  localeName: 'Мова (службове, не змінюйте)',
  metaTitle: 'Заголовок у вкладці браузера (SEO)',
  metaDescription: 'Опис сайту для Google (SEO)',
  brand: 'Логотип і назва компанії',
  nav: 'Пункти меню',
  common: 'Спільні кнопки',
  hero: 'Головний екран',
  story: 'Про нас / Підхід',
  value: 'Переваги',
  architecture: 'Етапи ремонту (сцена)',
  gallery: 'Галерея робіт',
  estimate: 'Калькулятор',
  assurance: 'Контроль якості',
  process: 'Як ми працюємо',
  faq: 'Питання та відповіді',
  testimonials: 'Відгуки клієнтів',
  cta: 'CTA-блоки й мобільна панель',
  contact: 'Контакти та форма',
  footer: 'Нижня частина сайту'
}

const FIELD_LABELS: Record<string, string> = {
  image: 'Фото (шлях)',
  top: 'Назва — перша частина',
  bottom: 'Назва — друга частина',
  marquee: 'Бігучий рядок',
  formationImage: 'Фото на фоні блоку «Про нас»',
  telegram: 'Посилання Telegram (плаваюча кнопка)',
  whatsapp: 'Послання WhatsApp — посилання (wa.me/380…)',
  viber: 'Посилання Viber (viber://chat?number=…)',
  mapEmbedUrl: 'Посилання на інтерактивну карту (Google Maps embed)',
  eyebrow: 'Надзаголовок (дрібний текст)',
  title: 'Заголовок',
  titleTop: 'Заголовок — перший рядок',
  titleAccent: 'Заголовок — виділений рядок',
  lead: 'Опис',
  intro: 'Вступний текст',
  quote: 'Цитата',
  primary: 'Головна кнопка',
  secondary: 'Друга кнопка',
  availability: 'Плашка «вільні слоти»',
  scroll: 'Підказка «горитайте»',
  model: 'Підпис моделі',
  stats: 'Цифри на головному екрані',
  value: 'Значення цифри',
  label: 'Підпис',
  detail: 'Пояснення',
  body: 'Текст',
  metric: 'Цифра',
  metricLabel: 'Підпис до цифри',
  tag: 'Позначка на фото',
  index: 'Номер',
  number: 'Номер',
  cards: 'Картки',
  items: 'Елементи',
  steps: 'Кроки',
  chapters: 'Етапи',
  metrics: 'Етапи контролю',
  drag: 'Підказка «сцена реагує»',
  cue: 'Підказка під галереєю',
  area: 'Площа — підпис',
  areaUnit: 'Одиниця площі',
  condition: 'Заголовок «тип об’єкта»',
  renovation: 'Заголовок «тип ремонту»',
  total: 'Підпис «орієнтовна вартість»',
  perSqm: 'Підпис «ціна за м²»',
  timeline: 'Підпис «термін робіт»',
  weeksUnit: 'Одиниця строку',
  estimateLabel: 'Підпис результату',
  disclaimer: 'Дрібний текст під калькулятором',
  conditions: 'Типи об’єктів',
  renovationTypes: 'Типи ремонту',
  description: 'Опис',
  pricePerSqm: 'Ціна за м² ($)',
  weeksPerSqm: 'Тижнів на м²',
  multiplier: 'Коефіцієнт',
  name: 'Назва',
  location: 'Місто / адреса',
  locationLabel: 'Підпис «локація»',
  schedule: 'Години роботи',
  scheduleLabel: 'Підпис «години»',
  messengers: 'Підпис «месенджери»',
  mapImage: 'Фото карти (шлях)',
  mapLabel: 'Підпис на карті',
  namePlaceholder: 'Підказка в полі імені',
  contact: 'Телефон або email',
  contactPlaceholder: 'Підказка в полі контакту',
  interest: 'Заголовок «що цікавить»',
  interestOptions: 'Варіанти у списку',
  consent: 'Текст згоди',
  submit: 'Написання на кнопці',
  required: 'Помилка: порожнє поле',
  contactError: 'Помилка: некоректний контакт',
  consentError: 'Помилка: немає згоди',
  successTitle: 'Заголовок після відправки',
  successBody: 'Текст після відправки',
  successAgain: 'Кнопка «надіслати ще»',
  line: 'Фраза в підвалі',
  rights: 'Права / назва',
  privacy: 'Текст про приватність',
  question: 'Питання',
  answer: 'Відповідь',
  author: 'Ім’я клієнта',
  role: 'Тип об’єкта та площа',
  rating: 'Оцінка від 1 до 5',
  estimateBanner: 'CTA після калькулятора',
  processBanner: 'CTA після процесу',
  testimonialsBanner: 'CTA після відгуків',
  storyBanner: 'CTA після блоку «Про нас»',
  galleryBanner: 'CTA після галереї',
  faqBanner: 'CTA після питань',
  ctaButton: 'Кнопка в підвалі',
  mobileBar: 'Мобільна CTA-панель',
  text: 'Опис CTA',
  button: 'Текст кнопки',
  calculate: 'Кнопка «Розрахувати»',
  write: 'Кнопка «Написати»'
}

const isObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value)

const humanLabel = (key: string): string => FIELD_LABELS[key] ?? SECTION_LABELS[key] ?? key

const resolveAsset = (path: string): string => {
  if (/^(https?:)?\/\//.test(path) || path.startsWith(import.meta.env.BASE_URL)) return path
  return `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`
}

const isImageValue = (key: string, value: unknown): boolean =>
  typeof value === 'string' &&
  (key === 'image' || key === 'mapImage' || /\.(webp|png|jpe?g|gif|svg|avif)(\?.*)?$/i.test(value))

const prepareImage = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    if (file.type === 'image/svg+xml' || file.type === 'image/gif') {
      const reader = new FileReader()
      reader.onload = () => resolve(String(reader.result))
      reader.onerror = () => reject(new Error('read failed'))
      reader.readAsDataURL(file)
      return
    }
    const reader = new FileReader()
    reader.onload = () => {
      const image = new Image()
      image.onload = () => {
        const maxSide = 1920
        const scale = Math.min(1, maxSide / Math.max(image.width, image.height))
        const canvas = document.createElement('canvas')
        canvas.width = Math.round(image.width * scale)
        canvas.height = Math.round(image.height * scale)
        const context = canvas.getContext('2d')
        if (!context) {
          resolve(String(reader.result))
          return
        }
        context.drawImage(image, 0, 0, canvas.width, canvas.height)
        canvas.toBlob(
          (blob) => {
            if (!blob) {
              resolve(String(reader.result))
              return
            }
            const buffer = new FileReader()
            buffer.onload = () => resolve(String(buffer.result))
            buffer.onerror = () => reject(new Error('read failed'))
            buffer.readAsDataURL(blob)
          },
          'image/webp',
          0.85
        )
      }
      image.onerror = () => reject(new Error('decode failed'))
      image.src = String(reader.result)
    }
    reader.onerror = () => reject(new Error('read failed'))
    reader.readAsDataURL(file)
  })

const uploadImage = async (file: File): Promise<string> => {
  const token = serverToken()
  if (!token) throw new Error('Потрібен сервер (VPS). У статичному режимі завантаження фото недоступне.')
  const data = await prepareImage(file)
  const response = await fetch('/api/upload', {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: file.name, data })
  })
  if (!response.ok) throw new Error(`Помилка завантаження (${response.status})`)
  const result = (await response.json()) as { url?: string }
  if (!result.url) throw new Error('Сервер не повернув адресу файлу')
  return result.url
}

let statusNode: HTMLElement | null = null

const setStatus = (text: string, kind: '' | 'ok' | 'error' = ''): void => {
  state.status = { text, kind }
  if (statusNode) {
    statusNode.textContent = text
    statusNode.className = `admin-status ${kind}`.trim()
  }
}

const sha256Hex = async (text: string): Promise<string> => {
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text))
  return Array.from(new Uint8Array(digest)).map((byte) => byte.toString(16).padStart(2, '0')).join('')
}

const checkPassword = async (password: string): Promise<boolean> => {
  if (hashActive && crypto.subtle) return (await sha256Hex(password)) === configuredHash
  return password === DEFAULT_PASSWORD
}

const serverToken = (): string => sessionStorage.getItem(TOKEN_KEY) ?? ''

const serverMode = (): boolean => serverToken().length > 0

const serverLogin = async (password: string): Promise<'ok' | 'invalid' | 'offline'> => {
  try {
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password })
    })
    if (response.ok) {
      const data = (await response.json()) as { token?: string }
      if (data.token) sessionStorage.setItem(TOKEN_KEY, data.token)
      return 'ok'
    }
    if (response.status === 401) return 'invalid'
    return 'offline'
  } catch {
    return 'offline'
  }
}

const cloneDefault = (sample: unknown): unknown => {
  if (typeof sample === 'string') return ''
  if (typeof sample === 'number') return 0
  if (typeof sample === 'boolean') return false
  if (Array.isArray(sample)) return sample.length > 0 ? [cloneDefault(sample[0])] : []
  if (isObject(sample)) {
    const out: Record<string, unknown> = {}
    for (const [key, item] of Object.entries(sample)) out[key] = cloneDefault(item)
    return out
  }
  return null
}

const buildHint = (text: string): HTMLElement => {
  const hint = el('small', 'admin-hint')
  hint.textContent = text
  return hint
}

const buildImageField = (
  key: string,
  value: string,
  setValue: (next: string) => void,
  markDirty: () => void
): HTMLElement => {
  const wrap = el('div', 'admin-field')
  const label = el('label')
  label.textContent = humanLabel(key)
  wrap.append(label)

  const preview = el('img', 'admin-image-preview') as HTMLImageElement
  preview.src = resolveAsset(value)
  preview.alt = ''
  preview.loading = 'lazy'
  wrap.append(preview)

  const input = el('input') as HTMLInputElement
  input.type = 'text'
  input.value = value
  input.addEventListener('input', () => {
    setValue(input.value)
    markDirty()
  })
  wrap.append(input)

  const upload = el('button', 'admin-button admin-button--ghost')
  upload.type = 'button'
  upload.textContent = 'Завантажити фото'
  const fileInput = el('input') as HTMLInputElement
  fileInput.type = 'file'
  fileInput.accept = 'image/*'
  fileInput.hidden = true
  upload.addEventListener('click', () => fileInput.click())
  fileInput.addEventListener('change', async () => {
    const file = fileInput.files?.[0]
    fileInput.value = ''
    if (!file) return
    upload.disabled = true
    upload.textContent = 'Завантаження…'
    try {
      const url = await uploadImage(file)
      setValue(url)
      input.value = url
      preview.src = resolveAsset(url)
      markDirty()
      setStatus('Фото завантажено на сервер. Не забудьте «Зберегти зміни».', 'ok')
    } catch (error) {
      setStatus(error instanceof Error ? error.message : 'Не вдалося завантажити фото', 'error')
    } finally {
      upload.disabled = false
      upload.textContent = 'Завантажити фото'
    }
  })
  wrap.append(upload, fileInput)
  wrap.append(buildHint('Натисніть «Завантажити фото» і виберіть файл — адреса оновиться автоматично'))
  return wrap
}

const buildPrimitiveField = (
  key: string,
  value: string | number | boolean,
  setValue: (next: string | number | boolean) => void,
  markDirty: () => void
): HTMLElement => {
  if (typeof value === 'string' && isImageValue(key, value)) {
    return buildImageField(key, value, setValue as (next: string) => void, markDirty)
  }
  const wrap = el('div', 'admin-field')
  const label = el('label')
  label.textContent = humanLabel(key)
  wrap.append(label)

  if (typeof value === 'boolean') {
    const input = el('input') as HTMLInputElement
    input.type = 'checkbox'
    input.checked = value
    input.addEventListener('change', () => {
      setValue(input.checked)
      markDirty()
    })
    wrap.append(input)
    return wrap
  }

  const asText = String(value)
  if (typeof value === 'string' && (value.length > 90 || value.includes('\n'))) {
    const area = el('textarea') as HTMLTextAreaElement
    area.value = asText
    area.addEventListener('input', () => {
      setValue(area.value)
      markDirty()
    })
    wrap.append(area)
    return wrap
  }

  const input = el('input') as HTMLInputElement
  input.type = typeof value === 'number' ? 'number' : 'text'
  if (typeof value === 'number') input.step = 'any'
  input.value = asText
  input.addEventListener('input', () => {
    setValue(typeof value === 'number' ? Number(input.value) || 0 : input.value)
    markDirty()
  })
  wrap.append(input)
  return wrap
}

const buildPrimitiveListField = (
  key: string,
  value: Array<string | number>,
  setValue: (next: Array<string | number>) => void,
  markDirty: () => void
): HTMLElement => {
  const wrap = el('div', 'admin-field')
  const label = el('label')
  label.textContent = `${humanLabel(key)} (по одному в рядку)`
  const area = el('textarea') as HTMLTextAreaElement
  area.value = value.join('\n')
  area.addEventListener('change', () => {
    const numeric = value.length > 0 && typeof value[0] === 'number'
    const items = area.value.split('\n').map((line) => line.trim()).filter(Boolean)
    setValue(numeric ? items.map((item) => Number(item) || 0) : items)
    markDirty()
  })
  wrap.append(label, area)
  return wrap
}

const buildObjectListField = (
  key: string,
  value: Record<string, unknown>[],
  setValue: (next: Record<string, unknown>[]) => void,
  markDirty: () => void,
  rerender: () => void
): HTMLElement => {
  const wrap = el('div', 'admin-field')
  const label = el('label')
  label.textContent = `${humanLabel(key)} (${value.length})`
  const list = el('div', 'admin-items')

  value.forEach((item, index) => {
    const itemNode = el('div', 'admin-item')
    const remove = el('button', 'admin-item__remove')
    remove.type = 'button'
    remove.textContent = '×'
    remove.setAttribute('aria-label', `Видалити ${key} #${index + 1}`)
    remove.addEventListener('click', () => {
      const next = [...value]
      next.splice(index, 1)
      setValue(next)
      rerender()
    })
    itemNode.append(remove)
    for (const [childKey, childValue] of Object.entries(item)) {
      itemNode.append(buildEditor(childKey, childValue, (next) => {
        item[childKey] = next
        markDirty()
      }, markDirty, rerender))
    }
    list.append(itemNode)
  })

  const add = el('button', 'admin-button admin-button--ghost')
  add.type = 'button'
  add.textContent = `+ Додати до ${key}`
  add.addEventListener('click', () => {
    setValue([...value, (cloneDefault(value[0] ?? {}) ?? {}) as Record<string, unknown>])
    rerender()
  })

  wrap.append(label, list, add)
  return wrap
}

const buildObjectGroup = (
  key: string,
  value: Record<string, unknown>,
  markDirty: () => void,
  rerender: () => void
): HTMLElement => {
  const details = el('details', 'admin-group')
  const summary = el('summary')
  summary.textContent = humanLabel(key)
  const body = el('div', 'admin-group__body')
  for (const [childKey, childValue] of Object.entries(value)) {
    body.append(buildEditor(childKey, childValue, (next) => {
      value[childKey] = next
      markDirty()
    }, markDirty, rerender))
  }
  details.append(summary, body)
  return details
}

const buildEditor = (
  key: string,
  value: unknown,
  setValue: (next: unknown) => void,
  markDirty: () => void,
  rerender: () => void
): HTMLElement => {
  if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
    return buildPrimitiveField(key, value, setValue as (next: string | number | boolean) => void, markDirty)
  }
  if (Array.isArray(value)) {
    const plain = value.every((item) => typeof item === 'string' || typeof item === 'number')
    if (plain) {
      return buildPrimitiveListField(key, value as Array<string | number>, setValue as (next: Array<string | number>) => void, markDirty)
    }
    return buildObjectListField(key, value as Record<string, unknown>[], setValue as (next: Record<string, unknown>[]) => void, markDirty, rerender)
  }
  if (isObject(value)) {
    return buildObjectGroup(key, value, markDirty, rerender)
  }
  return buildPrimitiveField(key, String(value ?? ''), setValue as (next: string | number | boolean) => void, markDirty)
}

const downloadFile = (content: string, filename: string, type: string): void => {
  const blob = new Blob([content], { type })
  const url = URL.createObjectURL(blob)
  const link = el('a')
  link.href = url
  link.download = filename
  link.click()
  URL.revokeObjectURL(url)
}

const saveContentToServer = async (): Promise<void> => {
  const token = serverToken()
  if (!token) {
    setStatus('Збереження доступне лише на сервері (VPS). Використайте «Експорт JSON».', 'error')
    return
  }
  try {
    const response = await fetch('/api/content', {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(state.content)
    })
    if (response.ok) {
      setStatus('Збережено на сервері. Зміни вже доступні відвідувачам сайту.', 'ok')
      return
    }
    if (response.status === 401) {
      setStatus('Сесія закінчилась. Увійдіть знову.', 'error')
      return
    }
    setStatus(`Помилка сервера: ${response.status}`, 'error')
  } catch {
    setStatus('Сервер недоступний. Перевірте з’єднання.', 'error')
  }
}

const readLocalLeads = (): Lead[] => {
  try {
    const data: unknown = JSON.parse(localStorage.getItem(LEADS_STORAGE_KEY) ?? '[]')
    if (!Array.isArray(data)) return []
    return (data as Lead[]).filter((lead) => !/^(lead-demo|lead-test)/.test(lead.id))
  } catch {
    return []
  }
}

const fetchServerLeads = async (): Promise<Lead[]> => {
  const token = serverToken()
  if (!token) return []
  const response = await fetch('/api/leads', { headers: { Authorization: `Bearer ${token}` } })
  if (!response.ok) throw new Error(String(response.status))
  const data: unknown = await response.json()
  return Array.isArray(data) ? (data as Lead[]) : []
}

const renderTopbar = (): HTMLElement => {
  const bar = el('div', 'admin-topbar')
  const brand = el('div', 'admin-brand')
  const logo = el('img')
  logo.src = `${import.meta.env.BASE_URL}favicon.svg`
  logo.alt = ''
  const title = el('div')
  const b = el('b')
  b.textContent = 'ELITSTROY CMS'
  const small = el('small')
  small.textContent = 'Керування контентом'
  title.append(b, small)
  brand.append(logo, title)

  const actions = el('div')
  actions.style.display = 'flex'
  actions.style.gap = '10px'
  const site = el('a', 'admin-button admin-button--ghost')
  site.href = import.meta.env.BASE_URL
  site.textContent = 'Сайт'
  const logout = el('button', 'admin-button admin-button--ghost')
  logout.type = 'button'
  logout.textContent = 'Вийти'
  logout.addEventListener('click', () => {
    sessionStorage.removeItem(AUTH_KEY)
    sessionStorage.removeItem(TOKEN_KEY)
    state.authed = false
    render()
  })
  actions.append(site, logout)
  bar.append(brand, actions)
  return bar
}

const renderTabs = (): HTMLElement => {
  const tabs = el('div', 'admin-tabs')
  const entries: Array<[typeof state.tab, string]> = [
    ['leads', 'Заявки'],
    ['content', 'Контент']
  ]
  entries.forEach(([tab, label]) => {
    const button = el('button')
    button.type = 'button'
    button.textContent = label
    button.classList.toggle('is-active', state.tab === tab)
    button.addEventListener('click', () => {
      state.tab = tab
      render()
    })
    tabs.append(button)
  })
  return tabs
}

const saveChanges = async (): Promise<void> => {
  await saveContentToServer()
}

const renderToolbar = (): HTMLElement => {
  const bar = el('div', 'admin-toolbar')
  const exportButton = el('button', 'admin-button')
  exportButton.type = 'button'
  exportButton.textContent = 'Експорт JSON'
  exportButton.addEventListener('click', () => {
    downloadFile(`${JSON.stringify(state.content, null, 2)}\n`, 'content.json', 'application/json')
    setStatus('Файл content.json завантажено.', 'ok')
  })
  const saveButton = el('button', 'admin-button')
  saveButton.type = 'button'
  saveButton.textContent = 'Зберегти зміни'
  saveButton.addEventListener('click', () => void saveChanges())
  bar.append(saveButton, exportButton)
  return bar
}

const renderContentTab = (): HTMLElement => {
  const card = el('div', 'admin-card')
  const localeSwitch = el('div', 'admin-locale')
  ;(['uk', 'en'] as const).forEach((loc) => {
    const button = el('button')
    button.type = 'button'
    button.textContent = loc.toUpperCase()
    button.classList.toggle('is-active', state.locale === loc)
    button.addEventListener('click', () => {
      state.locale = loc
      render()
    })
    localeSwitch.append(button)
  })
  card.append(localeSwitch, renderToolbar())

  const instruction = el('p', 'admin-hint')
  instruction.textContent =
    'Розкрийте розділ, змініть текст у полі — зміни зберігаються після натискання «Зберегти в GitHub» (або «Експорт JSON» для ручного оновлення).'
  card.append(instruction)

  const copy = state.content[state.locale] as unknown as Record<string, unknown>
  const markDirty = (): void => {
    setStatus('Є незбережені зміни. Експортуйте JSON або збережіть у GitHub.')
  }
  const rerender = (): void => render()

  const keys = Object.keys(copy)
  keys.forEach((key, index) => {
    const group = buildEditor(key, copy[key], (next) => {
      copy[key] = next
      markDirty()
    }, markDirty, rerender)
    if (index === 0 && group instanceof HTMLDetailsElement) group.open = true
    card.append(group)
  })
  return card
}

const renderLeadsRow = (lead: Lead): HTMLElement => {
  const row = el('tr')
  const cells = [
    new Date(lead.ts).toLocaleString('uk-UA'),
    lead.name,
    lead.contact,
    lead.interest,
    lead.messenger,
    lead.locale?.toUpperCase() ?? ''
  ]
  cells.forEach((text) => {
    const cell = el('td')
    cell.textContent = text
    row.append(cell)
  })
  return row
}

const renderLeadsCard = (): HTMLElement => {
  const card = el('div', 'admin-card')
  const toolbar = el('div', 'admin-toolbar')
  const status = el('span', 'admin-status')

  const tableWrap = el('div')
  const renderTable = (leads: Lead[]): void => {
    tableWrap.innerHTML = ''
    if (leads.length === 0) {
      const empty = el('div', 'admin-empty')
      empty.textContent = 'Заявок поки немає. Надішліть форму на сайті — заявка з’явиться тут.'
      tableWrap.append(empty)
      return
    }
    const table = el('table', 'admin-leads')
    const thead = el('thead')
    const headRow = el('tr')
    ;['Дата', 'Ім’я', 'Контакт', 'Інтерес', 'Месенджер', 'Мова'].forEach((text) => {
      const th = el('th')
      th.textContent = text
      headRow.append(th)
    })
    thead.append(headRow)
    const tbody = el('tbody')
    leads.forEach((lead) => tbody.append(renderLeadsRow(lead)))
    table.append(thead, tbody)
    tableWrap.append(table)
  }

  const refresh = async (): Promise<void> => {
    const local = readLocalLeads()
    let server: Lead[] = []
    if (serverMode()) {
      try {
        server = await fetchServerLeads()
      } catch {
        status.textContent = 'Не вдалося завантажити заявки з сервера — показані локальні.'
      }
    }
    const merged = new Map<string, Lead>()
    ;[...server, ...local].forEach((lead) => {
      if (!merged.has(lead.id)) merged.set(lead.id, lead)
    })
    const all = Array.from(merged.values())
    renderTable(all)
    if (!status.textContent) {
      status.textContent = all.length > 0 ? `Усього заявок: ${all.length}` : ''
    }
  }

  const refreshButton = el('button', 'admin-button')
  refreshButton.type = 'button'
  refreshButton.textContent = 'Оновити'
  refreshButton.addEventListener('click', () => void refresh())

  const csvButton = el('button', 'admin-button admin-button--ghost')
  csvButton.type = 'button'
  csvButton.textContent = 'Експорт CSV'
  csvButton.addEventListener('click', () => {
    const leads = readLocalLeads()
    const header = ['id', 'date', 'name', 'contact', 'interest', 'messenger', 'locale']
    const rows = leads.map((lead) => [
      lead.id,
      new Date(lead.ts).toISOString(),
      lead.name,
      lead.contact,
      lead.interest,
      lead.messenger,
      lead.locale
    ])
    const csv = [header, ...rows]
      .map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(','))
      .join('\n')
    downloadFile(`\uFEFF${csv}\n`, 'leads.csv', 'text/csv;charset=utf-8')
  })

  const clearButton = el('button', 'admin-button admin-button--danger')
  clearButton.type = 'button'
  clearButton.textContent = 'Очистити локальні'
  clearButton.addEventListener('click', () => {
    if (!window.confirm('Видалити всі локальні заявки з цього браузера?')) return
    localStorage.removeItem(LEADS_STORAGE_KEY)
    void refresh()
  })

  toolbar.append(refreshButton, csvButton, clearButton, status)
  card.append(toolbar, tableWrap)
  void refresh()
  return card
}

const renderLogin = (): HTMLElement => {
  const wrap = el('div', 'admin-login')
  const card = el('div', 'admin-card')
  const title = el('h1')
  title.textContent = 'eLITstroy CMS'
  const lead = el('p')
  lead.textContent = 'Введіть пароль адміністратора, щоб керувати контентом сайту.'
  const error = el('p', 'admin-status')

  const input = el('input') as HTMLInputElement
  input.type = 'password'
  input.placeholder = 'Пароль'
  input.autocomplete = 'current-password'
  const fieldWrap = el('div', 'admin-field')
  const label = el('label')
  label.textContent = 'Пароль'
  fieldWrap.append(label, input)

  const submit = el('button', 'admin-button')
  submit.type = 'button'
  submit.textContent = 'Увійти'
  const tryLogin = async (): Promise<void> => {
    const password = input.value
    const serverResult = await serverLogin(password)
    if (serverResult === 'ok') {
      sessionStorage.setItem(AUTH_KEY, '1')
      state.authed = true
      render()
      return
    }
    if (serverResult === 'invalid') {
      error.textContent = 'Невірний пароль'
      return
    }
    const localOk = await checkPassword(password)
    if (localOk) {
      sessionStorage.setItem(AUTH_KEY, '1')
      state.authed = true
      render()
      return
    }
    error.textContent = 'Невірний пароль'
  }
  submit.addEventListener('click', () => void tryLogin())
  input.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') void tryLogin()
  })

  card.append(title, lead, fieldWrap, submit, error)
  wrap.append(card)
  return wrap
}

const render = (): void => {
  root.innerHTML = ''
  statusNode = null
  if (!state.authed) {
    root.append(renderLogin())
    return
  }
  const shell = el('div', 'admin-shell')
  shell.append(renderTopbar(), renderTabs())
  const status = el('p', `admin-status ${state.status.kind}`.trim())
  status.textContent = state.status.text
  statusNode = status
  shell.append(status)
  if (state.tab === 'content') shell.append(renderContentTab())
  if (state.tab === 'leads') shell.append(renderLeadsCard())
  root.append(shell)
}

const boot = async (): Promise<void> => {
  try {
    const response = await fetch(`${import.meta.env.BASE_URL}content.json`, { cache: 'no-cache' })
    if (response.ok) state.content = (await response.json()) as Record<Locale, SiteCopy>
  } catch {
    state.content = defaultContent
  }
  render()
}

void boot()
