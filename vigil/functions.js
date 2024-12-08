// Функция для обновления списка направлений в зависимости от выбранной сферы
function updateDirections() {
    const sphere = document.getElementById("sphere").value;
    const directionSelect = document.getElementById("direction");

    // Очистим текущие элементы в select "direction"
    directionSelect.innerHTML = "";

    var option = document.createElement("option");
    option.value = "";
    option.textContent = "[ Выберите направление влияния ]";
    directionSelect.appendChild(option);

    if (sphere == "") {
        directionSelect.setAttribute("disabled","disabled");
    } else {

        // Заполняем новый список направлений на основе выбранной сферы
        for (const direction in schemeSphereInfluence[sphere]) {
            var option = document.createElement("option");
            option.value = direction;
            option.textContent = direction;
            directionSelect.appendChild(option);
        }
        
        directionSelect.removeAttribute("disabled");
    }
}

function trackInput(_this){
    clear_input_error(_this);

    if(_this.id=='wish'){
        if(_this.value==''){
            setMsgToUser('select','Введите желание!');
        }
		else{

            var symvol_text = document.getElementById("symvol_text").value;

            if(symvol_text!=''){
                symvol_text = ' для ' + symvol_text;
            }
            setMsgToUser('write',"Я желаю чтобы " + _this.value + symvol_text);
        }
    }
    else if(_this.id=='symvol_text'){
        if(_this.value==''){
            setMsgToUser('select','Опишите для чего ваше желание!');
        }
		else{
            var wish = document.getElementById("wish").value;

            setMsgToUser('write',"Я желаю чтобы " + wish + ' для ' + _this.value);
        }
    }

}

function check_unselected(){

    if (document.getElementById("gender").value === "") {
        return "gender";
    }

    if (document.getElementById("startCard").value === "") {
        return "startCard";
    }
    if (document.getElementById("wish").value === "") {
        return "wish";
    }
    if (document.getElementById("sphere").value === "") {
        return "sphere";
    }
    if (document.getElementById("direction").value === "") {
        return "direction";
    }
    if (document.getElementById("needType").value === "") {
        return "needType";
    }
    if (document.getElementById("symvol_text").value === "") {
        return "symvol_text";
    }
	
	return '';
}

function escapeHtml(text) {
    return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
  }

function dolgyDescription() {


    var kolvoDolgov = calculateDolgy();

    if(kolvoDolgov==0){
        return '';
    }

    let description = '<hr>У вас долги на такие карты: ';

    ukladvariants.forEach(option => {
        var resultSet = getCardsBetweenMultiple(option.value);
        var cardsList = resultSet.length > 0 ? resultSet : ['нет'];
        
        description += `${option.text} (`;

        cardsList.forEach((card, index) => {
            if (card !== 'нет') {
                description += '<a class="card-link" href="#" onclick="otrabotatDolg(\'' + option.value +'\',\'' + card +'\');">' + card + '</a>';
            } else {
                description += card;
            }

            if (index < cardsList.length - 1) {
                description += ', ';
            }
        });

        description += '), ';
    });

    description = description.slice(0, -2) + '. Кликнув по карте долга вы создадите расклад отработки.';
    // Удаляем последнюю запятую и пробел
    return description;
}

