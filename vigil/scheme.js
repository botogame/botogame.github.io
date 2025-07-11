// Схема сфер влияний
const schemeSphereInfluence = {
    'стратегия': {
        'Расположение': 'Т',
        'Позиционирование': 'К',
        'Маскировка': 'Д',
        'Празднование': '2'
    },
    'восхищение': {
        'Блаженство': 'В',
        'Озарение': '10',
        'Посредственность': '9',
    },
    'вдохновение': {
        'Рациональность': '8',
        'Чистка': '7',
        'Уединение': '6'
    },
    'прорицание': {
        'Прагматичность': '5',
        'Привязанность': '4',
        'Выгода': '3'
    }
};

// Схема переходов
const schemeTransitions = {
    'Т': {
        'п-р-з': ['В', '8', 'К'],
        'з-р-п': []
    },
    'К': {
        'п-р-з': ['Д', 'В', '8', '5'],
        'з-р-п': ['Т', 'В', '8', '5']
    },
    'Д': {
        'п-р-з': ['2', '9', '6', '4', '10', '7'],
        'з-р-п': ['4', '7', 'К', '10', '9']
    },
    'В': {
        'п-р-з': ['8', 'К'],
        'з-р-п': ['К', '10', '8', '5', 'Т']
    },
    '10': {
        'п-р-з': ['В', '8', '5', 'К', '7', 'Д'],
        'з-р-п': ['К', '8', '5', '7', '4', 'Д', '9']
    },
    '9': {
        'п-р-з': ['Д', '10', '7', '4', '6', '2'],
        'з-р-п': ['Д', '7', '4', '6', '3', '2']
    },
    '8': {
        'п-р-з': ['К', 'В', '10', '7', '5'],
        'з-р-п': ['Т', 'В', 'К', '10', '5']
    },
    '7': {
        'п-р-з': ['5', '10', '4', '9', '6', 'Д'],
        'з-р-п': ['К', '10', '8', '5', '4', 'Д', '9']
    },
    '6': {
        'п-р-з': ['4', '9', '2', '3'],
        'з-р-п': ['7', '4', 'Д', '9', '3', '2']
    },
    '5': {
        'п-р-з': ['В', '8', '10', '7', 'К'],
        'з-р-п': ['8', 'К', '10', '7', '4']
    },
    '4': {
        'п-р-з': ['5', '10', '7', 'Д', '9', '6'],
        'з-р-п': ['7', 'Д', '9', '6', '3']
    },
    '3': {
        'п-р-з': ['4', '9', '6', '2'],
        'з-р-п': ['6', '2']
    },
    '2': {
        'п-р-з': ['9', '6', '3'],
        'з-р-п': ['6', '3', 'Д', '9']
    }
};

// Схема мастей дней недели
const schemeSuitsDaysWeek = {
    "0": {
        '♥': "осмотрительного",
        '♠': "осмысленного",
        '♣': "познавательного",
        '♦': "энтузиасного"
    },
    "1": {
        '♥': "сюрреалистического",
        '♠': "парадоксального",
        '♣': "невинного",
        '♦': "замечательного"
    },
    "2": {
        '♥': "поощрительного",
        '♠': "рассудительного",
        '♣': "кокетского",
        '♦': "аргументированого"
    },
    "3": {
        '♥': "осторожного",
        '♠': "безжалостного",
        '♣': "устроенного",
        '♦': "занимательного"
    },
    "4": {
        '♥': "подсматривающего",
        '♠': "абсолютного",
        '♣': "результативного",
        '♦': "координированного"
    },
    "5": {
        '♥': "впечатляющего",
        '♠': "отстаивающего",
        '♣': "привлекательного",
        '♦': "одобряющего"
    },
    "6": {
        '♥': "искренного",
        '♠': "разумного",
        '♣': "дружелюбного",
        '♦': "внимательного"
    }
};

