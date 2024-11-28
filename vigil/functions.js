// Функция для обновления списка направлений в зависимости от выбранной сферы
function updateDirections() {
    const sphere = document.getElementById('sphere').value;
    const directionSelect = document.getElementById('direction');

    // Очистим текущие элементы в select "direction"
    directionSelect.innerHTML = '';

    // Заполняем новый список направлений на основе выбранной сферы
    for (const direction in cardMatrix[sphere]) {
        const option = document.createElement('option');
        option.value = direction;
        option.textContent = direction;
        directionSelect.appendChild(option);
    }
}



// Функция для получения карты
function getCard() {


    if (document.getElementById('button').innerHTML == 'Завершить расклад') {
        document.getElementById("startCard").value = getCookie('endCard');
        document.getElementById('result').innerHTML = 'Ваша последняя карта: ' + getCookie('endCard'); // Очистить предыдущий результат
        document.getElementById('button').innerHTML = 'Получить расклад';

        document.cookie = "startCard=; max-age=-1";
        document.cookie = "needType=; max-age=-1";
        document.cookie = "wish=; max-age=-1";

        document.getElementById('selectForm').style.display = 'block';

        var checkMatrix = findMatrix();

        if (checkMatrix.cellsLeft === 0) {
            openModal();
        }

        return;
    }


    const resultDiv = document.getElementById('result');
    resultDiv.style.display = 'block';
    resultDiv.innerHTML = 'Загрузка...'; // Очистить предыдущий результат

    resultDiv.scrollIntoView({
        behavior: "smooth", // Плавная прокрутка
        block: "start" // Начало элемента будет у верхнего края окна
    });

    var wish = document.getElementById('wish').value;
    var startCard = document.getElementById('startCard').value;
    var sphere = document.getElementById('sphere').value;
    var direction = document.getElementById('direction').value;
    var needType = document.getElementById('needType').value;
    var gender = document.getElementById('gender').value;

    var endCard = cardMatrix[sphere][direction];

    wish = wish.toLowerCase();

    if (wish === '') {
        resultDiv.innerHTML = 'Введите желание!';
        return;
    }

    if (startCard === endCard) {
        resultDiv.innerHTML = 'Выбранное направление сходно с последней картой, смените!';
        return;
    }

    if (endCard === 'Т' && needType === 'п-р-з') {
        resultDiv.innerHTML = 'Выбранный тип не применим для выбранного направления, смените!';
        return;
    }


    set_result(gender, startCard, endCard, needType, wish, true);

}

function getCookie(name) {
    var matches = document.cookie.match(new RegExp("(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"));

    if (matches) {
        var result = decodeURIComponent(matches[1]);

        if (result === 'undefined') {
            return undefined;
        } else if (result === '') {
            return undefined;
        } else {
            return result;
        }
    } else {
        return undefined;
    }

}

function formatDate() {
    var date = new Date();

    var dd = date.getDate();
    if (dd < 10) dd = '0' + dd;

    var mm = date.getMonth() + 1;
    if (mm < 10) mm = '0' + mm;

    var yy = date.getFullYear() % 100;
    if (yy < 10) yy = '0' + yy;

    return dd + '/' + mm + '/' + yy;
}

if (typeof Website2APK !== 'undefined') {
    document.getElementById('buttonClose').style.display = 'block';
}

