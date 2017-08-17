This was an exercise I did in creating an interface in JS (the CSS and HTML were provided) for a dice rolling game and is based on Jonas Schmedtmanns' Udemy course (https://www.udemy.com/the-complete-javascript-course/learn/v4/overview).

A very basic dice rolling game with the main objectives of this exercise being:
Learning how to manipulate the DOM
Learning how to read from the DOM
Learning how to change CSS styles

I've commented just about every line of code, it's a mess, I know. But please just try to ignore that - writing the comments, really helps me internalise it.


THE 3 CHALLENGES
Change the game to follow these rules:

1. A player looses his ENTIRE score when he rolls two 6's in a row. After that, it's the next player's
turn. (Hint: Always save the previous dice roll in a separate variable so that you can access the present and past dice roll at the same time.)
2. Add an input field to the HTML where players can set the winning score, so that they can change the
predefined score of 100. (Hint: you can read that value with the .value property in the JavaScript. This is a
good opportunity to use google to figure this out :)
3. Add another dice to the game, so that there are two dice. The player looses his current score
when one of them is a 1. (Hint: you will need CSS to position the second dice, so take a look at the CSS
code for the first one.)
