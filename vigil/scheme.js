// Схема выбора карты
const cardMatrix = {
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

// Начальная карта
const table = {
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


const enrichmentData = {
    "7": {
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
        '♠': "предоставленного",
        '♣': "дружелюбного",
        '♦': "внимательного"
    }
};

const cardActions = {
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



// Масти для мужского и женского пола
const ar_replace_mast_male = {
    '': '',
    'п-р-з': '♦',
    'з-р-п': '♠'
};
const ar_replace_mast_female = {
    '': '',
    'п-р-з': '♥',
    'з-р-п': '♣'
};