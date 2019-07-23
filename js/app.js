let missed = 0;
const startScreen = document.getElementById('overlay');
const h2 = startScreen.querySelector('#overlay > h2');
const startButton = document.querySelector('.btn__reset');
const keyboard = document.getElementById('qwerty');
const phrase = document.getElementById('phrase');
const phraseContainer = document.querySelector('#phrase ul');
const currentPhrase = [];
let won = false;

// Random randomNumber
function getRandomNumber(high,low) {
  return Math.floor(Math.random() * high) + low;
}

// Object Oriented javascript
const overlay = {
  win       : () => {
                h2.innerHTML = 'You Win!';
                startButton.innerHTML = 'Play Again';
                startScreen.classList.add('win'),
                startScreen.style.display = 'inherit';
              },
  lose      : () => {
                h2.innerHTML = 'oh, so close!';
                startButton.innerHTML = 'Try Again';
                startScreen.classList.add('lose'),
                startScreen.style.display = 'inherit';
              },
  hide      : () => {
                startScreen.style.display = 'none';
              },
};

const phraser = {
  getNew    : (arr) => {
                const newArray = [];
                const randomNumber = getRandomNumber(phrases.length,0);
                const phrase = phrases[randomNumber].phrase;
                for(let i=0;i<phrase.length;i++) {
                  let letter = phrase[i];
                  newArray.push(letter);
                }
                return newArray;
              },
  clear     : () => {
              phraseContainer.innerHTML = '';
              const buttons = document.querySelectorAll('#qwerty BUTTON');
              const lives = document.querySelectorAll('#scoreboard ol li img');
              missed = 0;
              for(let i=0;i<buttons.length;i++) {
                buttons[i].classList.remove('chosen');
                buttons[i].removeAttribute("disabled");
              }
              for(let i=0;i<lives.length;i++) {
                lives[i].setAttribute('src','images/live.png');
              }
            }
};

function addPhraseToDisplay(arr) {
  const container = document.querySelector('#phrase ul');
  for(let i=0;i<arr.length;i++) {
    const li = document.createElement('li');
    if(arr[i] !== ' ') {
      li.innerHTML = arr[i];
      li.classList.add('letter');
    } else {
      li.innerHTML = '&nbsp;';
      li.classList.add('space');
    }
    container.appendChild(li);
  }
}

function checkLetter(letter) {
  const listItems = document.getElementsByClassName('letter');
  const guessedLetter = letter.toUpperCase();
  let match = null;
  for(let i=0;i<listItems.length;i++) {
    const item = listItems[i];
    const text = item.textContent.toUpperCase();
    if(guessedLetter === text) {
      item.classList.add('show');
      match = text;
    }
  }
  if(match !== null) {
    return match;
  } else {
    return null;
  }
}

function checkWin() {
  const showing = document.getElementsByClassName('show');
  const letters = document.getElementsByClassName('letter');
  // Check if won or not
  if(showing.length === letters.length) {
      overlay.win();
  } else if(missed >= 5) {
      overlay.lose();
  }
}

function updateLives() {
  const lives = document.querySelectorAll('#scoreboard ol li');
  missed = missed + 1;
  for(let i=0;i<missed;i++) {
    const life = lives[i].firstElementChild;
    life.setAttribute('src','images/lostHeart.png');
  }
}

keyboard.addEventListener('click',(event) => {
  const chosenLetter = event.target;
  if(chosenLetter.tagName == 'BUTTON') {
    const letterFound = checkLetter(chosenLetter.textContent);
    chosenLetter.classList.add('chosen');
    chosenLetter.setAttribute('disabled','disabled');
    if(letterFound === null) {
      updateLives(true);
    }
    checkWin();
  }
});

startButton.addEventListener('click',() => {
  phraser.clear();
  const newPhrase = phraser.getNew(phrases);
  addPhraseToDisplay(newPhrase);
  overlay.hide();
});
