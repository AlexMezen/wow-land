export type Locale = 'uk' | 'en'

type Stat = {
  value: string
  label: string
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
  nav: { estimate: string; process: string; contact: string }
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
  packages: {
    eyebrow: string
    title: string
    intro: string
    items: Array<{
      name: string
      badge: string
      pricePerSqm: string
      timeline: string
      guarantee: string
      description: string
      features: string[]
      cta: string
    }>
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
    items: Array<{
      image: string
      messenger: 'Telegram' | 'Viber' | 'WhatsApp'
      author: string
      role: string
      quote: string
      rating: number
    }>
  }
  cta: {
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
      estimate: 'Розрахунок',
      process: 'Процес',
      contact: 'Контакти'
    },
    common: { discuss: 'Обговорити проєкт', details: 'Детальніше', optional: 'Необов’язково' },
    hero: {
      eyebrow: 'Ремонт квартир × під ключ',
      titleTop: 'Ремонт',
      titleAccent: 'під ключ, без головного болю',
      lead: 'Фіксований кошторис у договорі — 0 прихованих доплат. Поетапна оплата — платите лише за прийняті роботи. Гарантія 24 місяці на письмі. 120+ об’єктів здано в строк. Ви бачите ціну та 3D-результат до старту робіт, далі — без вашого втручання.',
      primary: 'Розрахувати ремонт',
      secondary: 'Дивитись ціни',
      availability: '3 вільні слоти · 2026',
      scroll: 'Гортайте, щоб дослідити',
      model: 'Concept 01 / City line',
      image: '/images/hero-cabin.webp',
      stats: [
        { value: '24 міс', label: 'гарантія на роботи' },
        { value: '20 хв', label: 'до відповіді на запит' },
        { value: '120+', label: 'об’єктів здано в строк' }
      ]
    },
    packages: {
      eyebrow: 'Прозорі пакети з фіксованою ціною',
      title: 'Термін і гарантія - у договорі.',
      intro: 'Оберіть рівень робіт — ціну за м², термін і гарантію ви бачите одразу. Точну цифру зафіксуємо в договорі після безкоштовного огляду, і вона не зросте ні на долар без вашого рішення.',
      items: [
        {
          name: 'Косметичний',
          badge: 'Швидке оновлення',
          pricePerSqm: 'від $190/м²',
          timeline: '3–5 тижнів',
          guarantee: 'Гарантія 12 міс',
          description: 'Оновлення оздоблення без перепланування та заміни інженерії. Для квартир у жилому стані, де потрібен свіжий вигляд.',
          features: ['Фарбування стін та стель, заміна покриттів підлоги', 'Косметичний ремонт санвузла без заміни труб', 'Установка освітлення та розеток (до 20 точок)', 'Прибирання після робіт, вивіз сміття'],
          cta: 'Розрахувати косметичний'
        },
        {
          name: 'Капітальний',
          badge: 'Хіт продажів',
          pricePerSqm: 'від $340/м²',
          timeline: '6–10 тижнів',
          guarantee: 'Гарантія 24 міс',
          description: 'Інженерія, стіни, підлога та сантехніка з нуля. Основа, яка служить 20+ років без ремонту.',
          features: ['Демонтаж старих матеріалів, вирівнювання всіх поверхонь', 'Електрика та сантехніка з нуля — за проєктом', 'Гіпсокартон, стяжка, штукатурка, шпаклівка', 'Поетапне приймання з фотоотчетами після кожного етапу'],
          cta: 'Розрахувати капітальний'
        },
        {
          name: 'Під ключ',
          badge: 'Повний цикл',
          pricePerSqm: 'від $520/м²',
          timeline: '9–14 тижнів',
          guarantee: 'Гарантія 24 міс',
          description: 'Дизайн-проєкт, матеріали, роботи та здача повністю. Ви заїжджаєте в готову квартиру — без будівельного контролю з вашого боку.',
          features: ['Дизайн-проєкт та 3D-візуалізація до старту робіт', 'Закупівля матеріалів та меблювання під ключ', 'Усі роботи капітального + чистова оздоба та фінішний декор', 'Прибирання, документація та передача ключів — готово до життя'],
          cta: 'Розрахувати під ключ'
        }
      ]
    },
    gallery: {
      eyebrow: 'Простори, які запам’ятовують',
      title: '120+ об’єктів.',
      intro: 'Гортайте — від першого огляду квартири до деталей чистової оздоблення. Жодного «як вийде»: ви бачите результат у 3D ще до першого робітника на об’єкті.',
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
      intro: 'Пересуньте повзунок — побачите орієнтир одразу. Точну цифру зафіксуємо в договорі після огляду, і вона не зросте. Розрахунок за 30 секунд, відповідь — за 20 хвилин.',
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
    process: {
      eyebrow: 'Від огляду до готової квартири',
      title: 'Складний процес. Проста комунікація. ',
      intro: 'Ви отримуєте звіти й готові рішення, а не питання. Кожен етап закривається прийманням — наступний не стартує без вашого «так». Фотоотчети після кожного етапу, єдиний чат з командою.',
      steps: [
        {
          index: '01',
          title: 'Діагностика · безкоштовно',
          body: 'Виїзд прораба, обстеження об’єкта, заміри та фіксація стану. Ви отримуєте звіт про приховані ризики (комунікації, стіни, вологість) ще до кошторису — за 48 годин.',
          image: '/images/step-strategy.webp'
        },
        {
          index: '02',
          title: 'Проєкт · з 3D-візуалізацією',
          body: 'Планування, матеріали та фінансовий сценарій в одній моделі. Ви бачите результат у 3D до старту робіт — і затверджуєте його, а не виправляєте по ходу.',
          image: '/images/step-concept.webp'
        },
        {
          index: '03',
          title: 'Ремонт · поетапне приймання',
          body: 'Закупівлі, терміни, якість та поетапне приймання під єдиним контролем. Фотоотчети після кожного етапу. Ви платите лише за прийняті роботи — поетапно.',
          image: '/images/step-delivery.webp'
        },
        {
          index: '04',
          title: 'Здача · гарантія 24 міс',
          body: 'Прибирання, документація та передача ключів. Гарантія 24 місяці на письмі — виправляємо за свій рахунок, без нагадувань з вашого боку.',
          image: '/images/step-launch.webp'
        }
      ],
      trustTitle: 'Ваш ремонт залишається зрозумілим',
      trustBody: 'Структурована звітність і єдина точка комунікації допомагають приймати рішення без інформаційного шуму.',
      trustItems: ['Етапність і 120+ контрольних точок', 'Прозора кошторис — 0 прихованих доплат', 'Єдина команда реалізації під одним договором'],
      trustImage: '/images/trust-system.webp',
      trustBadge: 'ELIT-STROY · МАТРИЦЯ КОНТРОЛЮ'
    },
    faq: {
      eyebrow: 'Відповіді без дрібного шрифту',
      title: 'Що важливо знати до старту',
      lead: 'Ключові питання, які допомагають зрозуміти формат співпраці ще до першої зустрічі.',
      items: [
        { question: 'Чи можна почати без дизайн-проєкту?', answer: 'Так. Для косметичного ремонту достатньо узгодженого списку робіт. Для капітального та «під ключ» ми наполегливо рекомендуємо проєкт: він захищає бюджет від імпровізацій у процесі та знижує ризик переделок до нуля.' },
        { question: 'Коли фіксується точна кошторис?', answer: 'Після безкоштовного обстеження об’єкта, замірів і затвердження комплектації матеріалів. Демонстраційний калькулятор показує логіку ціноутворення, але не замінює індивідуальний розрахунок. Кошторис фіксуємо в договорі — 0 прихованих доплат.' },
        { question: 'Скільки часу займає ремонт?', answer: 'Косметичний — 3–5 тижнів, капітальний — 6–10, під ключ — 9–14 тижнів для квартири 60 м². Точний термін фіксуємо в договорі з штрафними санкціями у ваш бік за прострочення.' },
        { question: 'Що входить у ремонт під ключ?', answer: 'Дизайн-проєкт з 3D-візуалізацією, демонтаж, інженерні мережі, чорнові та чистові роботи, закупівля матеріалів, меблювання, прибирання та здача. Ви заїжджаєте в готову квартиру — без будівельного контролю з вашого боку.' },
        { question: 'Чи можна контролювати ремонт віддалено?', answer: 'Так. Фотоотчети, статус етапів, платежі та наступні кроки — в одному чаті. Ви можете бути в іншому місті й приймати етапи онлайн без виїзду на об’єкт. Понад 40% наших клієнтів — інвестори, які контролюють ремонт з телефону.' },
        { question: 'Як контролюються строки та якість?', answer: 'Через 120+ контрольних точок, фотоотчети після кожного етапу, поетапне приймання та єдину відповідальну команду. Формат звітності погоджується на старті проєкту. Ви платите лише за прийняті роботи.' },
        { question: 'Що якщо щось зламається після здачі?', answer: 'Гарантія 24 місяці на письмі в договорі. Якщо щось не так — виправляємо за свій рахунок, без нагадувань з вашого боку. Середній час реагування на гарантійний виклик — 48 годин.' }
      ]
    },
    testimonials: {
      eyebrow: 'Досвід наших клієнтів',
      title: 'Ремонт без головного болю — словами клієнтів',
      lead: 'Не обіцянки, а реальні переписки з людьми, які вже пройшли шлях від першого огляду до готової квартири.',
      items: [
        {
          image: '/images/testimonials/review-telegram-1.webp',
          messenger: 'Telegram',
          author: 'Анна К.',
          role: 'Новобудова · 64 м² · 7 тижнів',
          quote: '«Все зроблено якісно і точно в строк. Окреме дякую виконробу Олександру! Ремонт завершено раніше строку»',
          rating: 5
        },
        {
          image: '/images/testimonials/review-viber-2.webp',
          messenger: 'Viber',
          author: 'Марія І.',
          role: 'Ремонт під ключ · 91 м² · 12 тижнів',
          quote: '«Все як у 3D проєкті, якість на вищому рівні. Ванна та спальня вийшли неймовірними!»',
          rating: 5
        },
        {
          image: '/images/testimonials/review-whatsapp-3.webp',
          messenger: 'WhatsApp',
          author: 'Андрій М.',
          role: 'Капітальний ремонт · 78 м² · 9 тижнів',
          quote: '«Вклалися рівно в обумовлений кошторис без жодних сюрпризів. Окремий респект за ідеальну плитку»',
          rating: 5
        },
        {
          image: '/images/testimonials/review-telegram-4.webp',
          messenger: 'Telegram',
          author: 'Дмитро В.',
          role: 'Інвестиційна квартира · 52 м² · дистанційно',
          quote: '«Неймовірно зручно, що весь ремонт пройшов дистанційно, поки я був у відрядженні. Дякую за фото- та відеозвіти»',
          rating: 5
        },
        {
          image: '/images/testimonials/review-whatsapp-5.webp',
          messenger: 'WhatsApp',
          author: 'Олена К.',
          role: 'Сімейна квартира · 85 м² · 10 тижнів',
          quote: '«Заїхали з дітьми, все настільки затишно і якісно. Окрема подяка за ідеально рівні стіни та освітлення»',
          rating: 5
        },
        {
          image: '/images/testimonials/review-telegram-6.webp',
          messenger: 'Telegram',
          author: 'Сергій К.',
          role: 'Будинок під ключ · 120 м² · 14 тижнів',
          quote: '«Жодних затримок, кошторис без доплат, все чітко за договором. Дизайнер і майстри — справжні профі»',
          rating: 5
        },
        {
          image: '/images/testimonials/review-telegram-7.webp',
          messenger: 'Telegram',
          author: 'Вікторія С.',
          role: 'Новобудова · 72 м² · 8 тижнів',
          quote: '«Все настільки ідеально, що навіть прискіпливий чоловік не знайшов до чого придертися! Стіни, сантехніка, плитка — бездоганно»',
          rating: 5
        },
        {
          image: '/images/testimonials/review-viber-8.webp',
          messenger: 'Viber',
          author: 'Артем Л.',
          role: 'Капітальний ремонт · 65 м² · 7 тижнів',
          quote: '«Ремонт вийшов просто супер, окреме спасибі за допомогу з вибором матеріалів і збережений час!»',
          rating: 5
        },
        {
          image: '/images/testimonials/review-whatsapp-9.webp',
          messenger: 'WhatsApp',
          author: 'Михайло Т.',
          role: 'Квартира під ключ · 58 м² · 8 тижнів',
          quote: '«Прийняв об’єкт без жодних зауважень. Дуже круто, що кошторис не змінювався протягом робіт»',
          rating: 5
        },
        {
          image: '/images/testimonials/review-telegram-10.webp',
          messenger: 'Telegram',
          author: 'Юлія Б.',
          role: 'Дизайнерський ремонт · 94 м² · 11 тижнів',
          quote: '«Квартира вийшла просто казка! Всі друзі у захваті, дякуємо за втілення складного проєкту»',
          rating: 5
        },
        {
          image: '/images/testimonials/review-whatsapp-11.webp',
          messenger: 'WhatsApp',
          author: 'Богдан К.',
          role: 'Капітальний ремонт · 76 м² · 8 тижнів',
          quote: '«Підписали фінальний акт, все на вищому рівні. Жодного головного болю за всі 8 тижнів робіт»',
          rating: 5
        },
        {
          image: '/images/testimonials/review-telegram-12.webp',
          messenger: 'Telegram',
          author: 'Тетяна П.',
          role: 'Новобудова · 80 м² · 9 тижнів',
          quote: '«Вже розставили меблі, все виглядає неймовірно! Дякую за спокійний ремонт і підтримку»',
          rating: 5
        }
      ]
    },
    cta: {
      estimateBanner: { eyebrow: 'Точний розрахунок', title: 'Це орієнтир. Ваша цифра — точніше.', text: 'Залиште телефон — за 20 хвилин уточнимо деталі та зафіксуємо точну цифру в договорі. 120+ об’єктів здано, 24 міс гарантії, 0 прихованих доплат.', button: 'Отримати точний розрахунок' },
      processBanner: { eyebrow: 'Перший крок — безкоштовний', title: 'Ремонт без головного болю починається з однієї розмови.', text: 'За 20 хвилин визначимо формат робіт, реалістичний бюджет і наступний крок. Виїзд прораба на огляд — безкоштовно.', button: 'Запланувати огляд' },
      galleryBanner: { eyebrow: 'Наступний проєкт', title: 'Хочете такий самий результат?', text: 'Покажемо, як досягти цього рівня у вашій квартирі — з фіксованою ціною та строками до старту. 3D-проєкт до першого робітника.', button: 'Обговорити мою квартиру' },
      faqBanner: { eyebrow: 'Залишились питання', title: 'Одна розмова закриє всі.', text: 'За 20 хвилин обговоримо ваш об’єкт, бюджет і строки — без зобов’язань. Відповідь на запит — у середньому за 20 хвилин.', button: 'Написати нам' },
      testimonialsBanner: { eyebrow: 'Ваш проєкт', title: 'Наступна історія про спокійний ремонт може бути вашою.', button: 'Розрахувати ремонт' },
      mobileBar: { calculate: 'Розрахувати', write: 'Написати' }
    },
    contact: {
      eyebrow: 'Почнімо з вашої квартири',
      title: 'Який ремонт ви хочете отримати?',
      lead: 'Залиште контакти — повернемось із розрахунком протягом 20 хвилин у робочий час. Спершу питання по вашій квартирі, потім цифри. Безкоштовний виїзд прораба на огляд. Без тиску й без зобов’язань.',
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
    nav: { estimate: 'Estimate', process: 'Process', contact: 'Contact' },
    common: { discuss: 'Discuss a project', details: 'Explore', optional: 'Optional' },
    hero: {
      eyebrow: 'Apartment renovation × turnkey',
      titleTop: 'Renovation',
      titleAccent: 'turnkey, zero headaches',
      lead: 'Fixed estimate in the contract — 0 hidden charges. Staged payment — you only pay for accepted works. 24-month warranty in writing. 120+ projects delivered on schedule. You see the price and 3D result before work begins, then stay hands-off.',
      primary: 'Estimate my renovation',
      secondary: 'See stages and pricing',
      availability: '3 open slots · 2026',
      scroll: 'Scroll to explore',
      model: 'Concept 01 / City line',
      image: '/images/hero-cabin.webp',
      stats: [
        { value: '24 mo', label: 'workmanship warranty' },
        { value: '20 min', label: 'to a reply on your request' },
        { value: '120+', label: 'projects delivered on schedule' }
      ]
    },
    packages: {
      eyebrow: 'Transparent packages with a fixed price',
      title: 'Three renovation formats. Price per m², timeline and warranty — in the contract.',
      intro: 'Choose the scope of works — the price per m², timeline and warranty are visible upfront. The precise number is fixed in the contract after a free survey — and it will not grow by a single dollar without your decision.',
      items: [
        {
          name: 'Cosmetic',
          badge: 'Quick refresh',
          pricePerSqm: 'from $190/m²',
          timeline: '3–5 weeks',
          guarantee: '12-month warranty',
          description: 'Finishing refresh without layout changes or engineering replacement. For apartments in livable condition that need a fresh look.',
          features: ['Wall and ceiling painting, floor covering replacement', 'Cosmetic bathroom refresh without pipe replacement', 'Lighting and socket installation (up to 20 points)', 'Post-work cleaning and debris removal'],
          cta: 'Estimate cosmetic'
        },
        {
          name: 'Capital',
          badge: 'Best seller',
          pricePerSqm: 'from $340/m²',
          timeline: '6–10 weeks',
          guarantee: '24-month warranty',
          description: 'Engineering, walls, floors and plumbing from scratch. The base that lasts 20+ years without renovation.',
          features: ['Demolition of old materials, levelling of all surfaces', 'Electrics and plumbing from scratch — per design', 'Drywall, screed, plaster, putty', 'Staged acceptance with photo reports after every stage'],
          cta: 'Estimate capital'
        },
        {
          name: 'Turnkey',
          badge: 'Full cycle',
          pricePerSqm: 'from $520/m²',
          timeline: '9–14 weeks',
          guarantee: '24-month warranty',
          description: 'Design project, materials, works and full handover. You move into a ready apartment — without managing the construction.',
          features: ['Design project and 3D visualization before work begins', 'Material procurement and furnishing turnkey', 'All capital works + finishing and final decor', 'Cleaning, documentation and key handover — ready to live in'],
          cta: 'Estimate turnkey'
        }
      ]
    },
    gallery: {
      eyebrow: 'Spaces worth remembering',
      title: '120+ projects. Each — with a fixed price and schedule before work starts.',
      intro: 'Scroll through — from the first apartment walkthrough to finishing details. No "we’ll see how it turns out": you see the result in 3D before the first worker sets foot on site.',
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
      intro: 'Move the slider and see an indicative figure instantly. The precise number is fixed in the contract after the survey — and it will not grow. Estimate in 30 seconds, reply in 20 minutes.',
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
    process: {
      eyebrow: 'From walkthrough to ready apartment',
      title: 'A complex process. Simple communication. 4 stages, 120+ checkpoints.',
      intro: 'You receive reports and ready decisions, not questions. Every stage closes with acceptance — the next one never starts without your "yes". Photo reports after every stage, one chat with the team.',
      steps: [
        {
          index: '01',
          title: 'Survey · free of charge',
          body: 'Foreman site visit, property inspection, measurements and condition recording. You receive a report on hidden risks (utilities, walls, moisture) before the estimate — within 48 hours.',
          image: '/images/step-strategy.webp'
        },
        {
          index: '02',
          title: 'Design · with 3D visualization',
          body: 'Layout, materials and the financial scenario in one model. You see the result in 3D before work begins — and approve it, rather than fixing it on the go.',
          image: '/images/step-concept.webp'
        },
        {
          index: '03',
          title: 'Renovation · staged acceptance',
          body: 'Procurement, timing, quality and staged acceptance under one control. Photo reports after every stage. You only pay for accepted works — in stages.',
          image: '/images/step-delivery.webp'
        },
        {
          index: '04',
          title: 'Handover · 24-month warranty',
          body: 'Cleaning, documentation and key handover. 24-month warranty in writing — we fix issues at our cost, without reminders from your side.',
          image: '/images/step-launch.webp'
        }
      ],
      trustTitle: 'Your renovation stays understandable',
      trustBody: 'Structured reporting and one point of communication help you make decisions without the noise.',
      trustItems: ['Stages and 120+ checkpoints', 'Transparent estimate — 0 hidden charges', 'One delivery team under one contract'],
      trustImage: '/images/trust-system.webp',
      trustBadge: 'ELIT-STROY · CONTROL MATRIX'
    },
    faq: {
      eyebrow: 'Answers without the fine print',
      title: 'What matters before you start',
      lead: 'The essential questions that clarify the engagement before the first meeting.',
      items: [
        { question: 'Can I start without a design project?', answer: 'Yes. Cosmetic renovation only needs an agreed scope of works. For capital and turnkey we strongly recommend a project: it protects the budget from improvisation during the process and reduces the risk of rework to zero.' },
        { question: 'When is the precise estimate fixed?', answer: 'After a free property survey, measurements and material specification are approved. The demonstration calculator explains the pricing logic but does not replace an individual quotation. The estimate is fixed in the contract — 0 hidden charges.' },
        { question: 'How long does the renovation take?', answer: 'Cosmetic — 3–5 weeks, capital — 6–10, turnkey — 9–14 weeks for a 60 m² apartment. The exact timeline is fixed in the contract with penalty clauses in your favor for delays.' },
        { question: 'What does turnkey renovation include?', answer: 'Design project with 3D visualization, demolition, engineering, rough and finishing works, material procurement, furnishing, cleaning and handover. You move into a ready apartment — without managing the construction yourself.' },
        { question: 'Can I control the renovation remotely?', answer: 'Yes. Photo reports, stage status, payments and next steps — all in one chat. You can be in another city and accept stages online without visiting the site. Over 40% of our clients are investors who control renovation from their phone.' },
        { question: 'How are schedule and quality controlled?', answer: 'Through 120+ checkpoints, photo reports after every stage, staged acceptance and one accountable team. The reporting format is agreed at project start. You only pay for accepted works.' },
        { question: 'What if something breaks after handover?', answer: '24-month warranty in writing in the contract. If something is wrong — we fix it at our cost, without reminders from your side. Average response time on a warranty call — 48 hours.' }
      ]
    },
    testimonials: {
      eyebrow: 'Client experience',
      title: 'A headache-free renovation — in real chats',
      lead: 'Real messenger conversations with clients who have completed their renovation from first survey to move-in day.',
      items: [
        {
          image: '/images/testimonials/review-telegram-1.webp',
          messenger: 'Telegram',
          author: 'Anna K.',
          role: 'New build · 64 m² · 7 weeks',
          quote: '“Everything done to top quality and ahead of schedule. Special thanks to the foreman Oleksandr!”',
          rating: 5
        },
        {
          image: '/images/testimonials/review-viber-2.webp',
          messenger: 'Viber',
          author: 'Mariia I.',
          role: 'Turnkey renovation · 91 m² · 12 weeks',
          quote: '“Exactly as in the 3D design, top tier quality. The bathroom and bedroom turned out incredible!”',
          rating: 5
        },
        {
          image: '/images/testimonials/review-whatsapp-3.webp',
          messenger: 'WhatsApp',
          author: 'Andrii M.',
          role: 'Capital renovation · 78 m² · 9 weeks',
          quote: '“Stayed exactly within the agreed budget with zero surprises. Special respect for the tiling work”',
          rating: 5
        },
        {
          image: '/images/testimonials/review-telegram-4.webp',
          messenger: 'Telegram',
          author: 'Dmytro V.',
          role: 'Investment apartment · 52 m² · remotely',
          quote: '“Incredibly convenient to manage the whole renovation remotely. Thank you for regular photo and video reports”',
          rating: 5
        },
        {
          image: '/images/testimonials/review-whatsapp-5.webp',
          messenger: 'WhatsApp',
          author: 'Olena K.',
          role: 'Family apartment · 85 m² · 10 weeks',
          quote: '“Moved in with the kids, everything is so cozy and well-made. Level walls and lighting are perfect”',
          rating: 5
        },
        {
          image: '/images/testimonials/review-telegram-6.webp',
          messenger: 'Telegram',
          author: 'Serhii K.',
          role: 'Turnkey home · 120 m² · 14 weeks',
          quote: '“Zero delays, fixed estimate without surcharges, strictly by contract. Designer and craftsmen are real pros”',
          rating: 5
        },
        {
          image: '/images/testimonials/review-telegram-7.webp',
          messenger: 'Telegram',
          author: 'Viktoriia S.',
          role: 'New build · 72 m² · 8 weeks',
          quote: '“Everything is so flawless that even my meticulous husband found zero faults! Walls, plumbing, tiles are spotless”',
          rating: 5
        },
        {
          image: '/images/testimonials/review-viber-8.webp',
          messenger: 'Viber',
          author: 'Artem L.',
          role: 'Capital renovation · 65 m² · 7 weeks',
          quote: '“The renovation turned out great! Special thanks for helping with materials selection and saving our time”',
          rating: 5
        },
        {
          image: '/images/testimonials/review-whatsapp-9.webp',
          messenger: 'WhatsApp',
          author: 'Mykhailo T.',
          role: 'Turnkey apartment · 58 m² · 8 weeks',
          quote: '“Accepted the apartment without a single complaint. Great that the estimate did not change throughout the work”',
          rating: 5
        },
        {
          image: '/images/testimonials/review-telegram-10.webp',
          messenger: 'Telegram',
          author: 'Yuliia B.',
          role: 'Designer renovation · 94 m² · 11 weeks',
          quote: '“The apartment is pure magic! All our friends ask for your contacts, thanks for executing our complex design”',
          rating: 5
        },
        {
          image: '/images/testimonials/review-whatsapp-11.webp',
          messenger: 'WhatsApp',
          author: 'Bohdan K.',
          role: 'Capital renovation · 76 m² · 8 weeks',
          quote: '“Signed the final handover act, top notch quality. Zero headache during all 8 weeks of work”',
          rating: 5
        },
        {
          image: '/images/testimonials/review-telegram-12.webp',
          messenger: 'Telegram',
          author: 'Tetiana P.',
          role: 'New build · 80 m² · 9 weeks',
          quote: '“Furniture is already arranged, everything looks incredible! Thank you for a peaceful renovation experience”',
          rating: 5
        }
      ]
    },
    cta: {
      estimateBanner: { eyebrow: 'Precise quotation', title: 'This is a guide. Your number can be precise.', text: 'Leave your phone number — in 20 minutes we will clarify the details and fix the exact figure in the contract. 120+ projects delivered, 24-month warranty, 0 hidden charges.', button: 'Get a precise quotation' },
      processBanner: { eyebrow: 'First step — free', title: 'A headache-free renovation starts with one conversation.', text: 'In 20 minutes, we will define the right format, a realistic budget and the next step. Foreman site visit — free of charge.', button: 'Schedule a survey' },
      galleryBanner: { eyebrow: 'Next project', title: 'Want the same result?', text: 'We will show how to reach this level in your apartment — with a fixed price and schedule before work starts. 3D design before the first worker on site.', button: 'Discuss my apartment' },
      faqBanner: { eyebrow: 'Still have questions', title: 'One conversation closes them all.', text: 'In 20 minutes we will cover your property, budget and timeline — no obligations. Average reply time — 20 minutes.', button: 'Message us' },
      testimonialsBanner: { eyebrow: 'Your project', title: 'The next story about a calm renovation could be yours.', button: 'Estimate my renovation' },
      mobileBar: { calculate: 'Estimate', write: 'Message us' }
    },
    contact: {
      eyebrow: 'Let us start with your apartment',
      title: 'What kind of renovation do you want?',
      lead: 'Leave your details — we will come back with a quotation within 20 minutes during business hours. First questions about your apartment, then numbers. Free foreman site visit. No pressure, no obligations.',
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
