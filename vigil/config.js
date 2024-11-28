let days = [
    'Воскресенье',
    'Понедельник',
    'Вторник',
    'Среду',
    'Четверг',
    'Пятницу',
    'Субботу'
];


let oneYearInSeconds = 365 * 24 * 60 * 60; // Количество секунд в 1 году

// Группировка карт по раскладам
let currentGroupIndex = 0;
let currentCardIndex = 0;
let currentGroupIndexWiew = -2;

let cardGroups = {};

let getNextCard = createCardIterator();

document.addEventListener("DOMContentLoaded", function() {


    if (getCookie('startCard') != undefined) {

        set_result(getCookie('gender'), getCookie('startCard'), getCookie('endCard'), getCookie('needType'), getCookie('wish'));

    } else {

        if (getCookie('endCard') != undefined) {
            document.getElementById("startCard").value = getCookie('endCard');
            document.getElementById('result').innerHTML = 'Ваша последняя карта: ' + getCookie('endCard'); // Очистить предыдущий результат
        }

        if (getCookie('gender') != undefined) {
            document.getElementById("gender").value = getCookie('gender');
        }

    }

    cardGroups = getCardGroupsFromCookies();

    // Инициализация списка направлений при загрузке страницы
    updateDirections();

});
