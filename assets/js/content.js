export const SKILLS = [
  { ic: 'ai', c: '#7fe3ff', lvl: 5,
    ru: ['ИИ-ускорение', 'Профессиональный навык', 'Claude и ChatGPT — мои рабочие инструменты каждый день. Собрал свой проект в Claude с шаблонами и инструкциями: было 2 дня на документ, стало 3 документа в день.'],
    en: ['AI Boost', 'Hard skill', 'Claude and ChatGPT are my everyday work tools. I built my own Claude project with templates and instructions: from 2 days per document to 3 documents a day.'] },
  { ic: 'dive', c: '#4dff9a', lvl: 5,
    ru: ['Быстрое погружение', 'Личное качество', 'Пришёл переводчиком — со временем мне доверили клиентов и составление документов. Работа научила быстро схватывать процесс и вливаться в задачу.'],
    en: ['Fast Onboarding', 'Soft skill', 'Joined as a translator — over time I was trusted with clients and document drafting. The job taught me to pick up new processes fast.'] },
  { ic: 'talk', c: '#b48cff', lvl: 4,
    ru: ['Общий язык', 'Профессиональный навык', 'English B2, созвоны с клиентами, поездки по разным странам. Легко нахожу контакт с людьми — и уже начал учить китайский.'],
    en: ['Common Ground', 'Hard skill', 'English B2, client calls, lots of travel. I connect with people easily — and I’ve already started learning Chinese.'] },
  { ic: 'calc', c: '#ffc94d', lvl: 4,
    ru: ['Просчёт ходов', 'Личное качество', 'Изучаю фундаментальную математику в ДВФУ. Быстро считаю, просчитываю варианты наперёд и быстро соображаю.'],
    en: ['Thinking Ahead', 'Soft skill', 'I study pure mathematics at FEFU. Quick with numbers, I think several moves ahead and react fast.'] },
  { ic: 'team', c: '#ff4d6d', lvl: 5,
    ru: ['Командный дух', 'Личное качество', '12 лет хоккея на профессиональном уровне: дисциплина, игра под давлением, команда. Последние 2 года тренировал детей 6–9 лет.'],
    en: ['Team Spirit', 'Soft skill', '12 years of hockey at a professional level: discipline, playing under pressure, teamwork. Coached kids aged 6–9 for the last 2 years.'] },
  { ic: 'code', c: '#4da3ff', lvl: 3,
    ru: ['Код', 'Профессиональный навык', 'Python — основной язык. C++ и JavaScript — база, продолжаю качать. Сети (TCP/UDP), Git, GitHub Actions, FastAPI.'],
    en: ['Code', 'Hard skill', 'Python is my main language; C++ and JavaScript at a basic level and growing. Networking (TCP/UDP), Git, GitHub Actions, FastAPI.'] }
];

export const PROJECTS = [
  { type: 'featured', ic: 'doc', stack: ['Claude', 'ChatGPT', 'Prompting', 'RU → EN'], link: null,
    ru: { t: 'ИИ-конвейер документов', task: 'Переводить и составлять много однотипных документов быстро и без ошибок.', did: 'Собрал проект в Claude: база шаблонов и инструкций. ИИ переводит документ в нужном формате, я подставляю данные клиента и проверяю результат.', res: 'Было: 1 документ на 20 страниц за 2 дня. Стало: 3 документа в день.' },
    en: { t: 'AI Document Pipeline', task: 'Translate and draft lots of similar documents fast and without mistakes.', did: 'Built a Claude project with a library of templates and instructions. AI translates a document in the right format; I fill in client data and review the result.', res: 'Before: one 20-page document in 2 days. Now: 3 documents a day.' } },
  { type: 'team', ic: 'ship', stack: ['Python', 'TCP / UDP', 'customtkinter', 'GitHub Actions'], link: 'https://github.com/kkaraumi/kisik',
    ru: { t: 'Морской бой по сети', task: 'Игра для двух компьютеров в одной локальной сети.', did: 'Сервер находится сам через UDP broadcast, игра идёт по TCP, интерфейс на customtkinter.', res: 'Командный проект; сборка в .exe автоматически через GitHub Actions.' },
    en: { t: 'LAN Battleship', task: 'A game for two computers on the same local network.', did: 'The server is discovered automatically via UDP broadcast, gameplay runs over TCP, UI in customtkinter.', res: 'Team project; .exe builds automated with GitHub Actions.' } },
  { type: 'study', ic: 'wind', stack: ['ESP32', 'Wokwi', 'FastAPI', 'Python'], link: 'https://github.com/kis1mik1',
    ru: { t: 'Валютный флюгер', task: 'Устройство, которое показывает курсы валют ЦБ РФ.', did: 'ESP32 в эмуляторе Wokwi и сервер на FastAPI, который получает курсы и отдаёт их устройству.', res: 'IoT-проект целиком: железо, сервер и API.' },
    en: { t: 'Currency Weathervane', task: 'A device that shows Central Bank of Russia exchange rates.', did: 'ESP32 in the Wokwi emulator plus a FastAPI server that fetches rates and serves them to the device.', res: 'A full IoT project: hardware, server and API.' } },
  { type: 'personal', ic: 'web', stack: ['HTML', 'CSS', 'JavaScript', 'Canvas'], link: 'https://github.com/kis1mik1/kuzm1n-bigbob',
    ru: { t: 'Этот сайт', task: 'Персональный сайт, который хочется исследовать, а не пролистать.', did: 'Без фреймворков: арена на canvas с физикой шайбы, RU/EN, достижения, мини-игра.', res: 'Свой домен kuzm1n-bigbob.ru и HTTPS.' },
    en: { t: 'This Website', task: 'A personal site you want to explore, not just scroll.', did: 'No frameworks: a canvas rink with puck physics, RU/EN, achievements and a mini-game.', res: 'Own domain kuzm1n-bigbob.ru with HTTPS.' } },
  { type: 'study', ic: 'list', stack: ['Python', 'OOP'], link: 'https://github.com/kis1mik1',
    ru: { t: 'To-do list', task: 'Консольный менеджер задач.', did: 'Написал на классах — первая лабораторная по ООП.', res: 'Основа ООП на практике: классы, методы, инкапсуляция.' },
    en: { t: 'To-do List', task: 'A console task manager.', did: 'Built with classes — my first OOP lab.', res: 'OOP basics in practice: classes, methods, encapsulation.' } }
];