// Функция для получения карты
function getCard(clearMatrix=false) {
	
    if (document.getElementById("button").innerHTML == "Уклад полностью проработан") {

        var uklad = document.getElementById("uklad").value;

        if(uklad==''){
            clear_input_error(document.getElementById("uklad"));
            return;
        }

        savecardUkladyToCookies(getCookie('wishcardUklady'),uklad);
        saveUkladGroupsToCookies(uklad,getCookie("symvol_text"), getCookie("endCard"));

        document.getElementById("startCard").value = getCookie("endCard");
        document.getElementById("button").innerHTML = "Получить расклад";

        setMsgToUser('select',"Ваша последняя карта: " + getCookie("endCard") + '.');
        
        setCookie('startCard','');
        setCookie('needType','');
        setCookie('wish','');
        setCookie('wishcardUklady','');
        setCookie('symvol_text','');
        setCookie('disableDolgType','');
		
		document.getElementById("direction").setAttribute("disabled","disabled");
        document.getElementById("wish").value = "";
		document.getElementById("symvol_text").value = "";
        document.getElementById("uklad").style.display = 'none';

        clear_input_error(document.getElementById("startCard"), true, false,false);
        clear_input_error(document.getElementById("sphere"), true, true,false);
        clear_input_error(document.getElementById("direction"), true, true,false);
        clear_input_error(document.getElementById("needType"), true, true,false);
        clear_input_error(document.getElementById("uklad"), true, true,false);

        document.getElementById("selectForm").style.display = "block";

        if(!clearMatrix){
            var checkMatrix = findMatrix();

            if (checkMatrix.cellsLeft === 0 && calculateDolgy()==0) {
                openModal();
            }
        }
        

        return;
    }
    else{
    
    setMsgToUser('select','Инициация...',true);

    var wish = document.getElementById("wish").value;
    var startCard = document.getElementById("startCard").value;
    var sphere = document.getElementById("sphere").value;
    var direction = document.getElementById("direction").value;
    var needType = document.getElementById("needType").value;
    var gender = document.getElementById("gender").value;
    var symvol_text = document.getElementById("symvol_text").value;

    if (gender === "") {
        setMsgToUser('select','Выберите ваш пол!');
        document.getElementById("gender").classList.add("alert_input");
        return;
    }

    if (startCard === "") {
        setMsgToUser('select','Выберите последнюю карту! Если это ваша первая игра, то: 8.');
        document.getElementById("startCard").classList.add("alert_input");
        return;
    }
    if (wish === "") {
        setMsgToUser('select','Введите желание!');
        document.getElementById("wish").classList.add("alert_input");
        return;
    }
    if (sphere === "") {
        setMsgToUser('select','Выберите сферу влияния!');
        document.getElementById("sphere").classList.add("alert_input");
        return;
    }
    if (direction === "") {
        setMsgToUser('select','Выберите направление влияния!');
        document.getElementById("direction").classList.add("alert_input");
        return;
    }
    if (needType === "") {
        setMsgToUser('select','Выберите тип необходимости!');
        document.getElementById("needType").classList.add("alert_input");
        return;
    }
    if (symvol_text === "") {
        setMsgToUser('select','Опишите для чего ваше желание!');
        document.getElementById("symvol_text").classList.add("alert_input");
        return;
    }

    var endCard = schemeSphereInfluence[sphere][direction];

    symvol_text = symvol_text.toLowerCase();

    wish = wish.toLowerCase() + ' для ' + symvol_text;

    if (startCard === endCard) {
        setMsgToUser('select','Выбранное направление сходно с направлением последней карты, смените!');
        return;
    }

    if (endCard === "Т" && needType === "п-р-з") {
        setMsgToUser('select','Выбранный тип не применим для выбранного направления, смените!');
        return;
    }

      set_result(gender, startCard, endCard, needType, wish, symvol_text, true);
    }
    
}

function clear_input_error(_this, isSelect = false, restore = false,alarm=true,msg=true) {
    if (!restore && alarm) {
        if (_this.value != "") {
            _this.classList.remove("alert_input");
			
			if(isSelect && msg){
				if(check_unselected()==''){
                    setMsgToUser('select',"У вас всё заполнено, можете нажать на кнопку получения расклада!");
				}
				else{
                    setMsgToUser('select',"Продолжайте заполнение!");
				}
				
			}
        } else {
            _this.classList.add("alert_input");
        }
    }

    if (isSelect == true) {
        let options = _this.querySelectorAll("option");

        if (restore) {
            _this.value = options[0].value;
        }

        options.forEach((option) => {
            if (option.value != "" && option.getAttribute("data-original") !== null) {
                option.innerHTML = option.getAttribute("data-original");
            } else {
                option.setAttribute("data-original", option.innerHTML);
            }

            if (option.value != "" && option.selected) {
                option.innerHTML = _this.getAttribute("data-selected") + ": " + option.getAttribute("data-original");
            }
        });
    }
}

function getCookie(name) {

if(name == 'cardGroups' || name == 'ukladGroups' || name == 'cardUklady'){
    var cookieValue = document.cookie
        .split("; ")
        .find((row) => row.startsWith(name+"="))
        ?.split("=")[1];

    if (cookieValue) {
        // Десериализуем данные обратно в объект
        return JSON.parse(decodeURIComponent(cookieValue));
    } else {
        return {};
    }
}
else{
    var matches = document.cookie.match(new RegExp("(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") + "=([^;]*)"));

    if (matches) {
        var result = decodeURIComponent(matches[1]);

        if (result === "undefined") {
            return undefined;
        } else if (result === "") {
            return undefined;
        } else {
            return result;
        }
    } else {
        return undefined;
    }
}
    
}

