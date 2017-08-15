/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer;
init();
/* scores = [0,0];
   roundScore = 0;
   activePlayer = 0; to keep track of the player currently playing (0 or 1 for player 1 or player 2)
I commented these out to enable the init function for the new-game button.

The object that gives access to the DOM is the document object
document.querySelector('#current-' + activePlayer).textContent = dice; you can call this a 'setter'
document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>'; // <em> italisizes (emphasizes) the text
but you can also use the .querySelector method to read only or be a 'getter' by assigning it to a variable,
var x = document.querySelector('#score-0').textContent;
console.log(x);
querySelector can also be used to change the CSS of some element

I need now a function to call when the button is clicked and you could do something like this,
function btn() {
  //Do something here
}
btn();
and this would allow you to reuse it (reminder; to call the function you need the call function operator '()')
Now I want to setup an event listner for the roll of the dice/clicking on the dice roll.
If you look at the view file (HTML) the 'roll dice' button is given the class name 'btn-roll'
There are a lot of events but in this case I'll use 'click'
see the docs for the rest: https://developer.mozilla.org/en-US/docs/Web/events
I could then call it like this,

document.querySelector('btn-roll').addEventListener('click', btn);

When its an argument, I don't need the function operator '()'.
Because I don't want to call it here, rather I want the event listener to call it for me, so this 'btn' function
is called a 'callback' function (its called by another function) - that's what a callback is, a function that is
passed into another function as an argument and this function (addEventListener) calls this function for me.
Instead of putting in the argument 'btn' you could enter in the function right there instead - that is what is
called an anonymous function - that's a function that doesn't have a name and can't be reused.
*/
document.querySelector('.btn-roll').addEventListener('click', function() {
  //1. This gives me a random number between 1 and 6
  var dice = Math.floor(Math.random() * 6) + 1;
  //2. Display the result
  var diceDOM = document.querySelector('.dice');
  diceDOM.style.display = 'block'; /*renders the element as a block-level element - HTML code for starting on a
  new line and takes up the full width available. */
  diceDOM.src = 'dice-' + dice + '.png';
  //3. Update the roundScore ONLY IF the rolled number is NOT a 1
  if (dice !== 1) {
    roundScore += dice; // so here I update the roundScore adding the new die roll to it
    document.querySelector('#current-' + activePlayer).textContent = roundScore; // and here I display it.
  } else {
    nextPlayer(); // I've defined this below
  }
});

document.querySelector('.btn-hold').addEventListener('click', function() {
    scores[activePlayer] += roundScore; // I first tried an if/else statement below but his solution is so much more elegant
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
  // if (activePlayer === 0) {
  //   scores[0] += roundScore;
  //   document.querySelector('#score-' + activePlayer).textContent = scores[0];
  // } else {
  //   scores[1] += roundScore;
  //   document.querySelector('#score-' + activePlayer).textContent = scores[1];
  // }
  // Check if player won the game
  if (scores[activePlayer] >= 20) {
    document.querySelector('#name-' + activePlayer).textContent = 'Player ' + (activePlayer + 1) + ' Wins!';
    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner'); // ('.classList' accesses the classes that the respective element has)
    document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active'); // remember, you have 'add', 'remove' and 'toggle'
  } else {
    nextPlayer();
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
  scores = [0,0];
  roundScore = 0;
  activePlayer = 0;
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