function set_result(gender, startCard, endCard, needType, wish, generation = false) {

    const resultDiv = document.getElementById('result');
    resultDiv.style.display = 'block';
    resultDiv.innerHTML = 'Формирование результата...'; // Очистить предыдущий результат

    // Определяем масть карты на основе выбранного пола и направления

    if (gender === 'male') {
        currentMast = ar_replace_mast_male;
    } else if (gender === 'female') {
        currentMast = ar_replace_mast_female;
    }

    let output = `Желание: желаю чтобы ${wish}.<br><br>Расклад: `;
    let output2 = '';

    const result2 = findBalancedPathWithSpecificEndTransition(startCard, endCard, needType);

    if (result2) {
        result2.path.forEach((card, i) => {

            let mastNow = currentMast[result2.transitions[i]];

            let cardWithMast = card + mastNow;
            output += cardWithMast;
            if (i < result2.path.length - 1) {
                output += ` → `;
            }


            if (mastNow != '') {

                output2 += card + mastNow + ': я желаю от своей бдилки ' + enrichmentData[(new Date().getDay())][mastNow] + ' ' + cardActions[card][mastNow] + ' чтобы ' + wish + '<br><br>';

                if (generation == true) {
                    saveCardGroupsToCookies(formatDate() + ' | желаю чтобы ' + wish, card + mastNow);
                }

            }

        });


        if (output2 != '') {
            output2 = '<hr>МАНТРЫ на ' + days[(new Date().getDay())] + ':<br><br>' + output2 + '<button id="button2" class="open-modal-btn" onclick="updateDayNow()">Обновить день недели</button>';
        }

        document.cookie = "startCard=" + startCard + ";expires=" + oneYearInSeconds;
        document.cookie = "endCard=" + endCard + ";expires=" + oneYearInSeconds;
        document.cookie = "needType=" + needType + ";expires=" + oneYearInSeconds;
        document.cookie = "gender=" + gender + ";expires=" + oneYearInSeconds;
        document.cookie = "wish=" + wish + ";expires=" + oneYearInSeconds;

        document.getElementById('button').innerHTML = 'Завершить расклад';
        document.getElementById('selectForm').style.display = 'none';

        document.getElementById("wish").value = '';

    } else {
        output += "не найден.";
    }

    resultDiv.innerHTML = output + output2;

}


// Функция для поиска сбалансированного пути
function findBalancedPathWithSpecificEndTransition(startCard, endCard, lastTransitionType) {


    // Проверка на одинаковые карты
    if (startCard === endCard) {
        return;
    }
    if (endCard === 'Т' && lastTransitionType === 'п-р-з') {
        return;
    }


    let queue = [
        [startCard, [],
            [], {},
            0, 0, ''
        ]
    ]; // Начальные параметры
    let cardUsage = {}; // Счетчик использования карт

    while (queue.length > 0) {
        const [currentCard, path, transitions, cardUsage, countPruz, countZrp, lastTransition] = queue.shift();

        // Проверка на максимальное количество использований карты
        if (cardUsage[currentCard] && cardUsage[currentCard] >= 2) {
            continue;
        }

        // Добавляем текущую карту в путь
        path.push(currentCard);

        // Проверка и обновление переходов
        let newCountPruz = countPruz;
        let newCountZrp = countZrp;
        if (path.length > 1) {
            if (lastTransition === 'п-р-з') {
                newCountPruz++;
            } else if (lastTransition === 'з-р-п') {
                newCountZrp++;
            }
        }

        transitions.push(lastTransition);

        // Проверка на совпадение переходов и типов
        if (currentCard === endCard) {
            if (newCountPruz === newCountZrp && lastTransition === lastTransitionType) {
                return {
                    path,
                    transitions
                };
            }
        }

        cardUsage[currentCard] = (cardUsage[currentCard] || 0) + 1;

        // Переход к следующей карте
        ['п-р-з', 'з-р-п'].forEach(type => {
            table[currentCard][type].forEach(nextCard => {
                if (!path.includes(nextCard)) {
                    const newCardUsage = {
                        ...cardUsage
                    };
                    queue.push([nextCard, path.slice(), transitions.slice(), newCardUsage, newCountPruz, newCountZrp, type]);
                }
            });
        });
    }

    return null;
}