function formatDate() {
    var date = new Date();

    var dd = date.getDate();
    if (dd < 10) dd = "0" + dd;

    var mm = date.getMonth() + 1;
    if (mm < 10) mm = "0" + mm;

    var yy = date.getFullYear() % 100;
    if (yy < 10) yy = "0" + yy;

    var hh = date.getHours();
    if (hh < 10) hh = "0" + hh;

    var min = date.getMinutes();
    if (min < 10) min = "0" + min;

    var ss = date.getSeconds();
    if (ss < 10) ss = "0" + ss;

    return dd + "/" + mm + "/" + yy + " " + hh + ":" + min + ":" + ss;
}

function set_result(gender, startCard, endCard, needType, wish, symvol_text, generation = false) {

    
    if (generation == true) {
        setMsgToUser('formirovanie','Создание цепочки событий...');
    }

    blockUklad = document.getElementById("uklad");
    blockUklad.style.display = 'block';

    // Определяем масть карты на основе выбранного пола и направления

    if (gender === "male") {
        currentMast = ar_replace_mast_male;
    } else if (gender === "female") {
        currentMast = ar_replace_mast_female;
    }

    var typeoutput = '';

    if(getCookie('disableDolgType') == undefined){
        typeoutput = 'Желание';
    }
    else{
        typeoutput = 'Отработка долга (' + ukladvariantsStatus[getCookie('disableDolgType')] + ')';
    }

    let output = `${typeoutput}: желаю чтобы ${wish}.<br><br>Расклад: `;
    let output2 = "";

    const result2 = findBalancedPathWithSpecificEndTransition(startCard, endCard, needType);

    if (result2) {
        
        if (generation == true) {
            var wishcardUklady = formatDate() + " | желаю чтобы " + wish;
            setCookie('wishcardUklady',wishcardUklady);
        }

        result2.path.forEach((card, i) => {
            let mastNow = currentMast[result2.transitions[i]];

            let cardWithMast = card + mastNow;
            output += cardWithMast;
            if (i < result2.path.length - 1) {
                output += ` → `;
            }

            if (mastNow != "") {
                output2 += card + mastNow + ": я желаю от своей бдилки " + schemeSuitsDaysWeek[new Date().getDay()][mastNow] + " " + schemeСardAssignments[card][mastNow] + " чтобы " + wish + "<br><br>";

                if (generation == true) {
                    saveCardGroupsToCookies(wishcardUklady, card + mastNow);
                }
            }
        });

        if (output2 != "") {
            output2 = "<hr>МАНТРЫ на " + days[new Date().getDay()] + ":<br><br>" + output2 + '<button id="button2" class="open-modal-btn" onclick="updateDayNow()">Обновить день недели</button>';
        }
        
        setCookie('startCard',startCard);
        setCookie('endCard',endCard);
        setCookie('needType',needType);
        setCookie('gender',gender);
        setCookie('wish',wish);
        setCookie('symvol_text',symvol_text);

        document.getElementById("button").innerHTML = "Уклад полностью проработан";
        document.getElementById("selectForm").style.display = "none";

        if(getCookie('disableDolgType')!=undefined){
            blockUklad.value = getCookie('disableDolgType');
            blockUklad.setAttribute("disabled","disabled");
            clear_input_error(blockUklad, true, false,false);
        }
        else{
            blockUklad.removeAttribute("disabled");
        }

    } else {
        output += "не найден.";
    }

    setMsgToUser('formirovanie',output + output2);
}

