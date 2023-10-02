/* CONTAINER */
const roundsOutput = document.querySelector('.rounds');
const resultOutput = document.querySelector('.interium-result');
const inputButtons = document.querySelectorAll('.game-elements i');
const playerOutput = document.querySelector('.player-turn');
const cpuOutput = document.querySelector('.cpu-turn');
const gameMessage = document.querySelector('.game-message');
const restartGame = document.querySelector('.restart');

const gameElementUI = {
  rock: {
    ui: '<i class="fa-solid fa-hand-fist" style="color: #fff400;"></i>',
    value: 'rock',
    condition: function (cpuVal) {
      return cpuVal === gameElementUI.paper.value ? false : true;
    },
  },
  paper: {
    ui: '<i class="fa-solid fa-hand" style="color: #fff400;"></i>',
    value: 'paper',
    condition: function (cpuVal) {
      return cpuVal === gameElementUI.scissor.value ? false : true;
    },
  },
  scissor: {
    ui: '<i class="fa-solid fa-hand-scissors fa-rotate-90" style="color: #fff400;"></i>',
    value: 'scissor',
    condition: function (cpuVal) {
      return cpuVal === gameElementUI.rock.value ? false : true;
    },
  },
  pointer: {
    ui: '<i class="fa-solid fa-hand-pointer fa-rotate-180 pointer" style="color: #fff400;"></i>',
  },
  generateRound(playerVal, cpuVal) {
    // Draw
    if (playerVal === cpuVal) {
      return null;
    }

    return this[playerVal].condition(cpuVal);
  },
};

const allElements = ['rock', 'scissor', 'paper'];

/* PROPERTIES */
let actualRound = 0;
let maxRounds = 0;
let playerScore = 0;
let cpuScore = 0;

/* FUNCTIONS */
const chooseElement = (e) => {
  // get inputs
  let inputEl = e.target.getAttribute('value');

  maxRounds =
    maxRounds === 0
      ? Number(document.querySelector('input[name="rounds"]:checked').value)
      : maxRounds;

  actualRound++; // Runde hochzählen

  // generate cpu choice
  let cpuInput = allElements[Math.floor(Math.random() * allElements.length)];
  // show in UI!
  showChoiceElements(inputEl, cpuInput);
  showRounds();

  // generate win loose condition
  let matchOutput = gameElementUI.generateRound(inputEl, cpuInput);
  generateResult(matchOutput, inputEl, cpuInput);
};

const showChoiceElements = (playerInput, cpuInput) => {
  playerOutput.innerHTML = gameElementUI[playerInput].ui;
  cpuOutput.innerHTML = gameElementUI[cpuInput].ui;
};

const showRounds = () => {
  roundsOutput.querySelectorAll('.rounds-select').forEach((dom) => dom?.remove()); // check if exists
  roundsOutput.innerHTML = `<h1>How many rounds?</h1>${actualRound} / ${maxRounds}`;
  roundsOutput.style.alignItems = 'center';
};

const generateResult = (matchOutput, playerVal, cpuVal) => {
  gameMessage.innerText =
    matchOutput === null
      ? `It was a draw! You both chose ${playerVal}`
      : matchOutput === true
      ? `${playerVal} beats ${cpuVal}. You win!`
      : `${cpuVal} beats ${playerVal}. You loose!`;

  matchOutput === true ? playerScore++ : cpuScore++;

  // check if max round
  if (actualRound === maxRounds) {
    matchEnd();
    return;
  }

  resultOutput.innerHTML = `<p>${playerScore} : ${cpuScore}</p>`;
};

const matchEnd = () => {
  // click event entfernen
  inputButtons.forEach((i) => i.removeEventListener('click', chooseElement));
  // child element von game-elements clearn
  const buttonParent = inputButtons[0].parentNode;
  console.log(buttonParent);
  buttonParent.innerHTML = gameElementUI.pointer.ui;
  gameMessage.innerText =
    playerScore > cpuScore
      ? `You win! Try again`
      : cpuScore > playerScore
      ? 'You loose. Try again'
      : 'its a draw. Try again';
};

/* EVENTLISTENER */
inputButtons.forEach((i) => i.addEventListener('click', chooseElement));
restartGame.addEventListener('click', () => location.reload());