// Функция для выбора карт из разных раскладов
function createCardIterator() {

    return function() {
        var groups = Object.values(cardGroups);
        var groupsNames = Object.keys(cardGroups);

        let cardListElement = document.getElementById('cardList');

        if (currentGroupIndex < groups.length) {
            var currentGroup = groups[currentGroupIndex];


            if (currentGroupIndexWiew != currentGroupIndex) {
                currentGroupIndexWiew = currentGroupIndex;
                var currentGroupName = groupsNames[currentGroupIndexWiew];

                var li = document.createElement('li');
                li.textContent = `${currentGroupName}: ${cardGroups[currentGroupName].join(' → ')}`;
                cardListElement.appendChild(li);
            }

            if (currentCardIndex < currentGroup.length) {
                return currentGroup[currentCardIndex++];
            } else {
                currentCardIndex = 0;
                currentGroupIndex++;
                return createCardIterator(cardGroups)();
            }
        }
        return null; // Все карты использованы
    };
}

// Функция для заполнения матрицы по спирали
function fillSpiral(n) {
    const matrix = Array.from({
        length: n
    }, () => Array(n).fill(null));
    let x = Math.floor(n / 2);
    let y = Math.floor(n / 2);
    let num = 1;
    let directions = [
        [0, 1],
        [1, 0],
        [0, -1],
        [-1, 0]
    ]; // Направления: вправо, вниз, влево, вверх
    let dir = 0; // Начинаем двигаться вправо
    let steps = 1;

    matrix[x][y] = num++;

    while (num <= n * n) {
        for (let i = 0; i < 2; i++) {
            for (let step = 0; step < steps; step++) {
                x += directions[dir][0];
                y += directions[dir][1];
                if (x >= 0 && x < n && y >= 0 && y < n) {
                    matrix[x][y] = num++;
                }
            }
            dir = (dir + 1) % 4; // Поворачиваемся по часовой стрелке
        }
        steps++; // Увеличиваем шаги после каждого полного круга
    }
    return matrix;
}

// Функция для отображения матрицы в таблице
function renderMatrix(matrix) {
    const table = document.getElementById('matrix');
    const n = matrix.length;
    let cardListElement = document.getElementById('cardList');

    table.innerHTML = '';
    cardListElement.innerHTML = '';

    currentGroupIndex = 0;
    currentCardIndex = 0;
    currentGroupIndexWiew = -2;

    for (let i = 0; i < n; i++) {
        const tr = document.createElement('tr');
        for (let j = 0; j < n; j++) {
            const td = document.createElement('td');
            //td.textContent = getNextCard();
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }

    highlightSequence(matrix);

    // Добавляем выделение последовательности чисел
    if (countAllCards() > 0) {
        document.getElementById('button3').style.display = "block";
    } else {
        cardListElement.innerHTML = '<br><br><b style="float:right;text-align:center;width:100%;">Здесь будет хранится история ваших желаний. Но вы сможете её очистить. Или подождать когда 100% заполнится матрица чтобы её освободить!</b>';
        document.getElementById('button3').style.display = "none";
    }
}

// Функция для выделения последовательности чисел от 1 до 25
function highlightSequence(matrix) {
    const n = matrix.length;
    const positions = [];

    // Собираем позиции для всех чисел от 1 до 25
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            if (matrix[i][j] !== null) {
                positions[matrix[i][j] - 1] = {
                    x: i,
                    y: j
                };
            }
        }
    }

    // Добавляем класс highlight для каждого числа от 1 до 25
    positions.forEach((position, index) => {
        const td = document.getElementById('matrix').rows[position.x].cells[position.y];


        setTimeout(() => {

            if (currentGroupIndexWiew == -2) {
                currentGroupIndexWiew = -1;
                var cardNext = '✵';
            } else {
                var cardNext = getNextCard();
            }

            if (cardNext !== null) {
                td.classList.add('highlight');
                td.textContent = cardNext;
            }
        }, index * 50); // Задержка, чтобы подсветка происходила поочередно
    });
}

