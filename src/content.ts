export type Locale = 'uk' | 'en'

type Stat = {
  value: string
  label: string
}

type Chapter = {
  index: string
  eyebrow: string
  title: string
  body: string
  metric: string
  metricLabel: string
  image: string
  tag: string
}

type ProcessStep = {
  index: string
  title: string
  body: string
  image: string
}

type Strategy = {
  id: 'income' | 'balanced' | 'growth'
  name: string
  description: string
  yield: number
  growth: number
}

type ValueItem = {
  index: string
  title: string
  body: string
  metric: string
  metricLabel: string
}

type GalleryItem = {
  index: string
  title: string
  location: string
  image: string
  tag: string
}

export type SiteCopy = {
  localeName: string
  metaTitle: string
  metaDescription: string
  nav: { story: string; architecture: string; investment: string; process: string; contact: string }
  common: { discuss: string; details: string; optional: string }
  hero: {
    eyebrow: string
    titleTop: string
    titleAccent: string
    lead: string
    primary: string
    secondary: string
    availability: string
    scroll: string
    model: string
    image: string
    stats: Stat[]
  }
  story: {
    eyebrow: string
    title: string
    lead: string
    quote: string
    cards: Array<{ number: string; title: string; body: string; image: string; tag: string }>
  }
  value: {
    eyebrow: string
    title: string
    lead: string
    items: ValueItem[]
  }
  architecture: {
    eyebrow: string
    title: string
    intro: string
    chapters: Chapter[]
    drag: string
  }
  gallery: {
    eyebrow: string
    title: string
    intro: string
    cue: string
    items: GalleryItem[]
  }
  investment: {
    eyebrow: string
    title: string
    intro: string
    capital: string
    term: string
    strategy: string
    months: string
    invested: string
    income: string
    value: string
    roi: string
    estimate: string
    disclaimer: string
    strategies: Strategy[]
  }
  assurance: {
    eyebrow: string
    title: string
    lead: string
    metrics: Array<{ value: string; label: string; detail: string }>
  }
  process: {
    eyebrow: string
    title: string
    intro: string
    steps: ProcessStep[]
    trustTitle: string
    trustBody: string
    trustItems: string[]
    trustImage: string
    trustBadge: string
  }
  faq: {
    eyebrow: string
    title: string
    lead: string
    items: Array<{ question: string; answer: string }>
  }
  contact: {
    eyebrow: string
    title: string
    lead: string
    location: string
    locationLabel: string
    schedule: string
    scheduleLabel: string
    messengers: string
    mapImage: string
    fields: {
      name: string
      namePlaceholder: string
      contact: string
      contactPlaceholder: string
      interest: string
      interestOptions: string[]
      consent: string
      submit: string
    }
    errors: { required: string; contact: string; consent: string }
    successTitle: string
    successBody: string
    successAgain: string
    mapLabel: string
  }
  footer: { line: string; rights: string; privacy: string }
}

