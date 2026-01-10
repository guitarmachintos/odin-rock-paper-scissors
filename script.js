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

let humanScore = 0;
let computerScore = 0;

function playRound(humanChoice, computerChoice) {
    
}