export const TIMELINE = [
  { s: 'done',
    ru: ['Красноярск', 'Хоккейная школа «Сокол»', 'Окончил юношескую хоккейную школу «Сокол». Играл за молодёжную команду «Рыси», отдельно — за ХК «Сочи», а также за другие клубы.'],
    en: ['Krasnoyarsk', 'Sokol Hockey School', 'Graduated from the Sokol youth hockey school. Played for the Rysi youth team, for HC Sochi and for other clubs.'] },
  { s: 'done',
    ru: ['Хоккей', '12 лет на профессиональном уровне', 'Региональные и международные турниры, игры за границей — в Монголии и Австралии.'],
    en: ['Hockey', '12 years at a professional level', 'Regional and international tournaments, games abroad — in Mongolia and Australia.'] },
  { s: 'done',
    ru: ['Тренерство', 'Тренер детей 6–9 лет', 'Знакомые попросили потренировать детей — так последние 2 года я учил ребят кататься и грамотно играть.'],
    en: ['Coaching', 'Coaching kids aged 6–9', 'Friends asked me to train their kids — and for the last 2 years I taught children to skate and play smart.'] },
  { s: 'active',
    ru: ['Владивосток', 'ДВФУ: системное программирование', '2 курс. Программирование и фундаментальная математика.'],
    en: ['Vladivostok', 'FEFU: Systems Programming', '2nd year. Programming and pure mathematics.'] },
  { s: 'active',
    ru: ['Работа', 'Razmorozka', '2 года: переводчик документов → составление документов → созвоны с клиентами. ИИ — главный инструмент.'],
    en: ['Work', 'Razmorozka', '2 years: document translator → document drafting → client calls. AI is my main tool.'] },
  { s: 'next',
    ru: ['Дальше', 'Работа с ИИ за границей', 'English выше B2, китайский, роль ИИ-специалиста, бизнес и переговоры.'],
    en: ['Next', 'AI work abroad', 'English beyond B2, Chinese, an AI specialist role, business and negotiations.'] }
];

export const COUNTRIES = [
  { code: 'RUS', c: '#7fe3ff', rot: -4, ru: ['Россия', 'ДОМ', 'Родом из Красноярска, живу и учусь во Владивостоке.'], en: ['Russia', 'HOME', 'Born in Krasnoyarsk, living and studying in Vladivostok.'] },
  { code: 'MNG', c: '#ffc94d', rot: 3, round: true, ru: ['Монголия', 'МНОГО РАЗ', 'Путешествия и хоккей. Скоро — интересные проекты.'], en: ['Mongolia', 'MANY TIMES', 'Travel and hockey. Interesting projects coming soon.'] },
  { code: 'VNM', c: '#ff4d6d', rot: -2, ru: ['Вьетнам', 'ВИЗА ✓', 'Путешествия.'], en: ['Vietnam', 'VISITED', 'Travel.'] },
  { code: 'AUS', c: '#4dff9a', rot: 4, round: true, ru: ['Австралия', 'ВИЗА ✓', 'Путешествия и хоккей.'], en: ['Australia', 'VISITED', 'Travel and hockey.'] },
  { code: '+', c: '#b48cff', rot: -3, ru: ['И другие', 'ВИЗА ✓', 'И другие страны Европы и Азии.'], en: ['And more', 'VISITED', 'And other countries in Europe and Asia.'] },
  { code: 'CHN', locked: true, rot: 2, ru: ['Китай', 'СКОРО', 'Учу китайский — следующая точка на карте.'], en: ['China', 'NEXT', 'Learning Chinese — the next stop on the map.'] }
];

