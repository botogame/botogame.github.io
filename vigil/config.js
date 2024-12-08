let days = [
    'Воскресенье',
    'Понедельник',
    'Вторник',
    'Среду',
    'Четверг',
    'Пятницу',
    'Субботу'
];

let days2 = [
    'Воскресная',
    'Понедельничная',
    'Вторничная',
    'Средовая',
    'Четверговая',
    'Пятничная',
    'Субботняя'
];

// Масти для мужского и женского пола
let ar_replace_mast_male = {
    '': '',
    'п-р-з': '♦',
    'з-р-п': '♠'
};

let ar_replace_mast_female = {
    '': '',
    'п-р-з': '♥',
    'з-р-п': '♣'
};

let cards = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'В', 'Д', 'К', 'Т'];

let ukladvariants = [
    { value: "sleep", text: "🛏 отдых" },
    { value: "money", text: "⏰ бизнес" },
    { value: "sex", text: "👫 отношения" },
    { value: "game", text: "🎮 развлечения" }
];

let ukladvariantsMsg = {
    'sleep': 'у всех был отдых',
    'money': 'у всех был бизнес',
    'sex': 'у всех были отношения',
    'game': 'у всех были развлечения'
};

let ukladvariantsStatus = {
    'sleep': '🛏',
    'money': '⏰',
    'sex': '👫',
    'game': '🎮'
};

let oneYearInSeconds = 365 * 24 * 60 * 60; // Количество секунд в 1 году

// Группировка карт по раскладам
let currentGroupIndex = 0;
let currentCardIndex = 0;
let currentGroupIndexWiew = -2;

let cardGroups = {};
let ukladGroups = {};
let cardUklady = {};

let getNextCard = createCardIterator();

document.addEventListener("DOMContentLoaded", function() {

    // Попытка загрузить актуальные данные схемы
    loadScript(
        'https://botogame.github.io/vigil/scheme.js',
        function() {
            setupOnLoad();
        },
        function() {
            // Попытка загрузить локальный скрипт при ошибке внешнего
            loadScript('./scheme.js', function() {
                setupOnLoad();
            }, function() {
                alert('Сбой в работе программы. Пожалуйста попробуйте сменить устройство для его запуска.');
            });
        }
    );

});
