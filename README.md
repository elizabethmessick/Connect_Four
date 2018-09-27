## Game screen! 
![Image of initial screen](https://i.imgur.com/JwA82XS.png)

## Description
Connect Four is a two-player connection game in which the players take turns dropping one colored disc from the top into a seven-column, six-row vertically suspended grid. The pieces fall straight down, occupying the lowest available space within the column. The objective of the game is to be the first to form a horizontal, vertical, or diagonal line of four of one's own discs. 

## Technologies Used 
- HTML
- CSS
-  Javascript

## Getting Started 
[Click to play!](https://elizabethmessick.github.io/Connect_Four/)


## Next Steps 
- Add sound effects and animations
- Add music

## Wireframe
![Image of wireframe](https://i.imgur.com/Wm3L2Pm.png)

## Pseudocode 
- Draw a grid (6 rows X 7 columns) in HTML
- Style the grid in CSS
- Make the grid a 2D array of char values(making an empty board)  in JS
- Make sure each value is an empty string at initialization
- Start the game
    - Player1 chooses their choice of 7 columns to drop their token into
    - Check to see if the column Player1 is dropping the token into is full
        - If that column is full, then ask the user to pick a different column
    - Update the grid by pushing the token into the chosen grid position
    - Check to see if game is over (refer to game over)
    - If game is not over switch to Player2
- Player2 chooses their choice of 7 columns to drop their token into
    - Check to see if the column Player2 is dropping the token into is full
        - If that column is full, then ask the user to pick a different column
    - Update the grid by pushing the token into the chosen grid position
    - Check to see if game is over (refer to game over)
    - If game is not over switch to Player1, etc…(Loop)
- Game Over
    - Is true if the entire board array is filled with valued strings
     - If so, print screen to say "Tie Game"
    - Is true if one of the players has four consecutive strings anywhere in the array
     - If so, print screen to say "Player __ Wins!"
        - Check horizontally
        - Check vertically
        - Check diagonally
