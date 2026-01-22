function getComputerChoice() {
    // Get computer rock/paper/scissors choice
    let computerChoice = Math.floor(Math.random() * 3 + 1);
    switch (computerChoice) {
        case 1:
            return "rock";

        case 2:
            return "paper";
        
        case 3:
            return "scissors";
        default:
            return "Computer choice error";
    }
}

// for (let i = 0; i < 100; i++) {
//     console.log(getComputerChoice());       
// }

function getHumanChoice() {
    let humanChoice = prompt("Pick your hand (rock / paper / scissors)");
    humanChoice = (humanChoice ?? '').toLowerCase();
    while (true) {
        if (humanChoice === 'rock' || humanChoice === 'paper'
            || humanChoice === 'scissors') {
            break;
        }
        humanChoice = prompt("Pick your hand (rock / paper / scissors)");
        humanChoice = (humanChoice ?? '').toLowerCase();

    }
    return humanChoice;
}

// console.log(getHumanChoice());

function playRound(humanChoice, computerChoice) {
    if (humanChoice === computerChoice){
        return 'draw';
    }
    if(humanChoice === 'rock'){
        if(computerChoice === 'paper'){
            return 'computer';
        }
        else{
            return 'human';
        }
    }
    else if(humanChoice === 'paper'){
        if(computerChoice === 'rock'){
            return 'human';
        }
        else{
            return 'computer';
        }
    }
    else if(humanChoice === 'scissors'){
        if(computerChoice === 'rock'){
            return 'computer';
        }
        else{
            return 'human';
        }
    }
    else{
        return "HANDS INVALID!";
    }
}

function getNumberOfRound() {
    let numberOfRounds = +(prompt("Input number of rounds: "));
    while (true) {
        if (numberOfRounds >= 1 ) {
            break;
        }
        numberOfRounds = +(prompt("Input number of rounds: "));
    }
    return numberOfRounds;
}

function playGame() {
    let numberOfRounds = getNumberOfRound();
    let humanScore = 0;
    let computerScore = 0;
    for (let i = 1; i <= numberOfRounds; i++) {
        console.log(`Currently playing Round-${i}`);
        
        const humanChoice = getHumanChoice();
        const computerChoice = getComputerChoice();

        let result = playRound(humanChoice, computerChoice);

        if(result === 'draw'){
            console.log(`A DRAW! replaying Round-${i}`);
            i--;
            continue;
        }
        else if(result === 'human'){
            humanScore++;
            console.log(`Human wins, Human:${humanScore} Computer${computerScore}`);
        }
        else if(result === 'computer'){
            computerScore++;
            console.log(`Computer wins, Human:${humanScore} Computer${computerScore}`);
        }
        else{
            console.log("INVALID GAME!");
            return;
        }        
    }
    console.log("GAME OVER!");
    console.log(`Final Score - Human:${humanScore}, Computer: ${computerScore}`);
    if(humanScore > computerScore){
        console.log("Human won the game!");
    }
    else if (computerScore > humanScore){
        console.log("Computer won the game!");        
    }
    else{
        console.log("A tie between Human and Computer!");
    }
}

// playGame();