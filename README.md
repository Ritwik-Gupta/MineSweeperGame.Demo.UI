# MineSweeperDemoUI

This is a frontend app built using Angular 16 that replicates the famous MineSweeper Game.

This frontend app is hooked with the backend API(built on .NET Core) [github repo - https://github.com/Ritwik-Gupta/MineSweeperGame.Demo.API], which performs that logic of building the grids for the game.

In order to run the app on local environment, you'll have to run both the Angular app and the .NET Core web api.

The Angular app is deployed on firebase - https://minesweeperui.web.app/ , you can click on this link to play the game on a live server.(Since both the frontend and backend services are hosted on Free tier, you might face some long load times, when loading the applicatin for the first time ~ 60 secs)


# Installation steps

1. Clone this repository on your local machine.
2. Make sure you have Angular CLI v16+ and NodeJS v18 installed on your system.
3. Navigate to the root folder of the app and run command 'npm install', this will install all the required dependencies for the project.
4. run command 'ng serve -o', this will build the angular app and the app will start running on 'http://localhost:4200'
5. Navigate to the Github repo - https://github.com/Ritwik-Gupta/MineSweeperGame.Demo.API
6. Follow the instructions to run the .NET Core API.
7. Once the .NET Core API is up and running, navigate to the url 'http://localhost:4200'
8. Follow the instructoons on the page to start the game
9. Yay! your MineSweeper game is ready to be played!

# How to play
1. Go to url https://minesweeperui.web.app/
2. Select the grid size and the number of mines and click on 'Start Game' buttton.
![HomePage](https://github.com/Ritwik-Gupta/MineSweeperGame.Demo.UI/blob/main/src/assets/static/images-readme/home1.png?raw=true)
4. Click on the 'Play' button to load the grids.
5. Click on the grids to reveal the grids, if clicked on a skull then the game is over.
6. Enjoy your game.

# Notes
1. Angular is used the frontend framework for this project due its versatile and robust achitecture.
2. Clean code and  common Design patterns have been followed wherever neccessary.


