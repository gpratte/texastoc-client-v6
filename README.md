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


