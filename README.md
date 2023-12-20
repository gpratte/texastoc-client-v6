# React poker game
Based off of the [react-poker-game-2023-09-22](https://github.com/gpratte/react-poker-game-2023-09-22) 
repository which is "a react functional components learning application."

Fleshed out this client to with the required features that can be found 
* at the website [texastoc.com](https://www.texastoc.com)
* and the fully functional client at [texastoc-client-v5](https://github.com/gpratte/texastoc-client-v5/tree/master/src/current-game/components)

## Versions
Node version
* using node version v18.12.1 and npm version 8.19.2.

Create react app version
* _npx create-react-app --version_ spit out 5.0.1.

Create the react app with typescript
* _npx create-react-app --template typescript_

React version
* _create-react-app_ installed react version 18 (as you can see by the react version in the package.json).

## Branches
### step-11-get-game-add-player
Figure out what is the current game of the current season and show it. 
Also allow a player to be added to the game.

### step-10-common-initialize-season-id
The league, season and game components need the season Id to be initialized.
Moved the initialize code to a common function.

###  step-09-determine-current-game
Determine the current game for the season. Since there can only be one game 
for a season that is not finalized then that is the current game. If no
game is unfinalized the use the game with the most recent date.

### step-08-top-level-set-seasonId
Set the season Id on top level league component.

### step-07-rounds-points
Show the league rounds and points.

### step-06-league-players
Show the league players. Still have a TODO to edit a league player.

### step-05-season
Show the season along with its quarterly seasons and games.

### step-04-logout-spinner
Show a spinner while waiting for the login api to finish.

### step-03-logout
Make the logout navigation link operational. When clicked the token in local storage
is removed and the router is navigated to the login screen.

### step-02-login
Created the login UI component along with the supporting functions to call the
server's login endpoint. Keep the token in the browser's local storage. 

### step-01-clone-react-poker-game-2023-09-22
Initial version is a clone of [react-poker-game-2023-09-22](https://github.com/gpratte/react-poker-game-2023-09-22) 


