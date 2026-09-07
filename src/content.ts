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

type RenovationType = {
  id: 'cosmetic' | 'capital' | 'turnkey'
  name: string
  description: string
  pricePerSqm: number
  weeksPerSqm: number
}

type Condition = {
  id: 'new' | 'secondary'
  name: string
  multiplier: number
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
  brand: { image: string; top: string; bottom: string }
  nav: { story: string; architecture: string; estimate: string; process: string; contact: string }
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
    formationImage: string
    cards: Array<{ number: string; title: string; body: string; image: string; tag: string }>
  }
  value: {
    eyebrow: string
    marquee: string
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
  estimate: {
    eyebrow: string
    title: string
    intro: string
    area: string
    areaUnit: string
    condition: string
    renovation: string
    total: string
    perSqm: string
    timeline: string
    weeksUnit: string
    estimateLabel: string
    disclaimer: string
    conditions: Condition[]
    renovationTypes: RenovationType[]
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
  testimonials: {
    eyebrow: string
    title: string
    lead: string
    items: Array<{ quote: string; author: string; role: string; rating: number }>
  }
  cta: {
    storyBanner: { eyebrow: string; title: string; text: string; button: string }
    estimateBanner: { eyebrow: string; title: string; text: string; button: string }
    processBanner: { eyebrow: string; title: string; text: string; button: string }
    galleryBanner: { eyebrow: string; title: string; text: string; button: string }
    faqBanner: { eyebrow: string; title: string; text: string; button: string }
    testimonialsBanner: { eyebrow: string; title: string; button: string }
    mobileBar: { calculate: string; write: string }
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
    telegram: string
    whatsapp: string
    viber: string
    mapEmbedUrl: string
  }
  footer: { line: string; ctaButton: string; rights: string; privacy: string }
}

export const content: Record<Locale, SiteCopy> = {  uk: {
    localeName: 'UA',
    metaTitle: 'eLITstroy — ремонт квартир під ключ',
    metaDescription: 'Ремонт квартир під ключ без головного болю: дизайн-проєкт, фіксований кошторис, контроль строків і гарантія.',
    brand: { image: '/brand-mark.png', top: 'ELIT', bottom: 'STROY' },
    nav: {
      story: 'Підхід',
      architecture: 'Ремонт',
      estimate: 'Розрахунок',
      process: 'Процес',
      contact: 'Контакти'
    },
    common: { discuss: 'Обговорити проєкт', details: 'Детальніше', optional: 'Необов’язково' },
    hero: {
      eyebrow: 'Ремонт квартир × під ключ',
      titleTop: 'Ремонт',
      titleAccent: 'під ключ, без головного болю',
      lead: 'Ви бачите ціну та результат до старту робіт. Далі — без вашого втручання: дизайн-проєкт, закупівлі, роботи та здача під нашим контролем.',
      primary: 'Розрахувати мій ремонт',
      secondary: 'Дивитись етапи та ціни',
      availability: 'Вільні слоти · 2026',
      scroll: 'Гортайте, щоб дослідити',
      model: 'Concept 01 / City line',
      image: '/images/hero-cabin.webp',
      stats: [
        { value: '01', label: 'єдина команда' },
        { value: '360°', label: 'цикл ремонту' },
        { value: 'UA / EN', label: 'для власників та інвесторів' }
      ]
    },
    story: {
      eyebrow: 'Ремонт, який можна спланувати',
      title: 'Створюємо не ремонт заради ремонту. Створюємо простір із власним сценарієм життя.',
      lead: 'Поєднуємо обстеження об’єкта, виразний дизайн-проєкт і дисципліну реалізації. Кожне рішення працює на зручність простору сьогодні та його вартість завтра.',
      quote: 'Ремонт має не просто завершитися. Він має працювати на вас.',
      formationImage: '/images/story-interior.webp',
      cards: [
        {
          number: '01',
          title: 'Обстеження об’єкта',
          body: 'Оцінюємо стан квартири, комунікації, перекриття та приховані ризики ще до першої цифри в кошторисі.',
          image: '/images/story-location.webp',
          tag: 'ОГЛЯД / СТАН'
        },
        {
          number: '02',
          title: 'Дизайн-проєкт',
          body: 'Проєктуємо планування, світло та матеріали як досвід, у якому зручно жати щодня.',
          image: '/images/story-interior.webp',
          tag: 'ПРОЄКТ / ПРОСТІР'
        },
        {
          number: '03',
          title: 'Фіксована кошторис',
          body: 'Формуємо прозорий бюджет, графік робіт і поетапне приймання — без головного болю у фіналі.',
          image: '/images/story-management.webp',
          tag: 'ПІД КЛЮЧ / БЮДЖЕТ'
        }
      ]
    },
    value: {
      eyebrow: 'Повна система реалізації ремонту',
      marquee: 'PLAN · DEMOLITION · ROUGH-IN · FINISHING · HANDOVER · ',
      title: 'Три дисципліни працюють як один механізм.',
      lead: 'Ми не передаємо квартиру між розрізненими бригадами. Проєкт, реалізація та контроль якості розвиваються одночасно й підтримують єдиний графік об’єкта.',
      items: [
        { index: '01', title: 'Ремонт як система', body: 'Кошторис, графік і дизайн фіксуються до старту. Рішення ухвалюються до першого етапу робіт, а не по ходу.', metric: '01', metricLabel: 'цілісний проєкт' },
        { index: '02', title: 'Реалізація без розривів', body: 'Ви приймаєте кожен етап за чек-листом і фотоотчётом. Наступний етап не починається без вашого «так».', metric: '360°', metricLabel: 'контроль циклу' },
        { index: '03', title: 'Контроль після здачі', body: '24 місяці гарантії: якщо щось не так, виправляємо за свій рахунок — без нагадувань.', metric: '24', metricLabel: 'місяці гарантії' }
      ]
    },
    architecture: {
      eyebrow: 'Одна квартира. Чотири шари цінності.',
      title: 'Ремонт, спроєктований як система',
      intro: 'Розкладаємо ремонт на складові — від обстеження до здачі. Гортайте, щоб побачити логіку процесу.',
      drag: 'Сцена реагує на рух',
      chapters: [
        {
          index: '01',
          eyebrow: 'Основа',
          title: 'Стан квартири формує кошторис',
          body: 'Комунікації, перекриття, вологість і стан стін визначають обсяг підготовчих робіт і реальний бюджет.',
          metric: '48 год',
          metricLabel: 'на діагностику об’єкта',
          image: '/images/arch-plot.webp',
          tag: '01 · ОГЛЯД'
        },
        {
          index: '02',
          eyebrow: 'Черновий етап',
          title: 'Інженерія формує надійність',
          body: 'Демонтаж, електрика, сантехніка та вирівнювання створюють основу, яка служить десятиліттями.',
          metric: '120+',
          metricLabel: 'контрольних точок',
          image: '/images/arch-facade.webp',
          tag: '02 · ЧОРНОВІ РОБОТИ'
        },
        {
          index: '03',
          eyebrow: 'Чистова оздоблення',
          title: 'Деталі формують характер',
          body: 'Матеріали, світло, сантехніка й меблі збираються у простір, який виглядає продуманим до дрібниць.',
          metric: '4 етапи',
          metricLabel: 'поетапного приймання',
          image: '/images/gallery-built-to-last.webp',
          tag: '03 · ОЗДОБЛЕННЯ'
        },
        {
          index: '04',
          eyebrow: 'Здача',
          title: 'Сервіс формує спокій',
          body: 'Професійне прибирання, інструктаж, документація та гарантійна підтримка після здачі об’єкта.',
          metric: '24 міс',
          metricLabel: 'гарантії на роботи',
          image: '/images/arch-service.webp',
          tag: '04 · ЗДАЧА'
        }
      ]
    },
    gallery: {
      eyebrow: 'Простори, які запам’ятовують',
      title: 'Не каталог ремонтів. Колекція готових сценаріїв життя.',
      intro: 'Вертикальний скрол перетворюється на горизонтальну подорож — від першого огляду квартири до деталей чистової оздоблення.',
      cue: 'Гортайте далі',
      items: [
        { index: '01', title: 'Свіжий старт', location: 'Студія 38 м²', image: '/images/gallery-forest-frame.webp', tag: 'ПІД КЛЮЧ' },
        { index: '02', title: 'Тихий інтер’єр', location: 'Спальня 62 м²', image: '/images/gallery-quiet-interior.webp', tag: 'ІНТЕР’ЄР' },
        { index: '03', title: 'Приватний ритуал', location: 'Санвузол та відновлення', image: '/images/gallery-private-ritual.webp', tag: 'САНВУЗОЛ' },
        { index: '04', title: 'Відкритий простір', location: 'Кухня-вітальня 74 м²', image: '/images/gallery-remote-ground.webp', tag: 'ПЛАНУВАННЯ' },
        { index: '05', title: 'Створено надовго', location: 'Контроль інженерії', image: '/images/gallery-built-to-last.webp', tag: 'ЧОРНОВІ РОБОТИ' },
        { index: '06', title: 'Готово до життя', location: 'Здача під ключ', image: '/images/gallery-visible-asset.webp', tag: 'ЗДАЧА' }
      ]
    },
    estimate: {
      eyebrow: 'Демонстраційний розрахунок',
      title: 'Дізнайтесь ціну ремонту за 30 секунд',
      intro: 'Пересуньте повзунок — побачите орієнтир одразу. Точну цифру зафіксуємо в договорі після огляду, і вона не зросте.',
      area: 'Площа квартири',
      areaUnit: 'м²',
      condition: 'Тип об’єкта',
      renovation: 'Тип ремонту',
      total: 'Орієнтовна вартість',
      perSqm: 'Вартість за м²',
      timeline: 'Термін робіт',
      weeksUnit: 'тижнів',
      estimateLabel: 'Орієнтир',
      disclaimer: 'Розрахунок є демонстраційним, не є публічною офертою. Фактична вартість залежає від стану об’єкта, комплектації матеріалів, обсягу робіт та ринкових умов.',
      conditions: [
        { id: 'new', name: 'Новобудова', multiplier: 1 },
        { id: 'secondary', name: 'Вторинний ринок', multiplier: 1.18 }
      ],
      renovationTypes: [
        { id: 'cosmetic', name: 'Косметичний', description: 'Оновлення оздоблення без перепланування', pricePerSqm: 190, weeksPerSqm: 0.05 },
        { id: 'capital', name: 'Капітальний', description: 'Інженерія, стіни, підлога, сантехніка', pricePerSqm: 340, weeksPerSqm: 0.1 },
        { id: 'turnkey', name: 'Під ключ', description: 'Проєкт, матеріали, роботи та здача повністю', pricePerSqm: 520, weeksPerSqm: 0.14 }
      ]
    },
    assurance: {
      eyebrow: 'Контроль замість припущень',
      title: 'Ви бачите ремонт з чотирьох сторін.',
      lead: 'Кошторис, графік, матеріали та здача — чотири точки контролю в одному договорі.',
      metrics: [
        { value: '01', label: 'Кошторис і бюджет', detail: 'Фіксуємо обсяг робіт, резерви, ціни матеріалів і правила прийняття рішень.' },
        { value: '02', label: 'Графік робіт', detail: 'Розкладаємо ремонт на етапи, залежності та відповідальних за кожен блок.' },
        { value: '03', label: 'Якість матеріалів', detail: 'Перевіряємо поставки, вузли й комплектацію на відповідність проєкту.' },
        { value: '04', label: 'Здача і гарантія', detail: 'Зводимо прибирання, документацію та гарантійні зобов’язання в одну картину.' }
      ]
    },
    process: {
      eyebrow: 'Від огляду до готової квартири',
      title: 'Складний процес. Проста комунікація.',
      intro: 'Ви отримуєте звіти й готові рішення, а не питання. Кожен етап закривається прийманням — наступний не стартує без вашого підтвердження.',
      steps: [
        {
          index: '01',
          title: 'Діагностика',
          body: 'Обстежуємо об’єкт, фіксуємо стан, заміри та критерії майбутнього ремонту.',
          image: '/images/step-strategy.webp'
        },
        {
          index: '02',
          title: 'Проєкт',
          body: 'Збираємо планування, матеріали та фінансовий сценарій в одну модель.',
          image: '/images/step-concept.webp'
        },
        {
          index: '03',
          title: 'Ремонт',
          body: 'Керуємо закупівлями, термінами, якістю та поетапним прийманням робіт.',
          image: '/images/step-delivery.webp'
        },
        {
          index: '04',
          title: 'Здача',
          body: 'Завершуємо оздоблення, прибирання та передаємо квартиру з гарантією.',
          image: '/images/step-launch.webp'
        }
      ],
      trustTitle: 'Ваш ремонт залишається зрозумілим',
      trustBody: 'Структурована звітність і єдина точка комунікації допомагають приймати рішення без інформаційного шуму.',
      trustItems: ['Етапність і контрольні точки', 'Прозора кошторис', 'Єдина команда реалізації'],
      trustImage: '/images/trust-system.webp',
      trustBadge: 'ELIT-STROY · МАТРИЦЯ КОНТРОЛЮ'
    },
    faq: {
      eyebrow: 'Відповіді без дрібного шрифту',
      title: 'Що важливо знати до старту',
      lead: 'Ключові питання, які допомагають зрозуміти формат співпраці ще до першої зустрічі.',
      items: [
        { question: 'Чи можна почати без дизайн-проєкту?', answer: 'Так. Для косметичного ремонту достатньо узгодженого списку робіт. Для капітального ремонту та формату «під ключ» ми рекомендуємо проєкт: він захищає бюджет від імпровізацій у процесі.' },
        { question: 'Коли фіксується точна кошторис?', answer: 'Після обстеження об’єкта, замірів і затвердження комплектації матеріалів. Демонстраційний калькулятор показує логіку ціноутворення, але не замінює індивідуальний розрахунок.' },
        { question: 'Що входить у ремонт під ключ?', answer: 'Дизайн-проєкт, демонтаж, інженерні мережі, чорнові та чистові роботи, закупівля матеріалів, меблювання, прибирання та здача. Ви отримуєте готову квартиру без власного контролю будівельного процесу.' },
        { question: 'Як контролюються строки та якість?', answer: 'Через етапи з контрольними точками, фотоотчети, поетапне приймання та єдину відповідальну команду. Формат звітності погоджується на старті проєкту.' }
      ]
    },
    testimonials: {
      eyebrow: 'Досвід наших клієнтів',
      title: 'Ремонт без головного болю — словами клієнтів',
      lead: 'Не обіцянки, а відчуття людей, які вже пройшли шлях від першого огляду до готової квартири.',
      items: [
        { quote: 'Найцінніше — я завжди розуміла, що відбувається. Графік був перед очима, фото звітів приходили регулярно, а всі питання команда вирішувала без моєї участі.', author: 'Олена К.', role: 'Новобудова · 64 м²', rating: 5 },
        { quote: 'Кошторис погодили до старту, і він не зріс ні на долар без нашого рішення. Вперше ремонт відчувався як керований проєкт, а не нескінченна низка проблем.', author: 'Андрій М.', role: 'Капітальний ремонт · 78 м²', rating: 5 },
        { quote: 'Я був в іншому місті й контролював усе з телефону. Фото, статус, платежі та наступні кроки були в одному чаті. Приїхав уже приймати готову квартиру.', author: 'Дмитро В.', role: 'Інвестиційна квартира · 52 м²', rating: 5 },
        { quote: 'Поетапне приймання дало спокій: ми бачили якість до того, як роботи переходили далі. У фіналі отримали саме той простір, який погодили в проєкті.', author: 'Марія та Ігор', role: 'Ремонт під ключ · 91 м²', rating: 5 }
      ]
    },
    cta: {
      storyBanner: { eyebrow: 'Ваш об’єкт', title: 'Цей підхід працює і для вашої квартири.', text: 'Розкажіть про планування та стан — покажемо, як це виглядає у вашому бюджеті.', button: 'Порахувати мій ремонт' },
      estimateBanner: { eyebrow: 'Точний розрахунок', title: 'Це орієнтир. Ваша цифра — точніше.', text: 'Залиште телефон — за 20 хвилин уточнимо деталі та зафіксуємо точну цифру. Без тиску й без зобов’язань.', button: 'Отримати точний розрахунок' },
      processBanner: { eyebrow: 'Перший крок', title: 'Ремонт без головного болю починається з однієї розмови.', text: 'За 20 хвилин визначимо формат робіт, реалістичний бюджет і наступний крок.', button: 'Обговорити квартиру' },
      galleryBanner: { eyebrow: 'Наступний проєкт', title: 'Хочете такий самий результат?', text: 'Покажемо, як досягти цього рівня у вашій квартирі — з фіксованою ціною та строками до старту.', button: 'Обговорити мою квартиру' },
      faqBanner: { eyebrow: 'Залишились питання', title: 'Одна розмова закриє всі.', text: 'За 20 хвилин обговоримо ваш об’єкт, бюджет і строки — без зобов’язань.', button: 'Написати нам' },
      testimonialsBanner: { eyebrow: 'Ваш проєкт', title: 'Наступна історія про спокійний ремонт може бути вашою.', button: 'Розрахувати мій ремонт' },
      mobileBar: { calculate: 'Розрахувати', write: 'Написати' }
    },
    contact: {
      eyebrow: 'Почнімо з вашої квартири',
      title: 'Який ремонт ви хочете отримати?',
      lead: 'Залиште контакти — повернемось із розрахунком протягом робочого дня. Спершу питання по вашій квартирі, потім цифри. Без тиску й без зобов’язань.',
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
        interestOptions: ['Ремонт під ключ', 'Капітальний ремонт', 'Косметичний ремонт', 'Поки вивчаю можливості'],
        consent: 'Погоджуюся на обробку даних для зворотного зв’язку',
        submit: 'Запланувати розмову'
      },
      errors: { required: 'Заповніть це поле', contact: 'Вкажіть коректний телефон або email', consent: 'Потрібна ваша згода' },
      successTitle: 'Запит сформовано',
      successBody: 'Дані заявки збережено. Ми зв’яжемося з вами протягом робочого дня.',
      successAgain: 'Надіслати ще один запит',
      mapLabel: 'Точка координації · Харків',
      telegram: 'https://t.me/elitstroy',
      whatsapp: 'https://wa.me/380000000000',
      viber: 'viber://chat?number=%2B380000000000',
      mapEmbedUrl: 'https://www.google.com/maps?q=Kharkiv%2C+Ukraine&z=12&output=embed'
    },
    footer: { line: 'Ремонт без головного болю. Від огляду до здачі.', ctaButton: 'Обговорити проєкт', rights: 'eLITstroy. Концепт 2026.', privacy: 'Дані не передаються третім сторонам' }
  },
  en: {
    localeName: 'EN',
    metaTitle: 'eLITstroy — turnkey apartment renovation',
    metaDescription: 'Turnkey apartment renovation without the headache: design, fixed estimate, schedule control and warranty.',
    brand: { image: '/brand-mark.png', top: 'ELIT', bottom: 'STROY' },
    nav: { story: 'Approach', architecture: 'Renovation', estimate: 'Estimate', process: 'Process', contact: 'Contact' },
    common: { discuss: 'Discuss a project', details: 'Explore', optional: 'Optional' },
    hero: {
      eyebrow: 'Apartment renovation × turnkey',
      titleTop: 'Renovation',
      titleAccent: 'turnkey, zero headaches',
      lead: 'You see the price and the result before work begins. From there, you stay hands-off: design project, procurement, works and handover are all under our control.',
      primary: 'Estimate my renovation',
      secondary: 'See stages and pricing',
      availability: 'Open slots · 2026',
      scroll: 'Scroll to explore',
      model: 'Concept 01 / City line',
      image: '/images/hero-cabin.webp',
      stats: [
        { value: '01', label: 'integrated team' },
        { value: '360°', label: 'renovation cycle' },
        { value: 'UA / EN', label: 'for owners and investors' }
      ]
    },
    story: {
      eyebrow: 'A renovation you can plan',
      title: 'We do not renovate for the sake of renovating. We create a space with its own living scenario.',
      lead: 'Property survey, expressive design and delivery discipline work together. Every decision improves daily comfort today and the value of the apartment tomorrow.',
      quote: 'A renovation should not simply end. It should work for you.',
      formationImage: '/images/story-interior.webp',
      cards: [
        {
          number: '01',
          title: 'Property survey',
          body: 'We assess the condition, utilities, slabs and hidden risks before the first number enters the estimate.',
          image: '/images/story-location.webp',
          tag: 'SURVEY / CONDITION'
        },
        {
          number: '02',
          title: 'Design project',
          body: 'We design layout, lighting and materials as an experience people enjoy living in every day.',
          image: '/images/story-interior.webp',
          tag: 'DESIGN / SPACES'
        },
        {
          number: '03',
          title: 'Fixed estimate',
          body: 'We create a transparent budget, work schedule and stage-by-stage acceptance — without the headache at the finish line.',
          image: '/images/story-management.webp',
          tag: 'TURNKEY / BUDGET'
        }
      ]
    },
    value: {
      eyebrow: 'A complete renovation system',
      marquee: 'PLAN · DEMOLITION · ROUGH-IN · FINISHING · HANDOVER · ',
      title: 'Three disciplines work as one delivery mechanism.',
      lead: 'We do not pass the apartment between disconnected crews. Design, delivery and quality control evolve together around one schedule.',
      items: [
        { index: '01', title: 'Renovation as a system', body: 'Estimate, schedule and design are fixed before work starts. Decisions are made up front, not along the way.', metric: '01', metricLabel: 'integrated project' },
        { index: '02', title: 'Delivery without gaps', body: 'You accept every stage against a checklist and photo report. The next stage never starts without your approval.', metric: '360°', metricLabel: 'cycle control' },
        { index: '03', title: 'Care after handover', body: '24 months of warranty: if something is off, we fix it at our cost — without reminders.', metric: '24', metricLabel: 'months of warranty' }
      ]
    },
    architecture: {
      eyebrow: 'One apartment. Four layers of value.',
      title: 'A renovation designed as a system',
      intro: 'We break the renovation down into layers — from survey to handover. Scroll to discover how the process works.',
      drag: 'Scene responds to movement',
      chapters: [
        {
          index: '01',
          eyebrow: 'Foundation',
          title: 'Condition shapes the estimate',
          body: 'Utilities, slabs, moisture and wall condition define the preparation scope and the realistic budget.',
          metric: '48 hrs',
          metricLabel: 'to survey the property',
          image: '/images/arch-plot.webp',
          tag: '01 · SURVEY'
        },
        {
          index: '02',
          eyebrow: 'Rough-in',
          title: 'Engineering creates reliability',
          body: 'Demolition, electrics, plumbing and levelling build the base that lasts for decades.',
          metric: '120+',
          metricLabel: 'checkpoints',
          image: '/images/arch-facade.webp',
          tag: '02 · ROUGH-IN'
        },
        {
          index: '03',
          eyebrow: 'Finishing',
          title: 'Details create character',
          body: 'Materials, lighting, sanitary ware and furniture come together into a space considered down to the details.',
          metric: '4 stages',
          metricLabel: 'of staged acceptance',
          image: '/images/gallery-built-to-last.webp',
          tag: '03 · FINISHING'
        },
        {
          index: '04',
          eyebrow: 'Handover',
          title: 'Service creates peace of mind',
          body: 'Professional cleaning, walkthrough, documentation and warranty support after the keys are handed over.',
          metric: '24 mo',
          metricLabel: 'workmanship warranty',
          image: '/images/arch-service.webp',
          tag: '04 · HANDOVER'
        }
      ]
    },
    gallery: {
      eyebrow: 'Spaces worth remembering',
      title: 'Not a catalogue of renovations. A collection of ready living scenarios.',
      intro: 'Vertical scrolling becomes a horizontal journey — from the first apartment walkthrough to the details of finishing.',
      cue: 'Keep scrolling',
      items: [
        { index: '01', title: 'Fresh Start', location: 'Studio 38 m²', image: '/images/gallery-forest-frame.webp', tag: 'TURNKEY' },
        { index: '02', title: 'Quiet Interior', location: 'Bedroom 62 m²', image: '/images/gallery-quiet-interior.webp', tag: 'INTERIOR' },
        { index: '03', title: 'Private Ritual', location: 'Bathroom and recovery', image: '/images/gallery-private-ritual.webp', tag: 'BATHROOM' },
        { index: '04', title: 'Open Ground', location: 'Kitchen-living 74 m²', image: '/images/gallery-remote-ground.webp', tag: 'LAYOUT' },
        { index: '05', title: 'Built to Last', location: 'Engineering control', image: '/images/gallery-built-to-last.webp', tag: 'ROUGH-IN' },
        { index: '06', title: 'Ready to Live', location: 'Turnkey handover', image: '/images/gallery-visible-asset.webp', tag: 'HANDOVER' }
      ]
    },
    estimate: {
      eyebrow: 'Demonstration model',
      title: 'Learn your renovation price in 30 seconds',
      intro: 'Move the slider and see an indicative figure instantly. The precise number is fixed in the contract after the survey — and it will not grow.',
      area: 'Apartment area',
      areaUnit: 'm²',
      condition: 'Property type',
      renovation: 'Renovation type',
      total: 'Indicative cost',
      perSqm: 'Cost per m²',
      timeline: 'Timeline',
      weeksUnit: 'weeks',
      estimateLabel: 'Estimate',
      disclaimer: 'This calculation is for demonstration only and is not a public offer. Actual cost depends on property condition, material specification, scope of works and market conditions.',
      conditions: [
        { id: 'new', name: 'New build', multiplier: 1 },
        { id: 'secondary', name: 'Secondary market', multiplier: 1.18 }
      ],
      renovationTypes: [
        { id: 'cosmetic', name: 'Cosmetic', description: 'Finishing refresh without layout changes', pricePerSqm: 190, weeksPerSqm: 0.05 },
        { id: 'capital', name: 'Capital', description: 'Engineering, walls, floors, plumbing', pricePerSqm: 340, weeksPerSqm: 0.1 },
        { id: 'turnkey', name: 'Turnkey', description: 'Design, materials, works and full handover', pricePerSqm: 520, weeksPerSqm: 0.14 }
      ]
    },
    assurance: {
      eyebrow: 'Control instead of assumptions',
      title: 'You see the renovation from four sides.',
      lead: 'Estimate, schedule, materials and handover — four control points in one contract.',
      metrics: [
        { value: '01', label: 'Estimate and budget', detail: 'We define the scope, reserves, material prices and decision rules.' },
        { value: '02', label: 'Work schedule', detail: 'We map the renovation into stages, dependencies and accountable owners.' },
        { value: '03', label: 'Material quality', detail: 'Deliveries, details and specification are checked against the design project.' },
        { value: '04', label: 'Handover and warranty', detail: 'Cleaning, documentation and warranty obligations come together in one view.' }
      ]
    },
    process: {
      eyebrow: 'From walkthrough to ready apartment',
      title: 'A complex process. Simple communication.',
      intro: 'You receive reports and ready decisions, not questions. Every stage closes with acceptance — the next one never starts without your confirmation.',
      steps: [
        {
          index: '01',
          title: 'Survey',
          body: 'We inspect the property, record condition, measurements and criteria for the future renovation.',
          image: '/images/step-strategy.webp'
        },
        {
          index: '02',
          title: 'Design',
          body: 'We combine layout, materials and the financial scenario into one model.',
          image: '/images/step-concept.webp'
        },
        {
          index: '03',
          title: 'Renovation',
          body: 'We manage procurement, timing, quality and staged acceptance of works.',
          image: '/images/step-delivery.webp'
        },
        {
          index: '04',
          title: 'Handover',
          body: 'We complete finishing, cleaning and hand the apartment over with a warranty.',
          image: '/images/step-launch.webp'
        }
      ],
      trustTitle: 'Your renovation stays understandable',
      trustBody: 'Structured reporting and one point of communication help you make decisions without the noise.',
      trustItems: ['Clear milestones', 'Transparent estimate', 'One delivery team'],
      trustImage: '/images/trust-system.webp',
      trustBadge: 'ELIT-STROY · CONTROL MATRIX'
    },
    faq: {
      eyebrow: 'Answers without the fine print',
      title: 'What matters before you start',
      lead: 'The essential questions that clarify the engagement before the first meeting.',
      items: [
        { question: 'Can I start without a design project?', answer: 'Yes. Cosmetic renovation only needs an agreed scope of works. For capital and turnkey renovation we recommend a design project: it protects the budget from improvisation during the process.' },
        { question: 'When is the precise estimate fixed?', answer: 'After the property survey, measurements and material specification are approved. The demonstration calculator explains the pricing logic but does not replace an individual quotation.' },
        { question: 'What does turnkey renovation include?', answer: 'Design project, demolition, engineering, rough and finishing works, material procurement, furnishing, cleaning and handover. You receive a ready apartment without managing the construction process yourself.' },
        { question: 'How are schedule and quality controlled?', answer: 'Through milestones with checkpoints, photo reports, staged acceptance and one accountable team. The reporting format is agreed at project start.' }
      ]
    },
    testimonials: {
      eyebrow: 'Client experience',
      title: 'A headache-free renovation — in our clients’ words',
      lead: 'Not promises, but the experience of people who have already gone from the first survey to a finished apartment.',
      items: [
        { quote: 'The most valuable part was always knowing what was happening. The schedule was visible, photo reports arrived regularly, and the team resolved every issue without pulling me into it.', author: 'Olena K.', role: 'New build · 64 m²', rating: 5 },
        { quote: 'We agreed the estimate before work began, and it did not grow by a single dollar without our decision. For once, renovation felt like a managed project rather than an endless series of problems.', author: 'Andrii M.', role: 'Capital renovation · 78 m²', rating: 5 },
        { quote: 'I was in another city and managed everything from my phone. Photos, status, payments and next steps stayed in one chat. I only arrived to accept the finished apartment.', author: 'Dmytro V.', role: 'Investment apartment · 52 m²', rating: 5 },
        { quote: 'Stage-by-stage acceptance gave us peace of mind: we saw the quality before work moved forward. In the end, we received exactly the space approved in the design.', author: 'Mariia and Ihor', role: 'Turnkey renovation · 91 m²', rating: 5 }
      ]
    },
    cta: {
      storyBanner: { eyebrow: 'Your property', title: 'This approach works for your apartment too.', text: 'Tell us about the layout and condition — we will show what it looks like within your budget.', button: 'Estimate my renovation' },
      estimateBanner: { eyebrow: 'Precise quotation', title: 'This is a guide. Your number can be precise.', text: 'Leave your phone number — in 20 minutes we will clarify the details and fix the exact figure. No pressure, no obligations.', button: 'Get a precise quotation' },
      processBanner: { eyebrow: 'First step', title: 'A headache-free renovation starts with one conversation.', text: 'In 20 minutes, we will define the right format, a realistic budget and the next step.', button: 'Discuss your apartment' },
      galleryBanner: { eyebrow: 'Next project', title: 'Want the same result?', text: 'We will show how to reach this level in your apartment — with a fixed price and schedule before work starts.', button: 'Discuss my apartment' },
      faqBanner: { eyebrow: 'Still have questions', title: 'One conversation closes them all.', text: 'In 20 minutes we will cover your property, budget and timeline — no obligations.', button: 'Message us' },
      testimonialsBanner: { eyebrow: 'Your project', title: 'The next story about a calm renovation could be yours.', button: 'Estimate my renovation' },
      mobileBar: { calculate: 'Estimate', write: 'Message us' }
    },
    contact: {
      eyebrow: 'Let us start with your apartment',
      title: 'What kind of renovation do you want?',
      lead: 'Leave your details — we will come back with a quotation within one business day. First questions about your apartment, then numbers. No pressure, no obligations.',
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
        interestOptions: ['Turnkey renovation', 'Capital renovation', 'Cosmetic renovation', 'Exploring the opportunity'],
        consent: 'I agree to the processing of my data for a reply',
        submit: 'Schedule a conversation'
      },
      errors: { required: 'Please complete this field', contact: 'Enter a valid phone or email', consent: 'Your consent is required' },
      successTitle: 'Your request is ready',
      successBody: 'Your request has been received. We will get back to you within one business day.',
      successAgain: 'Create another request',
      mapLabel: 'Coordination point · Kharkiv',
      telegram: 'https://t.me/elitstroy',
      whatsapp: 'https://wa.me/380000000000',
      viber: 'viber://chat?number=%2B380000000000',
      mapEmbedUrl: 'https://www.google.com/maps?q=Kharkiv%2C+Ukraine&z=12&output=embed'
    },
    footer: { line: 'A headache-free renovation. From survey to handover.', ctaButton: 'Discuss a project', rights: 'eLITstroy. Concept 2026.', privacy: 'Your data is not shared with third parties' }
  }
}

const isPlainObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value)

const mergeDeep = <T>(base: T, override: unknown): T => {
  if (!isPlainObject(base) || !isPlainObject(override)) {
    return (override === undefined ? base : override) as T
  }
  const merged: Record<string, unknown> = { ...base }
  for (const [key, value] of Object.entries(override)) {
    merged[key] = key in base ? mergeDeep((base as Record<string, unknown>)[key], value) : value
  }
  return merged as T
}

export const loadContent = async (): Promise<Record<Locale, SiteCopy>> => {
  try {
    const response = await fetch(`${import.meta.env.BASE_URL}content.json`, { cache: 'no-cache' })
    if (!response.ok) return content
    const data = (await response.json()) as Partial<Record<Locale, unknown>>
    return {
      uk: mergeDeep(content.uk, data.uk),
      en: mergeDeep(content.en, data.en)
    }
  } catch {
    return content
  }
}
