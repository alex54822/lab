const dailyQuotes = [
    "Знання — це сила.",
    "JavaScript — це просто, якщо практикуватися.",
    "Сім разів відмір, один раз відріж.",
    "Хто не працює, той не їсть."
];

function showQuote() {
    const randomIndex = Math.floor(Math.random() * dailyQuotes.length);
    const displayElement = document.getElementById('quoteDisplay');
    if(displayElement) {
        displayElement.innerText = dailyQuotes[randomIndex];
    }
}

// Запуск при завантаженні
window.onload = showQuote;