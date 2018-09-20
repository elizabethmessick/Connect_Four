# :red_circle: :large_blue_circle: Connect Four :red_circle: :large_blue_circle:

## My Fabulous Wireframe. Isn't it gorgeous? 
![Image of Yaktocat](https://i.imgur.com/Wm3L2Pm.png)

## Pseudocode Time, baby! 
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

