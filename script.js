const cardsArray = [
  'devicon-html5-plain colored',
  'devicon-css3-plain colored',
  'devicon-javascript-plain colored',
  'devicon-react-original colored',
  'devicon-github-original colored',
  'devicon-python-plain colored',
  'devicon-vscode-plain colored',
  'devicon-android-plain colored'
];

let cards = [...cardsArray, ...cardsArray]; // Duplicate for pairs
let firstCard = null;
let secondCard = null;
let lockBoard = false;

const board = document.getElementById('game-board');
const restartBtn = document.getElementById('restart');

// Shuffle cards
function shuffle(array) {
  return array.sort(() => 0.5 - Math.random());
}

// Create card elements
function createBoard() {
  board.innerHTML = '';
  cards = shuffle(cards);

  cards.forEach(iconClass => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.icon = iconClass;

    card.innerHTML = `
      <div class="card-inner">
        <div class="card-front">
          <i class="${iconClass}"></i>
        </div>
        <div class="card-back"></div>
      </div>
    `;

    card.addEventListener('click', flipCard);
    board.appendChild(card);
  });
}

// Flip card
function flipCard() {
  if (lockBoard || this === firstCard) return;

  this.classList.add('flip');

  if (!firstCard) {
    firstCard = this;
    return;
  }

  secondCard = this;
  checkMatch();
}

// Check match
function checkMatch() {
  let isMatch = firstCard.dataset.icon === secondCard.dataset.icon;

  if (isMatch) {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetTurn();
  } else {
    lockBoard = true;
    setTimeout(() => {
      firstCard.classList.remove('flip');
      secondCard.classList.remove('flip');
      resetTurn();
    }, 1000);
  }
}

// Reset turn
function resetTurn() {
  [firstCard, secondCard] = [null, null];
  lockBoard = false;
}

// Restart game
restartBtn.addEventListener('click', createBoard);

// Initial load
createBoard();
