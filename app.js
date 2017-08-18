

var scores, roundScore, activePlayer, player1Rolls, player2Rolls, gameFinished;
init();

document.querySelector('.btn-roll').addEventListener('click', function() {
  if (gameFinished != true) { // the state variable here checks first if the game is finished, if not, the game carries on
      //1. This gives me a random number between 1 and 6
    var dice = Math.floor(Math.random() * 6) + 1;
    if (activePlayer === 0) {
    player1Rolls[0] = player1Rolls[1];
    player1Rolls[1] = dice;
    console.log('player-' + (activePlayer + 1) + '\'s previous roll was = ' + player1Rolls[0] + ', their current roll is = ' + player1Rolls[1]);
      if (player1Rolls[1] + player1Rolls[0] === 12) {
        document.getElementById('score-' + activePlayer).textContent = '0';
        nextPlayer();
      } else if (dice !== 1) {
        //2. Display the result
        var diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block'; /*renders the element as a block-level element - HTML code for starting on a
        new line and takes up the full width available. */
        diceDOM.src = 'dice-' + dice + '.png';
        //3. Update the roundScore ONLY IF the rolled number is NOT a 1
        // } else if (dice !== 1) {
        roundScore += dice; // so here I update the roundScore adding the new die roll to it
        document.querySelector('#current-' + activePlayer).textContent = roundScore; // and here I display it.
      } else {
        nextPlayer();
      }
    } else {
      player2Rolls[0] = player2Rolls[1];
      player2Rolls[1] = dice;
      console.log('previous roll of player' + (activePlayer + 1) + ' = ' + player2Rolls[0]);
      console.log('current roll of player' + (activePlayer + 1) + ' = ' + player2Rolls[1]);
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
    }
  }
});

document.querySelector('.btn-hold').addEventListener('click', function() {
  if (gameFinished != true) {
    scores[activePlayer] += roundScore; // I first tried an if/else statement, which worked fine, but his solution is so much more elegant
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
    if (scores[activePlayer] >= 20) {
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
  // document.querySelector('.player-0-panel').classList.remove('active'); here the '.player-' selects the class to remove 'active'
  // document.querySelector('.player-1-panel').classList.add('active'); here it adds the 'active' status (see the style.css) to player-1
  document.querySelector('.player-0-panel').classList.toggle('active'); //instead of the aboe you can use the 'toggle' method
  document.querySelector('.player-1-panel').classList.toggle('active');
  document.querySelector('.dice').style.display = 'none';
};

function init() {
  gameFinished = false;
  scores = [0,0];
  roundScore = 0;
  activePlayer = 0;
  player1Rolls = [0,0];
  player2Rolls = [0,0];
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