export const content: Record<Locale, SiteCopy> = {
  uk: {
    localeName: 'UA',
    metaTitle: 'Коттедж Інвест — архітектура капіталу',
    metaDescription: 'Добір, створення та керування дохідною заміською нерухомістю.',
    nav: {
      story: 'Підхід',
      architecture: 'Продукт',
      investment: 'Модель',
      process: 'Процес',
      contact: 'Контакти'
    },
    common: { discuss: 'Обговорити проєкт', details: 'Детальніше', optional: 'Необов’язково' },
    hero: {
      eyebrow: 'Нерухомість × інвестиції',
      titleTop: 'Архітектура',
      titleAccent: 'вашого капіталу',
      lead: 'Перетворюємо заміські будинки на зрозумілий інвестиційний продукт — від ділянки до керованого активу.',
      primary: 'Отримати презентацію',
      secondary: 'Дослідити модель',
      availability: 'Нові проєкти · 2026',
      scroll: 'Гортайте, щоб дослідити',
      model: 'Concept 01 / Forest line',
      image: '/images/hero-cabin.webp',
      stats: [
        { value: '01', label: 'єдина команда' },
        { value: '360°', label: 'цикл реалізації' },
        { value: 'UA / EN', label: 'для локальних та іноземних інвесторів' }
      ]
    },
    story: {
      eyebrow: 'Інвестиція, яку можна відчути',
      title: 'Створюємо не квадратні метри. Створюємо актив із власним сценарієм зростання.',
      lead: 'Поєднуємо аналітику локації, виразну архітектуру та операційне управління. Кожне рішення працює на привабливість об’єкта сьогодні й його вартість завтра.',
      quote: 'Капітал має не просто зберігатися. Він має набувати форми.',
      cards: [
        {
          number: '01',
          title: 'Вибір локації',
          body: 'Оцінюємо попит, логістику, природний потенціал і майбутню ліквідність ділянки.',
          image: '/images/story-location.webp',
          tag: 'LOCATION / DEMAND'
        },
        {
          number: '02',
          title: 'Продуктовий дизайн',
          body: 'Проєктуємо будинок як досвід, за який гість готовий повертатися і платити більше.',
          image: '/images/story-interior.webp',
          tag: 'DESIGN / SPACES'
        },
        {
          number: '03',
          title: 'Керована модель',
          body: 'Формуємо прозорий сценарій запуску, експлуатації та контролю ключових показників.',
          image: '/images/story-management.webp',
          tag: 'TURNKEY / YIELD'
        }
      ]
    },
    value: {
      eyebrow: 'Повна система створення вартості',
      title: 'Три дисципліни працюють як один інвестиційний механізм.',
      lead: 'Ми не передаємо проєкт між розрізненими підрядниками. Продукт, реалізація та керування розвиваються одночасно й підтримують єдину економіку об’єкта.',
      items: [
        { index: '01', title: 'Нерухомість як продукт', body: 'Концепція починається з портрета гостя, сценарію перебування та цільового тарифу — і лише потім стає архітектурою.', metric: '01', metricLabel: 'цілісний продукт' },
        { index: '02', title: 'Реалізація без розривів', body: 'Комплектація, бюджет і будівельні рішення перевіряються на відповідність початковій інвестиційній моделі.', metric: '360°', metricLabel: 'контроль циклу' },
        { index: '03', title: 'Дані після запуску', body: 'Завантаження, середній тариф, витрати й відгуки перетворюються на рішення для подальшого зростання активу.', metric: '24/7', metricLabel: 'видимість показників' }
      ]
    },
    architecture: {
      eyebrow: 'Один об’єкт. Чотири шари цінності.',
      title: 'Будинок, спроєктований як система',
      intro: 'Розкладаємо інвестиційний продукт на складові — від землі до сервісу. Гортайте, щоб побачити логіку моделі.',
      drag: 'Сцена реагує на рух',
      chapters: [
        {
          index: '01',
          eyebrow: 'Основа',
          title: 'Локація формує попит',
          body: 'Природне оточення, близькість до міста та приватність створюють дефіцитний сценарій відпочинку.',
          metric: '40–70',
          metricLabel: 'хв до міста',
          image: '/images/arch-plot.webp',
          tag: '01 · FOUNDATION'
        },
        {
          index: '02',
          eyebrow: 'Оболонка',
          title: 'Архітектура формує бажання',
          body: 'Великі площини скла, тактильні матеріали й продумані ракурси перетворюють проживання на емоцію.',
          metric: '92 м²',
          metricLabel: 'ефективної площі',
          image: '/images/arch-facade.webp',
          tag: '02 · SHELL'
        },
        {
          index: '03',
          eyebrow: 'Середовище',
          title: 'Деталі формують тариф',
          body: 'Тераса, приватна SPA-зона, світло й сценарії тиші підсилюють цінність кожної доби.',
          metric: '4 сезони',
          metricLabel: 'стабільного попиту',
          image: '/images/arch-spa.webp',
          tag: '03 · SPA & TERRACE'
        },
        {
          index: '04',
          eyebrow: 'Управління',
          title: 'Сервіс формує результат',
          body: 'Бронювання, догляд, звітність і комунікація з гостями збираються в єдиний керований процес.',
          metric: '24 / 7',
          metricLabel: 'контроль активу',
          image: '/images/arch-service.webp',
          tag: '04 · MANAGEMENT'
        }
      ]
    },
    gallery: {
      eyebrow: 'Простори, які запам’ятовують',
      title: 'Не каталог будинків. Колекція інвестиційних сценаріїв.',
      intro: 'Вертикальний скрол перетворюється на горизонтальну подорож — від першого контакту з локацією до деталей сервісу.',
      cue: 'Гортайте далі',
      items: [
        { index: '01', title: 'Forest Frame', location: 'Лісова резиденція', image: '/images/hero-cabin.webp', tag: 'ARCHITECTURE' },
        { index: '02', title: 'Quiet Interior', location: 'Простір тиші', image: '/images/story-interior.webp', tag: 'INTERIOR' },
        { index: '03', title: 'Private Ritual', location: 'SPA та відновлення', image: '/images/arch-spa.webp', tag: 'WELLNESS' },
        { index: '04', title: 'Remote Ground', location: 'Дефіцитна локація', image: '/images/story-location.webp', tag: 'LOCATION' },
        { index: '05', title: 'Built to Last', location: 'Контроль реалізації', image: '/images/step-delivery.webp', tag: 'DELIVERY' },
        { index: '06', title: 'Visible Asset', location: 'Керування після запуску', image: '/images/trust-system.webp', tag: 'OPERATIONS' }
      ]
    },
    investment: {
      eyebrow: 'Демонстраційна модель',
      title: 'Перевірте потенціал у цифрах',
      intro: 'Налаштуйте базові параметри, щоб побачити орієнтовний сценарій. Точна модель формується індивідуально після аналізу об’єкта.',
      capital: 'Обсяг інвестиції',
      term: 'Горизонт',
      strategy: 'Стратегія',
      months: 'міс.',
      invested: 'Стартовий капітал',
      income: 'Орієнтовний прибуток',
      value: 'Прогнозна вартість',
      roi: 'ROI за період',
      estimate: 'Орієнтир',
      disclaimer: 'Розрахунок є демонстраційним, не є фінансовою гарантією чи публічною офертою. Фактичні показники залежать від локації, комплектації, завантаження та ринкових умов.',
      strategies: [
        { id: 'income', name: 'Стабільний дохід', description: 'Фокус на регулярному орендному потоці', yield: 9.8, growth: 3.2 },
        { id: 'balanced', name: 'Збалансована', description: 'Дохідність і зростання вартості активу', yield: 12.4, growth: 4.2 },
        { id: 'growth', name: 'Зростання', description: 'Фокус на потенціалі локації та продукту', yield: 8.6, growth: 7.4 }
      ]
    },
    assurance: {
      eyebrow: 'Контроль замість припущень',
      title: 'Інвестор бачить актив з чотирьох сторін.',
      lead: 'Єдина панель рішень поєднує фінанси, строки, якість продукту та операційні показники.',
      metrics: [
        { value: '01', label: 'Фінансова рамка', detail: 'Фіксуємо бюджет, резерви, цільову модель і правила прийняття рішень.' },
        { value: '02', label: 'Маршрут реалізації', detail: 'Розкладаємо проєкт на контрольні точки, залежності та відповідальних.' },
        { value: '03', label: 'Контроль продукту', detail: 'Перевіряємо матеріали, вузли й комплектацію на відповідність концепції.' },
        { value: '04', label: 'Запуск і результат', detail: 'Зводимо тариф, завантаження, витрати та якість сервісу в одну картину.' }
      ]
    },
    process: {
      eyebrow: 'Від наміру до працюючого активу',
      title: 'Складний процес. Проста комунікація.',
      intro: 'Ви бачите рішення, статус і наступний крок. Ми координуємо всі дисципліни, щоб об’єкт рухався як єдиний проєкт.',
      steps: [
        {
          index: '01',
          title: 'Стратегія',
          body: 'Фіксуємо цілі, бюджет, горизонт і критерії майбутнього об’єкта.',
          image: '/images/step-strategy.webp'
        },
        {
          index: '02',
          title: 'Концепція',
          body: 'Збираємо локацію, архітектуру та фінансовий сценарій в одну модель.',
          image: '/images/step-concept.webp'
        },
        {
          index: '03',
          title: 'Реалізація',
          body: 'Керуємо комплектацією, термінами, якістю та підготовкою до запуску.',
          image: '/images/step-delivery.webp'
        },
        {
          index: '04',
          title: 'Запуск',
          body: 'Налаштовуємо операційний контур, звітність і контроль результату.',
          image: '/images/step-launch.webp'
        }
      ],
      trustTitle: 'Ваш актив залишається зрозумілим',
      trustBody: 'Структурована звітність і єдина точка комунікації допомагають приймати рішення без інформаційного шуму.',
      trustItems: ['Етапність і контрольні точки', 'Прозорий бюджет', 'Єдина команда реалізації'],
      trustImage: '/images/trust-system.webp',
      trustBadge: 'AURA-MDLR · CONTROL MATRIX'
    },
    faq: {
      eyebrow: 'Відповіді без дрібного шрифту',
      title: 'Що важливо знати до старту',
      lead: 'Ключові питання, які допомагають зрозуміти формат співпраці ще до першої зустрічі.',
      items: [
        { question: 'Чи можна почати без власної ділянки?', answer: 'Так. Пошук і попередня оцінка локації можуть бути частиною стратегії. Ми зіставляємо потенціал ділянки з бюджетом, логістикою та майбутнім сценарієм попиту.' },
        { question: 'Коли формується точна фінансова модель?', answer: 'Після визначення локації, площі, комплектації та операційного формату. Демонстраційний калькулятор показує логіку, але не замінює індивідуальний розрахунок.' },
        { question: 'Хто керує об’єктом після запуску?', answer: 'Модель керування узгоджується окремо: власна команда інвестора, зовнішній оператор або партнерський контур. Головне — зафіксовані стандарти й прозорі показники.' },
        { question: 'Як інвестор контролює реалізацію?', answer: 'Через контрольні точки, статус бюджету, графік рішень і єдину відповідальну команду. Формат звітності погоджується на старті проєкту.' }
      ]
    },
    contact: {
      eyebrow: 'Почнімо з вашої мети',
      title: 'Який актив ви хочете створити?',
      lead: 'Залиште контакти. На першій розмові визначимо формат, бюджет і наступний практичний крок.',
      location: 'Харків, Україна',
      locationLabel: 'Базова локація',
      schedule: 'Пн–Пт · 09:00–18:00',
      scheduleLabel: 'Години зв’язку',
      messengers: 'Зручний канал',
      mapImage: '/images/contact-map.webp',
      fields: {
        name: 'Ваше ім’я',
        namePlaceholder: 'Як до вас звертатися?',
        contact: 'Телефон або email',
        contactPlaceholder: '+380 або name@email.com',
        interest: 'Що вас цікавить?',
        interestOptions: ['Інвестиція в готовий проєкт', 'Створення об’єкта з нуля', 'Партнерство', 'Поки вивчаю можливості'],
        consent: 'Погоджуюся на обробку даних для зворотного зв’язку',
        submit: 'Запланувати розмову'
      },
      errors: { required: 'Заповніть це поле', contact: 'Вкажіть коректний телефон або email', consent: 'Потрібна ваша згода' },
      successTitle: 'Запит сформовано',
      successBody: 'Це демонстраційна форма: дані нікуди не надсилалися. Після підключення endpoint тут працюватиме реальна заявка.',
      successAgain: 'Надіслати ще один запит',
      mapLabel: 'Точка координації · Харків'
    },
    footer: { line: 'Нерухомість, що працює на майбутнє.', rights: 'Коттедж Інвест. Концепт 2026.', privacy: 'Дані не передаються третім сторонам' }
  },
  en: {
    localeName: 'EN',
    metaTitle: 'Cottage Invest — architecture of capital',
    metaDescription: 'Selection, development and management of income-generating countryside real estate.',
    nav: { story: 'Approach', architecture: 'Product', investment: 'Model', process: 'Process', contact: 'Contact' },
    common: { discuss: 'Discuss a project', details: 'Explore', optional: 'Optional' },
    hero: {
      eyebrow: 'Real estate × investment',
      titleTop: 'Architecture',
      titleAccent: 'for your capital',
      lead: 'We turn countryside homes into a clear investment product — from the right plot to a managed asset.',
      primary: 'Get the presentation',
      secondary: 'Explore the model',
      availability: 'New projects · 2026',
      scroll: 'Scroll to explore',
      model: 'Concept 01 / Forest line',
      image: '/images/hero-cabin.webp',
      stats: [
        { value: '01', label: 'integrated team' },
        { value: '360°', label: 'delivery cycle' },
        { value: 'UA / EN', label: 'for local and international investors' }
      ]
    },
    story: {
      eyebrow: 'An investment you can feel',
      title: 'We do not create square metres. We create an asset with its own growth scenario.',
      lead: 'Location intelligence, expressive architecture and operational management work together. Every decision increases the appeal of the property today and its value tomorrow.',
      quote: 'Capital should not simply be stored. It should take shape.',
      cards: [
        {
          number: '01',
          title: 'Location selection',
          body: 'We assess demand, access, natural potential and future liquidity of the property plot.',
          image: '/images/story-location.webp',
          tag: 'LOCATION / DEMAND'
        },
        {
          number: '02',
          title: 'Product design',
          body: 'We design an experience guests want to return to and are willing to value higher.',
          image: '/images/story-interior.webp',
          tag: 'DESIGN / SPACES'
        },
        {
          number: '03',
          title: 'Managed model',
          body: 'We create a transparent path to launch, operate and monitor the essential metrics.',
          image: '/images/story-management.webp',
          tag: 'TURNKEY / YIELD'
        }
      ]
    },
    value: {
      eyebrow: 'A complete value creation system',
      title: 'Three disciplines work as one investment mechanism.',
      lead: 'We do not pass the project between disconnected contractors. Product, delivery and management evolve together around one property economy.',
      items: [
        { index: '01', title: 'Real estate as a product', body: 'The concept begins with the guest, the stay scenario and the target rate — only then does it become architecture.', metric: '01', metricLabel: 'integrated product' },
        { index: '02', title: 'Delivery without gaps', body: 'Specification, budget and construction decisions are checked against the original investment model.', metric: '360°', metricLabel: 'cycle control' },
        { index: '03', title: 'Data after launch', body: 'Occupancy, average rate, costs and reviews become decisions that continue to grow the asset.', metric: '24/7', metricLabel: 'metric visibility' }
      ]
    },
    architecture: {
      eyebrow: 'One property. Four layers of value.',
      title: 'A house designed as a system',
      intro: 'We break down the investment product from land to service. Scroll to discover how the model works.',
      drag: 'Scene responds to movement',
      chapters: [
        {
          index: '01',
          eyebrow: 'Foundation',
          title: 'Location creates demand',
          body: 'Nature, access to the city and privacy shape a scarce, desirable escape.',
          metric: '40–70',
          metricLabel: 'min from the city',
          image: '/images/arch-plot.webp',
          tag: '01 · FOUNDATION'
        },
        {
          index: '02',
          eyebrow: 'Shell',
          title: 'Architecture creates desire',
          body: 'Expansive glazing, tactile materials and considered views turn a stay into an emotion.',
          metric: '92 m²',
          metricLabel: 'of efficient space',
          image: '/images/arch-facade.webp',
          tag: '02 · SHELL'
        },
        {
          index: '03',
          eyebrow: 'Experience',
          title: 'Details create rate',
          body: 'A terrace, private spa, lighting and quiet rituals increase the value of every night.',
          metric: '4 seasons',
          metricLabel: 'of steady demand',
          image: '/images/arch-spa.webp',
          tag: '03 · SPA & TERRACE'
        },
        {
          index: '04',
          eyebrow: 'Management',
          title: 'Service creates results',
          body: 'Bookings, maintenance, reporting and guest communication become one managed process.',
          metric: '24 / 7',
          metricLabel: 'asset visibility',
          image: '/images/arch-service.webp',
          tag: '04 · MANAGEMENT'
        }
      ]
    },
    gallery: {
      eyebrow: 'Spaces worth remembering',
      title: 'Not a catalogue of houses. A collection of investment scenarios.',
      intro: 'Vertical scrolling becomes a horizontal journey — from the first encounter with a location to the details of service.',
      cue: 'Keep scrolling',
      items: [
        { index: '01', title: 'Forest Frame', location: 'Woodland residence', image: '/images/hero-cabin.webp', tag: 'ARCHITECTURE' },
        { index: '02', title: 'Quiet Interior', location: 'A space for stillness', image: '/images/story-interior.webp', tag: 'INTERIOR' },
        { index: '03', title: 'Private Ritual', location: 'Spa and recovery', image: '/images/arch-spa.webp', tag: 'WELLNESS' },
        { index: '04', title: 'Remote Ground', location: 'A scarce location', image: '/images/story-location.webp', tag: 'LOCATION' },
        { index: '05', title: 'Built to Last', location: 'Controlled delivery', image: '/images/step-delivery.webp', tag: 'DELIVERY' },
        { index: '06', title: 'Visible Asset', location: 'Post-launch management', image: '/images/trust-system.webp', tag: 'OPERATIONS' }
      ]
    },
    investment: {
      eyebrow: 'Demonstration model',
      title: 'Explore the potential in numbers',
      intro: 'Adjust the essentials to view an indicative scenario. A precise model is built individually after analysing the property.',
      capital: 'Investment amount',
      term: 'Horizon',
      strategy: 'Strategy',
      months: 'mo.',
      invested: 'Starting capital',
      income: 'Indicative profit',
      value: 'Projected value',
      roi: 'Period ROI',
      estimate: 'Estimate',
      disclaimer: 'This calculation is for demonstration only and is not a financial guarantee or public offer. Actual results depend on location, specification, occupancy and market conditions.',
      strategies: [
        { id: 'income', name: 'Stable income', description: 'Focus on recurring rental cash flow', yield: 9.8, growth: 3.2 },
        { id: 'balanced', name: 'Balanced', description: 'Income and long-term asset appreciation', yield: 12.4, growth: 4.2 },
        { id: 'growth', name: 'Growth', description: 'Focus on the upside of location and product', yield: 8.6, growth: 7.4 }
      ]
    },
    assurance: {
      eyebrow: 'Control instead of assumptions',
      title: 'The investor sees the asset from four sides.',
      lead: 'One decision layer brings together finance, schedule, product quality and operating performance.',
      metrics: [
        { value: '01', label: 'Financial frame', detail: 'We define the budget, reserves, target model and decision rules.' },
        { value: '02', label: 'Delivery route', detail: 'We map the project into milestones, dependencies and accountable owners.' },
        { value: '03', label: 'Product control', detail: 'Materials, details and specification are checked against the concept.' },
        { value: '04', label: 'Launch and outcome', detail: 'Rate, occupancy, costs and service quality come together in one view.' }
      ]
    },
    process: {
      eyebrow: 'From intent to performing asset',
      title: 'A complex process. Simple communication.',
      intro: 'You see the decision, status and next step. We coordinate every discipline so the property moves forward as one project.',
      steps: [
        {
          index: '01',
          title: 'Strategy',
          body: 'We define goals, budget, horizon and criteria for the future property.',
          image: '/images/step-strategy.webp'
        },
        {
          index: '02',
          title: 'Concept',
          body: 'We combine location, architecture and the financial scenario into one model.',
          image: '/images/step-concept.webp'
        },
        {
          index: '03',
          title: 'Delivery',
          body: 'We manage specification, timing, quality and launch readiness.',
          image: '/images/step-delivery.webp'
        },
        {
          index: '04',
          title: 'Launch',
          body: 'We establish operations, reporting and clear performance control.',
          image: '/images/step-launch.webp'
        }
      ],
      trustTitle: 'Your asset stays understandable',
      trustBody: 'Structured reporting and one point of communication help you make decisions without the noise.',
      trustItems: ['Clear milestones', 'Transparent budget', 'One delivery team'],
      trustImage: '/images/trust-system.webp',
      trustBadge: 'AURA-MDLR · CONTROL MATRIX'
    },
    faq: {
      eyebrow: 'Answers without the fine print',
      title: 'What matters before you start',
      lead: 'The essential questions that clarify the engagement before the first meeting.',
      items: [
        { question: 'Can I begin without owning a plot?', answer: 'Yes. Location search and preliminary evaluation can be part of the strategy. We match the potential of a plot to budget, access and its future demand scenario.' },
        { question: 'When is the precise financial model created?', answer: 'After location, area, specification and the operating format are defined. The demonstration calculator explains the logic but does not replace an individual model.' },
        { question: 'Who manages the property after launch?', answer: 'The operating model is agreed separately: the investor’s team, an external operator or a partner setup. What matters is a documented standard and transparent metrics.' },
        { question: 'How does the investor control delivery?', answer: 'Through milestones, budget status, a decision schedule and one accountable team. The reporting format is agreed at project start.' }
      ]
    },
    contact: {
      eyebrow: 'Let us start with your goal',
      title: 'What kind of asset do you want to create?',
      lead: 'Leave your details. In our first conversation, we will define the format, budget and next practical step.',
      location: 'Kharkiv, Ukraine',
      locationLabel: 'Base location',
      schedule: 'Mon–Fri · 09:00–18:00',
      scheduleLabel: 'Contact hours',
      messengers: 'Preferred channel',
      mapImage: '/images/contact-map.webp',
      fields: {
        name: 'Your name',
        namePlaceholder: 'How should we address you?',
        contact: 'Phone or email',
        contactPlaceholder: '+380 or name@email.com',
        interest: 'What are you interested in?',
        interestOptions: ['Investing in a ready project', 'Creating a property from scratch', 'Partnership', 'Exploring the opportunity'],
        consent: 'I agree to the processing of my data for a reply',
        submit: 'Schedule a conversation'
      },
      errors: { required: 'Please complete this field', contact: 'Enter a valid phone or email', consent: 'Your consent is required' },
      successTitle: 'Your request is ready',
      successBody: 'This is a demonstration form: no data was sent. Once an endpoint is connected, a real enquiry will be submitted here.',
      successAgain: 'Create another request',
      mapLabel: 'Coordination point · Kharkiv'
    },
    footer: { line: 'Real estate designed for the future.', rights: 'Cottage Invest. Concept 2026.', privacy: 'Your data is not shared with third parties' }
  }
}