// Схема назначения карт
const schemeСardAssignments = {
    "Т": {
        '♥': "тайника",
        '♠': "бронирования",
        '♣': "комплекта",
        '♦': "подбора"
    },
    "К": {
        '♥': "уверения",
        '♠': "чередования",
        '♣': "удивления",
        '♦': "впечатления"
    },
    "Д": {
        '♥': "оформления",
        '♠': "проложения",
        '♣': "ограничивания",
        '♦': "доведения"
    },
    "В": {
        '♥': "обнадеживания",
        '♠': "словления",
        '♣': "утомления",
        '♦': "обоснования"
    },
    "10": {
        '♥': "изменения",
        '♠': "пропуска",
        '♣': "сведения",
        '♦': "открытия"
    },
    "9": {
        '♥': "обласкания",
        '♠': "принятия",
        '♣': "налаживания",
        '♦': "сконцентрирования"
    },
    "8": {
        '♥': "привлечения",
        '♠': "предоставления",
        '♣': "замятия",
        '♦': "настроения"
    },
    "7": {
        '♥': "устояния",
        '♠': "уравновешивания",
        '♣': "избавления",
        '♦': "обсуждения"
    },
    "6": {
        '♥': "разбирания",
        '♠': "настроения",
        '♣': "дополнения",
        '♦': "обеспечения"
    },
    "5": {
        '♥': "взвешивания",
        '♠': "предсказания",
        '♣': "впитывания",
        '♦': "советования"
    },
    "4": {
        '♥': "передования",
        '♠': "удовлетворения",
        '♣': "сдобривания",
        '♦': "обрадования"
    },
    "3": {
        '♥': "наполнения",
        '♠': "раздавания",
        '♣': "оптимизирования",
        '♦': "намечивания"
    },
    "2": {
        '♥': "разделения",
        '♠': "подытоживания",
        '♣': "наделения",
        '♦': "подведения"
    }
};


// Схема мастей дней недели
const schemeMonth = [
    'наития с январём',
    'солидности для февраля',
    'партнёрства с мартом',
    'заносчивости над апрелем',
    'деятельности в мае',
    'укрепления июня',
    'заигрывания с июлем',
    'надежности в августе',
    'стильности под сентябрь',
    'смелости от октября',
    'опекунства ноябрём',
    'признания в декабрь'
];


let daysFull = [
    'Внимание, путешественник: ты только что активировал экзистенциальную перезагрузку. Это необратимо. И, согласно условиям, возврата и техподдержки не предусмотрено.',
    'Ты проснулся, и уже кому-то должен. Добро пожаловать в корпоративную астрореальность. Кстати, тень за тобой — не твоя. Мы её арендовали у галактической налоговой.',
    'Ты посмотрел внутрь себя. Там Wi-Fi не ловит, но зато есть неоплаченные обещания. И твой двойник, кстати, снова не платит за аренду.',
    'Системная ошибка на экзистенциальном уровне. Ты думал это баг, но это фича. Или как минимум сюжетная необходимость.',
    'В голове пожар, в душе рассрочка, в глазах огонь. Прозрение включилось автоматически — попробуйте выключить в настройках мультивселенной.',
    'Сияние — побочный эффект перехода на тёмную энергию. Пасьянс недоволен. Он уже отправил за тобой вселенского аудитора.',
    'Ты застрял в временной петле между "пофиг" и "а может, всё-таки". Поздравляем! Ты официально — системный глюк Медичи.'
];



const schemeMonthFull = [
    'Ты вытащил карту «Просветление случайного доступа». Поздравляем! Она работает один раз — и не тогда, когда надо. Не забудь обновить свою интуицию до версии 3.0.',
    'Карты выдали тебе стабильность. Только с багами. Стой, не двигайся: сейчас вселенная проверит, фейк ты или функциональный взрослый.',
    'Ты вытянул расклад на двоих, но пасьянс отказывается играть в команду. Похоже, ты снова в паре с собой. Как трогательно. Как подозрительно.',
    'Вытянута карта «Я знаю, что делаю». Пасьянс хохочет. Он уже видел, как ты строил план из эго и картона.',
    'Пасьянс выдал тебе бурю задач и чек-листов. Ты активирован, перегружен и… забыл зачем начал. Классика пасьянса.',
    'Сложено: четыре стены, потолок и тревога. Ты построил личную крепость. Проблема в том, что ключ остался снаружи.',
    'Ты вытащил карту «Очаровательный хаос». Все твои действия милы, бесполезны и немного незаконны в трёх галактиках.',
    'Пасьянс выдал стабильность. Она пахнет пыльным архивом. Ты стал крепким, как дедлайны. Не радуйся: тебя теперь назначили якорем реальности.',
    'Ты вытянул идеальный образ. Слишком идеальный. Карты сообщают: глянец не спасает, если внутри — багующий код самоуважения.',
    'Выпала карта «Рискни или снись дальше». Ты сделал шаг вперёд. Жаль, это был баг в интерфейсе. Перезапуск самоуверенности в процессе.',
    'Пасьянс назначил тебя спасателем. Не волнуйся, никто не просил. Теперь ты центр чужих проблем — и бесплатный Wi-Fi для тревог.',
    'Выпала карта финального апдейта: «Теперь ты знаешь». Поздно. Всё уже сохранено. И да, ты официально в списке «тех, кто понял, но остался».'
];
