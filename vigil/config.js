let days = [
    'Воскресенье',
    'Понедельник',
    'Вторник',
    'Среду',
    'Четверг',
    'Пятницу',
    'Субботу'
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

let oneYearInSeconds = 365 * 24 * 60 * 60; // Количество секунд в 1 году

// Группировка карт по раскладам
let currentGroupIndex = 0;
let currentCardIndex = 0;
let currentGroupIndexWiew = -2;

let cardGroups = {};

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
                alert('Криптическая ошибка в работе программы. Пожалуйста попробуйте сменить приложение для его запуска!');
            });
        }
    );

});
