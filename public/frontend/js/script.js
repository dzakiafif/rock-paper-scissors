const playerChoice = document.querySelectorAll('[data-player]');
const computerChoice = document.querySelectorAll('[data-comp]');
let match = document.querySelector('.match');
let versus = document.createElement('h2');
versus.textContent = 'VS';
match.appendChild(versus);
let case1 = document.createElement('img');
case1.setAttribute('id', 'case1');
case1.setAttribute('src', './frontend/assets/images/case1.jpg');
match.appendChild(case1);
let case2 = document.createElement('img');
case2.setAttribute('id', 'case2');
case2.setAttribute('src', './frontend/assets/images/case2.jpg');
match.appendChild(case2);
let case3 = document.createElement('img');
case3.setAttribute('id', 'case3');
case3.setAttribute('src', './frontend/assets/images/case3.jpg');
match.appendChild(case3);

Array.from(document.querySelectorAll('.match img')).forEach(function (val) {
  val.style.display = 'none';
});

class Game {
  constructor() {
    if (this.constructor === Game) {
      throw new Error('Cannot instantiate from Game Class');
    }
    this._computer = this._setComputerChoice();
  }

  _setComputerChoice() {
    const CHOICES = ['rock', 'paper', 'scissors'];
    const randomIndex = Math.floor(Math.random() * CHOICES.length);
    const computer = CHOICES[randomIndex];
    computerChoice.forEach((el) => {
      if (el.dataset.comp === computer) {
        const selection = el.parentElement;
        UI.makeBackground(selection);
      } else {
        el.parentElement.classList.remove('selected');
      }
    });
    return computer;
  }

  _match() {
    if (this._player === this._computer) {
      UI.draw();
    } else {
      if (this._player === 'rock') {
        this._computer === 'paper' ? UI.compWin() : UI.playerWin();
      }
      if (this._player === 'paper') {
        return this._computer === 'rock' ? UI.playerWin() : UI.compWin();
      }
      if (this._player === 'scissors') {
        return this._computer === 'paper' ? UI.playerWin() : UI.compWin();
      }
    }
  }
}

class Player extends Game {
  _player;
  constructor(player) {
    super();
    this._player = player;
  }
}

class UI {
  static makeBackground(selection) {
    selection.classList.add('selected');
  }

  static initialState() {
    versus.remove();
  }

  static draw() {
    match.children[0] === versus && UI.initialState();
    document.querySelector('.match #case1').style.display = 'none';
    document.querySelector('.match #case2').style.display = 'none';
    document.querySelector('.match #case3').style.display = 'block';
  }

  static playerWin() {
    match.children[0] === versus && UI.initialState();
    document.querySelector('.match #case1').style.display = 'none';
    document.querySelector('.match #case2').style.display = 'block';
    document.querySelector('.match #case3').style.display = 'none';
  }

  static compWin() {
    match.children[0] === versus && UI.initialState();
    document.querySelector('.match #case1').style.display = 'block';
    document.querySelector('.match #case2').style.display = 'none';
    document.querySelector('.match #case3').style.display = 'none';
  }
}

playerChoice.forEach((el, i) => {
  el.addEventListener('click', (e) => {
    const players = e.target.dataset.player;
    selection = playerChoice[i].parentElement;
    UI.makeBackground(selection);
    Array.from(
      document.querySelectorAll(
        `.game-board #player div:not(#${playerChoice[i].parentElement.id})`
      )
    ).forEach((val) => {
      if (val.classList.contains('selected')) {
        val.classList.remove('selected');
      }
    });
    const playerOne = new Player(players);
    playerOne._match();
    console.log(playerOne);
  });
});
