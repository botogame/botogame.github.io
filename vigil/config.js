window.onerror = function (msg, url, line) {

    alert('Критическая ошибка: ' + msg + "\n" + "\n" + 'Место: ' + url + "\n" + "\n" + 'Строка: ' + line);
   
    return true;
   
   };

let days = [
    'воскресенье',
    'понедельник',
    'вторник',
    'среду',
    'четверг',
    'пятницу',
    'субботу'
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

var checkDayChangePlanetStarted = false;

let cardGroups = {};
let ukladGroups = {};
let cardUklady = {};

let getNextCard = createCardIterator();

window.addEventListener("load", function() {
    setupOnLoad();
});
