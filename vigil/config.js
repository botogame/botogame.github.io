window.onerror = function (msg, url, line) {

    alert(msg + "\n" + url + "\n" + "\n" + line);
   
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

var meditation_days = [
        { id: 0, name: 'воскресенье', planet: 'Солнце', file: 'https://moosic.my.mail.ru/file/07971b4232f6603ac3f9f4cea8b5d281.mp3', image: 'sun.png' },
        { id: 1, name: 'понедельник', planet: 'Венера', file: 'https://moosic.my.mail.ru/file/410e5b3370028b3d87397470d2acf392.mp3', image: 'venus.png' },
        { id: 2, name: 'вторник', planet: 'Марс', file: 'https://moosic.my.mail.ru/file/a1e42b4063feb96097296e6b4e26c835.mp3', image: 'mars.png' },
        { id: 3, name: 'среда', planet: 'Луна', file: 'https://moosic.my.mail.ru/file/7c8d2c607b56fe2565f81be52adb41ff.mp3', image: 'moon.png' },
        { id: 4, name: 'четверг', planet: 'Сатурн', file: 'https://moosic.my.mail.ru/file/5ef26686a6f1643f882dab3f80e30888.mp3', image: 'saturn.png' },
        { id: 5, name: 'пятница', planet: 'Юпитер', file: 'https://moosic.my.mail.ru/file/b1ef3754e4104dd8014e66df88b018ff.mp3', image: 'jupiter.png' },
        { id: 6, name: 'суббота', planet: 'Меркурий', file: 'https://moosic.my.mail.ru/file/f5b35c89e7affcf466d0bbda30bf9ce7.mp3', image: 'mercury.png' }
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

document.addEventListener("DOMContentLoaded", function() {

    loadScript('./scheme.js', function() {
        setupOnLoad();
    }, function() {
        alert('Сбой в работе программы. Пожалуйста попробуйте сменить устройство для его запуска.');
    });

    // Попытка загрузить актуальные данные схемы
    /*loadScript(
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
    );*/

});
