/*global getWinner*/
var state = {
  size: [],
  moves: []
};
var game = localStorage.getItem('game');
if (game) {
  state = JSON.parse(game);
}
window.addEventListener('load', function start() {
  'use strict';
  var generateField = document.querySelector('.generateField');
  var input = document.querySelector('input');
  var errorMessage = document.querySelector('.error-message');
  var startGame = document.querySelector('.startGame');
  var mainGame = document.querySelector('.mainGame');
  var startNewGame = document.querySelector('.startNewGame');
  var field = document.querySelector('.field');
  var winnerMessage = document.querySelector('.winner-message');
  var win;
  var i;
  var j;
  var row;
  var cell;
  var aim;
  var cells;
  function update() {
    if (state.size[0]) {
      for (i = 0; i < state.size[0]; i++) {
        row = document.createElement('div');
        row.setAttribute('class', 'row');
        field.appendChild(row);
        for (j = 0; j < state.size[0]; j++) {
          cell = document.createElement('div');
          cell.setAttribute('class', 'cell');
          row.appendChild(cell);
        }
      }
      errorMessage.innerHTML = '';
      startGame.style.display = 'none';
      mainGame.style.display = 'block';
      cells = document.querySelectorAll('.cell');
      for (i = 0; i < cells.length; i++) {
        for (j = 0; j < state.moves.length; j++) {
          if (i === state.moves[j] && (j % 2 === 0)) {
            cells[i].classList.add('x');
          } else if (i === state.moves[j] && (j % 2 !== 0)) {
            cells[i].classList.add('o');
          }
        }
      }
    }
    if ((state.moves.length) % 2 === 0) {
      aim = 'x';
    } else {
      aim = 'o';
    }
    if (getWinner() === 'x') {
      winnerMessage.innerHTML = 'Крестик победил';
    }
    if (getWinner() === 'o') {
      winnerMessage.innerHTML = 'Нолик победил';
    }
  }
  if (getWinner() !== 'x' || getWinner() !== 'o' ) {
    update();
  }
  generateField.addEventListener('click', function generate() {
    var fieldSize = input.value;
    if (!isFinite(fieldSize) || fieldSize > 15 || fieldSize < 5 || parseInt(fieldSize, 10) !== parseFloat(fieldSize) ) {
      errorMessage.innerHTML = 'Вы ввели некорректное число';
    } else {
      state.size.push(fieldSize);
      update();
      localStorage.setItem('game', JSON.stringify(state));
    }
    aim = 'x';
  });
  startNewGame.addEventListener('click', function newGame() {
    aim = 'x';
    winnerMessage.innerHTML = '';
    field.innerHTML = '';
    mainGame.style.display = 'none';
    startGame.style.display = 'inline-block';
    input.value = '';
    win = '';
    localStorage.clear();
    state = {
      size: [],
      moves: []
    };
  });
  field.addEventListener('click', function games() {
    var target = event.target;
    var index;
    if ( win !== true ) {
      if (target.classList.contains('cell')) {
        if (!(target.classList.contains('x')) && !(target.classList.contains('o'))) {
          target.classList.add(aim);
          if (aim === 'x') {
            aim = 'o';
          } else {
            aim = 'x';
          }
          cells = document.querySelectorAll('.cell');
          index = Array.prototype.indexOf.call(cells, event.target);
          state.moves.push(index);
          localStorage.setItem('game', JSON.stringify(state));
        }
      }
      win = getWinner();
      if (win === 'x') {
        winnerMessage.innerHTML = 'Крестик победил';
        win = true;
      }
      if (win === 'o') {
        winnerMessage.innerHTML = 'Нолик победил';
        win = true;
      }
    }
  });
});