export const ACHIEVEMENTS = [
  { k: 'plat', ic: 'puck', ru: ['12 лет на льду', 'Хоккей на профессиональном уровне'], en: ['12 Years on Ice', 'Professional-level hockey'] },
  { k: 'gold', ic: 'star', ru: ['Школа «Сокол»', 'Выпускник юношеской хоккейной школы'], en: ['Sokol School', 'Youth hockey school graduate'] },
  { k: 'gold', ic: 'web', ru: ['Международный уровень', 'Турниры и игры в Монголии и Австралии'], en: ['International Level', 'Tournaments and games in Mongolia & Australia'] },
  { k: 'gold', ic: 'coach', ru: ['Тренер', '2 года с детьми 6–9 лет'], en: ['Coach', '2 years with kids aged 6–9'] },
  { k: 'gold', ic: 'ai', ru: ['ИИ-ускоритель ×10+', 'Документы в десятки раз быстрее'], en: ['AI Accelerator ×10+', 'Documents tens of times faster'] },
  { k: 'gold', ic: 'brief', ru: ['2 года в команде', 'Razmorozka: от перевода до клиентов'], en: ['2 Years on the Team', 'Razmorozka: from translation to clients'] },
  { k: 'silver', ic: 'lang', ru: ['English B2', 'Работаю на английском'], en: ['English B2', 'I work in English'] },
  { k: 'silver', ic: 'flag', ru: ['Свой домен', 'kuzm1n-bigbob.ru в сети'], en: ['Own Domain', 'kuzm1n-bigbob.ru is live'] },
  { k: 'locked', ic: 'lock', ru: ['English C1', 'Следующий уровень'], en: ['English C1', 'Next level'] },
  { k: 'locked', ic: 'lock', ru: ['中文', 'Китайский язык'], en: ['中文', 'Chinese'] },
  { k: 'locked', ic: 'lock', ru: ['Работа за границей', 'ИИ-специалист'], en: ['Job Abroad', 'AI specialist'] },
  { k: 'locked', ic: 'lock', ru: ['Свой бизнес', 'Переговоры и сделки'], en: ['Own Business', 'Deals and negotiations'] }
];

export const HOBBIES = [
  { ic: 'team', ru: ['Хоккей', '12 лет на профессиональном уровне, сейчас играю для себя.'], en: ['Hockey', 'Played professionally for 12 years, now for fun.'] },
  { ic: 'web', ru: ['Путешествия', 'Монголия, Вьетнам, Австралия и другие страны.'], en: ['Travel', 'Mongolia, Vietnam, Australia and more.'] },
  { ic: 'sport', ru: ['Спорт', 'Часто тренируюсь, спорт — часть моей жизни.'], en: ['Sport', 'I work out often — sport is part of my life.'] },
  { ic: 'lang', ru: ['Языки', 'Подтягиваю английский, начал учить китайский.'], en: ['Languages', 'Improving my English, started learning Chinese.'] },
  { ic: 'code', ru: ['Свои проекты', 'Сайты, веб-приложения и безопасность.'], en: ['Side projects', 'Websites, web apps and security.'] }
];

export const TECH = [
  { ru: 'Языки', en: 'Languages', items: { ru: ['Python', 'C++ · база', 'JavaScript · база'], en: ['Python', 'C++ · basic', 'JavaScript · basic'] } },
  { ru: 'Веб', en: 'Web', items: { ru: ['HTML', 'CSS', 'Canvas'], en: ['HTML', 'CSS', 'Canvas'] } },
  { ru: 'Бэкенд и сети', en: 'Backend & networking', items: { ru: ['FastAPI', 'Сокеты TCP / UDP'], en: ['FastAPI', 'TCP / UDP sockets'] } },
  { ru: 'Инструменты', en: 'Tools', items: { ru: ['Git', 'GitHub', 'GitHub Actions', 'VS Code'], en: ['Git', 'GitHub', 'GitHub Actions', 'VS Code'] } },
  { ru: 'ИИ', en: 'AI', items: { ru: ['Claude', 'ChatGPT', 'Промптинг'], en: ['Claude', 'ChatGPT', 'Prompting'] } },
  { ru: 'Железо', en: 'Hardware', items: { ru: ['ESP32', 'Wokwi'], en: ['ESP32', 'Wokwi'] } }
];
