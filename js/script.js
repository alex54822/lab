const translations = {
    ua: {
        "nav-home": "Головна",
        "nav-gallery": "Галерея",
        "nav-poll": "Опитування",
        "calc-title": "Калькулятор",
        "calc-ph1": "Число 1",
        "calc-ph2": "Число 2",
        "calc-add": "+ (сума)",
        "calc-sub": "- (різниця)",
        "calc-mult": "* (множення)",
        "calc-div": "/ (ділення)",
        "quote-title": "Цитата дня:",
        "gal-hover": "Наведіть мишку",
        "gal-choose": "Вибір зображення (Radio)",
        "btn-zoom-in": "Збільшити копію",
        "btn-zoom-out": "Зменшити копію",
        "btn-reset": "Повернути як було",
        "form1-title": "Форма 1: Опитування",
        "lbl-name": "Ім'я:",
        "lbl-like": "Подобається JS?",
        "lbl-yes": "Так",
        "lbl-no": "Ні",
        "lbl-seen": "Що бачили?",
        "lbl-home": "Головна",
        "lbl-gal": "Галерея",
        "lbl-comment": "Коментар:",
        "btn-check": "Перевірити і передати",
        "btn-clear": "Очистити",
        "form2-title": "Форма 2: Результат",
        "btn-send": "Відправити лист"
    },
    en: {
        "nav-home": "Home",
        "nav-gallery": "Gallery",
        "nav-poll": "Survey",
        "calc-title": "Calculator",
        "calc-ph1": "Number 1",
        "calc-ph2": "Number 2",
        "calc-add": "+ (sum)",
        "calc-sub": "- (diff)",
        "calc-mult": "* (mult)",
        "calc-div": "/ (div)",
        "quote-title": "Quote of the day:",
        "gal-hover": "Hover mouse",
        "gal-choose": "Choose Image (Radio)",
        "btn-zoom-in": "Zoom In",
        "btn-zoom-out": "Zoom Out",
        "btn-reset": "Reset Size",
        "form1-title": "Form 1: Survey",
        "lbl-name": "Name:",
        "lbl-like": "Do you like JS?",
        "lbl-yes": "Yes",
        "lbl-no": "No",
        "lbl-seen": "What visited?",
        "lbl-home": "Home",
        "lbl-gal": "Gallery",
        "lbl-comment": "Comment:",
        "btn-check": "Check & Transfer",
        "btn-clear": "Clear",
        "form2-title": "Form 2: Result",
        "btn-send": "Send Email"
    }
};


const quotesList = [
    { ua: "Знання — це сила.", en: "Knowledge is power." },
    { ua: "Код — це поезія.", en: "Code is poetry." },
    { ua: "Просто зроби це.", en: "Just do it." },
    { ua: "Сім разів відмір, один раз відріж.", en: "Measure twice, cut once." },
    { ua: "Практика робить майстра.", en: "Practice makes perfect." }
];

// Вибираємо випадковий індекс цитати при старті
let currentQuoteIndex = Math.floor(Math.random() * quotesList.length);

// Функція зміни мови 
function switchLang(lang) {
    // А. Перекладаємо статичні тексти
    const texts = translations[lang];
    for (let key in texts) {
        const element = document.getElementById(key);
        if (element) {
            if (element.tagName === 'INPUT' && (element.type === 'submit' || element.type === 'reset' || element.type === 'button')) {
                element.value = texts[key];
            } else {
                element.innerText = texts[key];
            }
        }
    }

    // Перекладаємо плейсхолдери калькулятора
    const p1 = document.getElementById('val1');
    const p2 = document.getElementById('val2');
    if (p1 && p2) {
        p1.placeholder = texts["calc-ph1"];
        p2.placeholder = texts["calc-ph2"];
    }

    // Перекладаємо ЦИТАТУ 
    const quoteBox = document.getElementById('quoteDisplay');
    if (quoteBox) {
        quoteBox.innerText = quotesList[currentQuoteIndex][lang];
    }
}

// Запуск при завантаженні сторінки
window.onload = function() {
    // Встановлюємо українську мову за замовчуванням
    switchLang('ua');
};


// Логіка Калькулятора
function calculate(action) {
    let n1 = parseFloat(document.getElementById('val1').value);
    let n2 = parseFloat(document.getElementById('val2').value);
    if (isNaN(n1) || isNaN(n2)) { alert("Введіть числа / Enter numbers"); return; }

    if (action === '+') document.write("<h1>Sum: " + (n1 + n2) + "</h1><a href='index.html'>Back</a>");
    else if (action === '-') document.write("<h1>Diff: " + (n1 - n2) + "</h1><a href='index.html'>Back</a>");
    else if (action === '*') alert("Result: " + (n1 * n2));
    else if (action === '/') {
        if (n2 === 0) alert("Zero division!");
        else alert("Result: " + (n1 / n2));
    }
}

// Логіка Галерї
function mouseOverImg(img) { img.style.transform = "scale(1.5)"; img.style.zIndex = "100"}
function mouseOutImg(img) { img.style.transform = "scale(1)"; img.style.zIndex = "auto"}

function setImage(imageName) {
    const path = "assets/" + imageName; 
    document.getElementById('galleryImg').src = path;
}

function resizeManual(mode) {
    const img = document.getElementById('galleryImg');
    if (mode === 'big') { img.style.width = "500px"; } 
    else { img.style.width = "150px"; }
}

function resetImgSettings() {
    const img = document.getElementById('galleryImg');
    // Скидаємо стилі розміру
    img.style.width = "300px"; 
}

// Логіка Форм 
function processForm(e) {
    e.preventDefault();
    const name = document.getElementById('inpName').value;
    const comment = document.getElementById('inpComment').value;
    
    // Отримання радіо
    const likeOptions = document.getElementsByName('like');
    let isLike = "Unknown";
    for(let opt of likeOptions) { if(opt.checked) isLike = opt.nextSibling.textContent.trim(); }

    // Отримання чекбоксів
    let places = [];
    if(document.getElementById('chkHome').checked) places.push(document.getElementById('lbl-home').innerText);
    if(document.getElementById('chkGallery').checked) places.push(document.getElementById('lbl-gal').innerText);

    const finalTxt = `Name: ${name}\nLiked JS: ${isLike}\nVisited: ${places.join(', ')}\nComment: ${comment}`;
    document.getElementById('resultBox').value = finalTxt;
}

function mailData() {
    window.location.href = "mailto:aloxa757@gmail.com?body=" + encodeURIComponent(document.getElementById('resultBox').value);
}