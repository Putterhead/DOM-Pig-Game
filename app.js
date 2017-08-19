

var scores, roundScore, activePlayer, gameFinished; //player1Rolls, player2Rolls
var winningScore = 100
init();

var lastDice;

// function roll() {
//   Math.floor(Math.random() * 6) + 1;
// };

document.querySelector('.btn-roll').addEventListener('click', function() {
  if (gameFinished != true) { // the state variable here checks first if the game is finished, if not, the game carries on
    var dice1 = Math.floor(Math.random() * 6) + 1;
    var dice2 = Math.floor(Math.random() * 6) + 1;
    console.log('player-' + (activePlayer + 1) + '\'s previous roll was = ' + lastDice + ', their current roll is = ' + [dice1, dice2]);

    document.getElementById('dice-1').style.display = 'block';
    document.getElementById('dice-2').style.display = 'block';
    document.getElementById('dice-1').src = 'dice-' + dice1 + '.png';
    document.getElementById('dice-2').src = 'dice-' + dice2 + '.png';

    if (dice1 !== 1 && dice2 !== 1) {
      roundScore += dice1 + dice2;
      document.querySelector('#current-' + activePlayer).textContent = roundScore;
    } else {
      nextPlayer();
    }

    lastDice = [dice1, dice2];
      /* if (dice === 6 && lastDice === 6) {
         scores[activePlayer] = 0;
         document.querySelector('#score-' + activePlayer).textContent = '0';
         nextPlayer();
      } else if (dice !== 1) {
        roundScore += dice;
        document.querySelector('#current-' + activePlayer).textContent = roundScore;
      } else {
        nextPlayer();
      }

      /* lastDice = dice; Below, commented out, is my solution. Verbose and obviously way too long for a single function.
                       I didn't think of assigning 'dice' to another variable at the end of the function, after 'dice'
                       had been set by the current roll earlier in the function. I need to be more mindful of the
                       execution context and the execution stack.
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

    var input = document.querySelector('.final-score').value; // The 'value' property is used instead of using 'textContent' or 'innerHTML'. This will give me
                                           /* the content that the user inputs into the input-field.
    But what if this input value is empty? As "undefined, 0, null or ''" are COERCED to false, and anything else is COERCED to true, with an if/else statement
    I can respond to this */
    if (input) { // I dont' want to use this input if its empty - so if it's true (i.e. it has an input) I want the winning score to equal the input
      winningScore = input;
    } else {
      winningScore; // If the user doesn't enter a value, the winning score defaults to 100!
    }
    if (scores[activePlayer] >= winningScore) {
    document.querySelector('#name-' + activePlayer).textContent = 'Player ' + (activePlayer + 1) + ' Wins!';
    hideDice();
    document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner'); // ('.classList' accesses the classes that the respective element has)
    document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active'); // remember, you have 'add', 'remove' and 'toggle'
    gameFinished = true;
    } else {
      nextPlayer();
    }
  }
});

function hideDice() {
  document.getElementById('dice-1').style.display = 'none';
  document.getElementById('dice-2').style.display = 'none';
}

function nextPlayer() {
  activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
  roundScore = 0;

  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';

  document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-1-panel').classList.toggle('active');

  hideDice();
  // document.getElementById('dice-1').style.display = 'none';
  // document.getElementById('dice-2').style.display = 'none';
}

document.querySelector('.btn-new').addEventListener('click', init); // If I add the call operator () here, init would be immediately called!

function init() {
  gameFinished = false;
  scores = [0,0]; // [player-1, player-2]
  roundScore = 0;
  activePlayer = 0;
  // player1Rolls = [0,0]; // [previous, current]
  // player2Rolls = [0,0]; // [previous, current]
  hideDice();
  /* I replaced the two lines below with the function 'hideDice'
  document.getElementById('dice-1').style.display = 'none';
  document.getElementById('dice-2').style.display = 'none'; so here we're selecting the class dice using the
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
}