function findMatrix() {

    var size = countAllCards() + 1;


    const matrices = [3, 5, 7, 9, 11, 13, 15, 17];
    let result = {};

    for (let i = 0; i < matrices.length; i++) {
        let matrixSize = matrices[i] * matrices[i]; // Количество клеток в матрице
        if (size <= matrixSize) {
            result.matrix = matrices[i];
            result.cellsLeft = matrixSize - size;
            break;
        }
    }

    // Если не подошла ни одна матрица
    if (!result.matrix) {
        result.matrix = false;
        result.cellsLeft = false;
    }

    return result;
}

function countAllCards() {
    let totalCards = 0;

    // Проходим по каждому раскладу в объекте
    for (let group in cardGroups) {
        totalCards += cardGroups[group].length; // Добавляем количество карт в этом раскладе
    }

    return totalCards;
}

// Функция для сохранения данных в куки
function saveCardGroupsToCookies(groupName, card) {
    // Добавляем карту в указанную группу или создаем новую группу, если она не существует
    if (!cardGroups[groupName]) {
        cardGroups[groupName] = []; // Если группа не существует, создаем её
    }
    cardGroups[groupName].push(card); // Добавляем карту в группу
    // Сериализуем объект в строку
    var serializedData = JSON.stringify(cardGroups);

    // Сохраняем данные в куки с временем действия 1 год

    document.cookie = `cardGroups=${encodeURIComponent(serializedData)};max-age=${oneYearInSeconds}`;
}


// Функция для извлечения данных из куки
function getCardGroupsFromCookies() {
    const cookieValue = document.cookie
        .split('; ')
        .find(row => row.startsWith('cardGroups='))
        ?.split('=')[1];

    if (cookieValue) {
        // Десериализуем данные обратно в объект
        return JSON.parse(decodeURIComponent(cookieValue));
    } else {
        return {};
    }
}

// Функция для удаления куки
function deleteCardGroupsCookies() {

    var isDelete = confirm("Точно хотите удалить всю историю?");

    if (isDelete == true) {

        if (document.getElementById('button').innerHTML == 'Завершить расклад') {
            getCard();

        }

        document.cookie = "cardGroups=;max-age=-1";
        cardGroups = {};
        openModal();
    }
}

// Функция для открытия модального окна
function openModal() {

    var checkMatrix = findMatrix();

    var matrix = fillSpiral(checkMatrix.matrix);
    renderMatrix(matrix);

    if (getCookie('startCard') === undefined && checkMatrix.cellsLeft === 0) {
        document.getElementById("cardListContainer").style.display = "none";
        document.getElementById("button3").style.display = "none";
        document.getElementById("button5").style.display = "block";
    } else {

        document.getElementById("cardListContainer").style.display = "block";
        document.getElementById("button5").style.display = "none";

        if (countAllCards() > 0) {
            document.getElementById("button3").style.display = "block";
        } else {

            document.getElementById("button3").style.display = "none";
        }

    }

    document.getElementById("matrixModal").style.display = "block";
}

// Функция для закрытия модального окна
function closeModal() {
    document.getElementById("matrixModal").style.display = "none";
}


function updateDayNow() {
    set_result(getCookie('gender'), getCookie('startCard'), getCookie('endCard'), getCookie('needType'), getCookie('wish'));
}

function freeMartix() {

    document.cookie = "cardGroups=;max-age=-1";
    cardGroups = {};


    closeModal();

    darkenScreenAndAnimateStar();

}

function darkenScreenAndAnimateStar() {


    var overlay = document.getElementById('overlay');
    var star = document.getElementById('star');

    // Затемнение экрана
    overlay.style.opacity = 1;
    overlay.style.pointerEvents = 'auto';
    star.style.position = 'fixed';

    // Появление звезды и запуск анимации
    star.classList.add('animate');

    // Возвращаем звезду в исходное положение
    setTimeout(() => {
        star.classList.remove('animate');
        star.style.position = 'relative';
    }, 4000);
    // Возвращаем звезду в исходное положение
    setTimeout(() => {
        overlay.style.opacity = 0;
        overlay.style.pointerEvents = 'none';
        openModal();
    }, 4500);
}