// Функция для поиска сбалансированного пути
function findBalancedPathWithSpecificEndTransition(startCard, endCard, lastTransitionType) {
    // Проверка на одинаковые карты
    if (startCard === endCard) {
        return;
    }
    if (endCard === "Т" && lastTransitionType === "п-р-з") {
        return;
    }

    let queue = [[startCard, [], [], {}, 0, 0, ""]]; // Начальные параметры
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
            if (lastTransition === "п-р-з") {
                newCountPruz++;
            } else if (lastTransition === "з-р-п") {
                newCountZrp++;
            }
        }

        transitions.push(lastTransition);

        // Проверка на совпадение переходов и типов
        if (currentCard === endCard) {
            if (newCountPruz === newCountZrp && lastTransition === lastTransitionType) {
                return {
                    path,
                    transitions,
                };
            }
        }

        cardUsage[currentCard] = (cardUsage[currentCard] || 0) + 1;

        // Переход к следующей карте
        ["п-р-з", "з-р-п"].forEach((type) => {
            schemeTransitions[currentCard][type].forEach((nextCard) => {
                if (!path.includes(nextCard)) {
                    const newCardUsage = {
                        ...cardUsage,
                    };
                    queue.push([nextCard, path.slice(), transitions.slice(), newCardUsage, newCountPruz, newCountZrp, type]);
                }
            });
        });
    }

    return null;
}

function getcardUklad(name){
    if(cardUklady[name] == undefined){
        return '';
    }
    else if(ukladvariantsStatus[cardUklady[name]]==undefined){
        return '';
    }
    return ukladvariantsStatus[cardUklady[name]];
}

