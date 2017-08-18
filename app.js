

var scores, roundScore, activePlayer, winningScore, gameFinished; //player1Rolls, player2Rolls

init();

var lastDice;

document.querySelector('.btn-roll').addEventListener('click', function() {
  if (gameFinished != true) { // the state variable here checks first if the game is finished, if not, the game carries on
    var dice = Math.floor(Math.random() * 6) + 1;
      var diceDOM = document.querySelector('.dice');
      diceDOM.style.display = 'block';
      diceDOM.src = 'dice-' + dice + '.png';

      if (dice === 6 && lastDice === 6) {
        scores[activePlayer] = 0;
        document.querySelector('#score-' + activePlayer).textContent = '0';
        nextPlayer();
      } else if (dice !== 1) {
        roundScore += dice;
        document.querySelector('#current-' + activePlayer).textContent = roundScore;
      } else {
        nextPlayer();
      }

      lastDice = dice; /* below, commented out, is my solution (verbose) and obviously way too long for a single function.
                       I didn't think of assigning 'dice' to another variable
                       at the end of the function, after 'dice' had been set by the current roll earlier in the function. I need
                       to be more mindful of the execution context and the execution stack.
      if (activePlayer === 0) {
      player1Rolls[0] = player1Rolls[1];
      player1Rolls[1] = dice;
      console.log('player-' + (activePlayer + 1) + '\'s previous roll was = ' + player1Rolls[0] + ', their current roll is = ' + player1Rolls[1]);
      if (player1Rolls[1] + player1Rolls[0] === 12) {
        document.getElementById('score-' + activePlayer).textContent = '0';
        nextPlayer();
      } else if (dice !== 1) {
        var diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-' + dice + '.png';
        // } else if (dice !== 1) {
        roundScore += dice;
        document.querySelector('#current-' + activePlayer).textContent = roundScore;
      } else {
        nextPlayer();
      }
    } else {
      player2Rolls[0] = player2Rolls[1];
      player2Rolls[1] = dice;
        if (player2Rolls[1] + player2Rolls[0] === 12) {
          document.getElementById('score-' + activePlayer).textContent = '0';
          nextPlayer();
        } else if (dice !== 1) {
          var diceDOM = document.querySelector('.dice');
          diceDOM.style.display = 'block';
          diceDOM.src = 'dice-' + dice + '.png';
          roundScore += dice;
          document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } else {
          nextPlayer();
        }
      } */
  }
});

document.querySelector('.btn-hold').addEventListener('click', function() {
  if (gameFinished != true) {
    scores[activePlayer] += roundScore; // I first tried an if/else statement, which worked fine, but his solution ([activePlayer]) is so much more elegant
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
    if (scores[activePlayer] >= winningScore) {
    document.querySelector('#name-' + activePlayer).textContent = 'Player ' + (activePlayer + 1) + ' Wins!';
    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner'); // ('.classList' accesses the classes that the respective element has)
    document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active'); // remember, you have 'add', 'remove' and 'toggle'
    gameFinished = true;
    } else {
    nextPlayer();
    }
  }
});

document.querySelector('.btn-new').addEventListener('click', init); // If I add the call operator () here, init would be immediately called!

function nextPlayer() {
  roundScore = 0;
  activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';
  document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-1-panel').classList.toggle('active');
  document.querySelector('.dice').style.display = 'none';
};

function init() {
  gameFinished = false;
  scores = [0,0]; // [player-1, player-2]
  roundScore = 0;
  activePlayer = 0;
  // player1Rolls = [0,0]; // [previous, current]
  // player2Rolls = [0,0]; // [previous, current]
  document.querySelector('.dice').style.display = 'none'; /* so here we're selecting the class dice using the
  '.'(dot) selector and as we want to change the style and the property of how it's displayed we use these
  methods and set its value to 'none' so that the die is not displayed
  */
  document.getElementById('score-0').textContent = '0'; /* Rather than using querySelector, I'm now using
  .getElementById as its much faster, and then I set it to 0. An then I do that for the other player and also
  for the current roll scores of each player */
  document.getElementById('score-1').textContent = '0';
  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';
  document.getElementById('name-0').textContent = 'PLAYER 1';
  document.getElementById('name-1').textContent = 'PLAYER 2';
  document.querySelector('.player-0-panel').classList.remove('winner');
  document.querySelector('.player-1-panel').classList.remove('winner');
  document.querySelector('.player-0-panel').classList.remove('active');
  document.querySelector('.player-1-panel').classList.remove('active');
  document.querySelector('.player-0-panel').classList.add('active');
};
