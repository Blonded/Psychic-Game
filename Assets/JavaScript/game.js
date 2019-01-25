// dictionary of all global variables that are being tracked in the game
// initial game values
var gameData = {
    wins: 0,
    losses: 0,
    guessesLeft: 10,
    guessedLetters: [],
    computerGuess: generator()
}

// initial values displayed on the page
document.querySelector("#wins").innerHTML = gameData.wins;
document.querySelector("#losses").innerHTML = gameData.losses;
document.querySelector("#guesses-left").innerHTML = gameData.guessesLeft;

// generate a random letter a-z
function generator(){
    // may need to lowercase the computer guess
    // use ascii value of letter
    return String.fromCharCode(
        Math.floor(Math.random() * 26) + 97
      )
}

// for testing, computer initial guess
console.log(gameData.computerGuess);


// game logic
// ask user for a letter;
document.onkeyup = function(event) {

    document.querySelector("#alert").innerHTML = "";
    document.querySelector("#play-again").innerHTML = "";
     // if the user still has guesses remaining
 
     // check how many guesses are left
    if(gameData.guessesLeft > 0){
        // store user input in a variable. 
        // lowercase user input
        var userInput = event.key.toLowerCase();

        // use ascii code of key press value to do check 
        // make sure its not a number or a character other than a-z
        if(event.keyCode >= 65 && event.keyCode <= 90){
            // console.log("user selected a letter:", userInput);

            // check if user has already guessed the letter by checking if letter guessed is in a array of guesses
            if(gameData.guessedLetters.includes(userInput)){
                console.log("User has already guessed this letter!");
                document.querySelector("#alert").innerHTML = "User has already guessed this letter!";
            }
             // if the letter is not in the array add it else tell user to try another letter
            else {
            // if the letter is not in array also minus one from the guesses left
                
                gameData.guessedLetters.push(userInput);

                document.querySelector("#guessed-letters").innerHTML = gameData.guessedLetters.join(", ");


                gameData.guessesLeft--;
                document.querySelector("#guesses-left").innerHTML = gameData.guessesLeft;
                
                // console.log("guesses left", gameData.guessesLeft)
                // console.log("user guess added to array");

                // compare the letter to the computer guess 
                compareGuess(userInput);
            }
            }
    }
    else{
        console.log("You Lost");
        handleLosses();
    }
}

// compare user input (letter) to computer letter
function compareGuess(letter){
    // turnary operator
    (gameData.computerGuess === letter)? 
        // console.log("user got it right")
        handleWin()

   : 
        //console.log("user got it wrong")
        // if incorrect and user still has guesses run all steps above again
        document.querySelector("#alert").innerHTML = "That was not correct! Try again!"
}

function handleWin(){
    // console.log("$$$$gameData.wins", gameData.wins)
    // updateScore(gameData.wins)

    // if letter guessed is correct wins go up
    gameData.wins++
    // console.log("###gameData.wins", gameData.wins)
    document.querySelector("#wins").innerHTML = gameData.wins;
    document.querySelector("#alert").innerHTML = "YOU WIN!";
    // reset game
    resetGame()
}

function handleLosses(){
    // updateScore(gameData.losses);
    // reset game
     // if letter guessed is incorrect and user out of guesses, losses go up
    gameData.losses++

    document.querySelector("#losses").innerHTML = gameData.losses;
    document.querySelector("#alert").innerHTML = "YOU LOSE!";
    // console.log("###gameData.losses", gameData.losses)

    resetGame();
}

// reset game after a win or a losse
function resetGame(){
    document.querySelector("#play-again").innerHTML = "Would you like to play again? Guess another letter!";
    gameData.guessesLeft = 10
    document.querySelector("#guesses-left").innerHTML = gameData.guessesLeft;

    gameData.guessedLetters = []
    document.querySelector("#guessed-letters").innerHTML = ""
    
    gameData.computerGuess =  generator()

    // for testing computer new guess
    console.log(gameData.computerGuess)

}

 

 





