const cards = window.document.querySelectorAll('.card');
let hasFlipperCard = false;
let firstCard, secondCard;
let lockBoard = false;

function flipCard () {
    if(lockBoard) return;
    if(this === firstCard) return;

    this.classList.add('flip'); //O método toggle add e tira uma classe
    if(!hasFlipperCard) {
        hasFlipperCard = true;
        firstCard = this;
        return;
    }

    secondCard = this;
    hasFlipperCard = false
    checkForMath();
}

function checkForMath() {
    if(firstCard.dataset.card === secondCard.dataset.card) {
        disableCards();
        return;
    }

    unflipCards();
}

function disableCards() {
    firstCard.removeEventListenner('click', flipCard);
    secondCard.removeEventListenner('click', flipCard)

    resetBoard();
}

function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetBoard();
    }, 1500);
}

function resetBoard() {
    [hasFlipperCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

(function shuffle() {
    cards.forEach((card) => {
        let ramdomPosition = Math.floor(Math.random() * 12); // a função Math.floor sorteará um número inteiro
        card.style.order = ramdomPosition; //a propriedade order ordena as cartas
    })
})(); //esses parenteses constroem uma imediatly function, que renderiza assim que o código inicia, sem necessidade de ser chamada



cards.forEach((card) => {
    card.addEventListener('click', flipCard)
})