// Функция для выбора карт из разных раскладов
function createCardIterator() {
    return function () {
        var groups = Object.values(cardGroups);
        var groupsNames = Object.keys(cardGroups);

        let cardListElement = document.getElementById("cardList");

        if (currentGroupIndex < groups.length) {
            var currentGroup = groups[currentGroupIndex];

            if (currentGroupIndexWiew != currentGroupIndex) {
                currentGroupIndexWiew = currentGroupIndex;
                var currentGroupName = groupsNames[currentGroupIndexWiew];

                var li = document.createElement("li");
                var cardUkladSymvol = '';
                if(getcardUklad(groupsNames[currentGroupIndexWiew])!=''){
                    cardUkladSymvol = ' (' + getcardUklad(groupsNames[currentGroupIndexWiew]) + ')';
                }

                li.textContent = `${currentGroupName}${cardUkladSymvol}: ${cardGroups[currentGroupName].join(" → ")}`;
                cardListElement.appendChild(li);
            }

            if (currentCardIndex < currentGroup.length) {
                var currentCardIndexNext = currentCardIndex + 1;
                var cardUkladSymvol = '';
                if(currentGroup.length == currentCardIndexNext && getcardUklad(groupsNames[currentGroupIndexWiew])!=''){
                    cardUkladSymvol = '<br>' + getcardUklad(groupsNames[currentGroupIndexWiew]);
                }
                return currentGroup[currentCardIndex++] + cardUkladSymvol;
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
    const matrix = Array.from(
        {
            length: n,
        },
        () => Array(n).fill(null)
    );
    let x = Math.floor(n / 2);
    let y = Math.floor(n / 2);
    let num = 1;
    let directions = [
        [0, 1],
        [1, 0],
        [0, -1],
        [-1, 0],
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
    const table = document.getElementById("matrix");
    const n = matrix.length;
    let cardListElement = document.getElementById("cardList");

    table.innerHTML = "";
    cardListElement.innerHTML = "";

    currentGroupIndex = 0;
    currentCardIndex = 0;
    currentGroupIndexWiew = -2;

    for (let i = 0; i < n; i++) {
        const tr = document.createElement("tr");
        for (let j = 0; j < n; j++) {
            const td = document.createElement("td");
            //td.textContent = getNextCard();
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }

    highlightSequence(matrix);

    // Добавляем выделение последовательности чисел
    if (countAllCards() > 0) {
        document.getElementById("button3").style.display = "block";
    } else {
        cardListElement.innerHTML = '<br><br><b style="float:right;text-align:center;width:100%;">Здесь будет хранится история ваших желаний. Но вы сможете её очистить. Или подождать когда 100% заполнится матрица чтобы её освободить!</b>';
        document.getElementById("button3").style.display = "none";
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
                    y: j,
                };
            }
        }
    }

    // Добавляем класс highlight для каждого числа от 1 до 25
    positions.forEach((position, index) => {
        const td = document.getElementById("matrix").rows[position.x].cells[position.y];

        setTimeout(() => {
            if (currentGroupIndexWiew == -2) {
                currentGroupIndexWiew = -1;
                var cardNext = "✵";
            } else {
                var cardNext = getNextCard();
            }

            if (cardNext !== null) {
                td.classList.add("highlight");
                td.innerHTML = cardNext;
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

    setCookie('cardGroups',encodeURIComponent(serializedData));
}

// Функция для сохранения данных в куки
function saveUkladGroupsToCookies(ukladCode,ukladName, card) {
    // Добавляем карту в указанную группу или создаем новую группу, если она не существует

    if (!ukladGroups[ukladCode]) {
        ukladGroups[ukladCode] = {}; // Создаем объект, если он не существует
        ukladGroups[ukladCode]['name'] = ukladName;
        ukladGroups[ukladCode]['cards'] = [];
    }
    else{
        if(ukladName.length > ukladGroups[ukladCode]['name'].length){
            ukladGroups[ukladCode]['name'] = ukladName;
        }
    }


    ukladGroups[ukladCode]['cards'].push(card); // Добавляем карту в группу
    // Сериализуем объект в строку
    var serializedData = JSON.stringify(ukladGroups);

    setCookie('ukladGroups',encodeURIComponent(serializedData));
    
}
// Функция для сохранения данных в куки
function savecardUkladyToCookies(wishcardUklady,ukladType) {
    
    cardUklady[wishcardUklady] = ukladType;

    // Сериализуем объект в строку
    var serializedData = JSON.stringify(cardUklady);

    setCookie('cardUklady',encodeURIComponent(serializedData));
    
}

// Функция для удаления куки
function deleteCardGroupsCookies() {
    var isDelete = confirm("Точно хотите удалить всю историю?");

    if (isDelete == true) {

        destroyHistory();

        if (document.getElementById("button").innerHTML == "Уклад полностью проработан") {
            getCard(true);
        }

        openModal();
    }
}

// Функция для открытия модального окна
function openModal() {
    var checkMatrix = findMatrix();

    var matrix = fillSpiral(checkMatrix.matrix);
    renderMatrix(matrix);

    if (getCookie("startCard") === undefined && checkMatrix.cellsLeft === 0 && calculateDolgy()==0) {
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
    set_result(getCookie("gender"), getCookie("startCard"), getCookie("endCard"), getCookie("needType"), getCookie("wish"), getCookie("symvol_text"));
}

function destroyHistory(){

    cardGroups = {};
    ukladGroups = {};
    cardUklady = {};

    setCookie('cardGroups','');
    setCookie('ukladGroups','');
    setCookie('cardUklady','');

}

function freeMartix() {

    destroyHistory();

    closeModal();

    darkenScreenAndAnimateStar();
}

function darkenScreenAndAnimateStar() {
    var overlay = document.getElementById("overlay");
    var star = document.getElementById("star");

    // Затемнение экрана
    overlay.style.opacity = 1;
    overlay.style.pointerEvents = "auto";
    star.style.position = "fixed";
        star.classList.remove("sparkling-label");

    // Появление звезды и запуск анимации
    star.classList.add("animate");

    // Возвращаем звезду в исходное положение
    setTimeout(() => {
        star.classList.remove("animate");
        star.style.position = "relative";
        star.classList.add("sparkling-label");
    }, 4000);
    // Возвращаем звезду в исходное положение
    setTimeout(() => {
        overlay.style.opacity = 0;
        overlay.style.pointerEvents = "none";
        openModal();
    }, 4500);
}

// Функция для загрузки js
function loadScript(src, onLoadCallback, onErrorCallback) {
    var uniqueParam = new Date().getTime();

    var script = document.createElement("script");
    script.src = src + "?" + uniqueParam;

    script.onload = onLoadCallback;
    script.onerror = onErrorCallback;

    document.head.appendChild(script);
}

function setMsgToUser(type,text,scroll = false){
    var msg = text;
    if(type=='select' || type=='write'){
        msg = msg + dolgyDescription();
    }


    var blockResult = document.getElementById('result');

    blockResult.innerHTML = msg;
    blockResult.style.display = 'block';

    if(scroll){
        blockResult.scrollIntoView({
            behavior: "smooth", // Плавная прокрутка
            block: "start", // Начало элемента будет у верхнего края окна
        });
    }
}

// Настройка после загрузки страницы
function setupOnLoad() {

    cardGroups = getCookie('cardGroups');
    ukladGroups = getCookie('ukladGroups');
    cardUklady = getCookie('cardUklady');

    var selectUklad = document.getElementById('uklad');

    ukladvariants.forEach(option => {
        var optionElement = document.createElement('option');
        optionElement.value = option.value;
        optionElement.textContent = option.text;
        selectUklad.appendChild(optionElement);
    });

    if (getCookie("startCard") != undefined) {
        set_result(getCookie("gender"), getCookie("startCard"), getCookie("endCard"), getCookie("needType"), getCookie("wish"), getCookie("symvol_text"));
    } else {
        document.getElementById("selectForm").style.display = "block";
        if (getCookie("endCard") != undefined) {
            document.getElementById("startCard").value = getCookie("endCard");

            setMsgToUser('select',"Ваша последняя карта: " + getCookie("endCard") + '.');
        }
        else{
            setMsgToUser('start','Пасьянс Медичи помогает в сложных ситуациях, а Бдилка выявляет скрытые желания. Перед вами инструмент настоящей свободы в мире, где ваши границы сознания станут как спасением, так и ловушкой. Если это первый расклад, то ставьте последней картой: 8. Полную инструкцию смотрите на <a class="a_info" href="https://github.com/botogame/botogame/blob/main/freedom/interaction/vigil/README.md">сайте разработчика</a>. Мигающая звезда кликабельна!');
        }

        if (getCookie("gender") != undefined) {
            document.getElementById("gender").value = getCookie("gender");
        }
    }

    // Инициализация списка направлений при загрузке страницы
    updateDirections();

    if (typeof Website2APK !== "undefined") {
        document.getElementById("buttonClose").style.display = "block";
    }
	
	
    clear_input_error(document.getElementById("startCard"), true, false,false);
    clear_input_error(document.getElementById("gender"), true, false,false);

    document.getElementById("button").style.display = 'block';

}

function getCardsBetweenMultiple(ukladCode) {

    const resultSet = new Set();

    if(ukladGroups[ukladCode]==undefined){
        return [];
    }

    var selectedCards = ukladGroups[ukladCode]['cards'];

    // Sort selectedCards based on the order in cards
    selectedCards.sort((a, b) => cards.indexOf(a) - cards.indexOf(b));

    for (let i = 0; i < selectedCards.length - 1; i++) {
        const card1 = selectedCards[i];
        const card2 = selectedCards[i + 1];

        const index1 = cards.indexOf(card1);
        const index2 = cards.indexOf(card2);

        if (index1 === -1 || index2 === -1) {
            return [];
        }

        if (index1 !== index2) {
            const start = Math.min(index1, index2) + 1;
            const end = Math.max(index1, index2);
            for (let j = start; j < end; j++) {
                resultSet.add(cards[j]);
            }
        }
    }

    // Convert the set to an array and sort it based on the original card order
    return Array.from(resultSet).sort((a, b) => cards.indexOf(a) - cards.indexOf(b));
}

function calculateDolgy() {
    let totalCards = 0;

    ukladvariants.forEach(option => {
        var resultSet = getCardsBetweenMultiple(option.value);
        totalCards += resultSet.length;
    });

    return totalCards;
}

function setCookie(name,value) {
    if(value==''){
        document.cookie = name+ "=;SameSite=None;Secure;max-age=-1";
    }else{
        document.cookie = name + '=' + value +';SameSite=None;Secure;max-age=' + oneYearInSeconds;
    }
    
}

function otrabotatDolg(dolgType,cardSet){

    var startCard = document.getElementById("startCard").value;
    var gender = document.getElementById("gender").value;

    if (gender === "") {
        setMsgToUser('select','Выберите ваш пол!');
        document.getElementById("gender").classList.add("alert_input");
        return;
    }

    if (startCard === "") {
        setMsgToUser('select','Выберите последнюю карту!');
        document.getElementById("startCard").classList.add("alert_input");
        return;
    }
    
    if (startCard === cardSet) {
        setMsgToUser('select','Выбранная карта сходна с направлением последней карты, создайте свой расклад для смены последней карты или выберите другую карту отработки!');
        return;
    }
    
    var needType = "п-р-з";
    var symvol_text = ukladGroups[dolgType]['name'];
    var wish = ukladvariantsMsg[dolgType] + ' для ' + symvol_text;

    setCookie('disableDolgType',dolgType);

    set_result(gender, startCard, cardSet, needType, wish, symvol_text, true);

}
