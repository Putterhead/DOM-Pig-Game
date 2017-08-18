This was an exercise I did in creating an interface in JS (the CSS and HTML were provided) for a dice rolling game and is based on Jonas Schmedtmanns' Udemy course (https://www.udemy.com/the-complete-javascript-course/learn/v4/overview).

A very basic dice rolling game with the main objectives of this exercise being:
Learning how to manipulate the DOM
Learning how to read from the DOM
Learning how to change CSS styles

I've commented just about every line of code, it's a mess, I know. But please just try to ignore that - writing the comments, really helps me internalise it.

GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

THE 3 CHALLENGES
As part of this exercise I had to change the game to follow these rules:

1. A player looses his ENTIRE score when he rolls two 6's in a row. After that, it's the next player's turn. (Hint: Always save the previous dice roll in a separate variable so that you can access the present and past dice roll at the same time.)
2. Add an input field to the HTML where players can set the winning score, so that they can change the predefined score of 100. (Hint: you can read that value with the .value property in the JavaScript. This is a
good opportunity to use google to figure this out :)
3. Add another dice to the game, so that there are two dice. The player looses his current score when one of them is a 1. (Hint: you will need CSS to position the second dice, so take a look at the CSS
code for the first one.)

My Notes
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
