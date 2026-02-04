const startButton = document.querySelector('.startButton');
const backMenuButton = document.querySelector('.backMenu');

const mainMenu = document.querySelector('.mainMenu');
const gameSession = document.querySelector('.gameSession');

let numberOfRounds = 5;
let isReplayed = true;

let humanScore = 0;
let computerScore = 0;
let curRound = 1;

const warningRoundText = document.querySelector('#warningRoundText');

startButton.addEventListener('click', () => {
    numberOfRounds = roundNumber.value;
    if (+numberOfRounds <= 0 || (numberOfRounds % 1 !== 0)) {        
        if (warningRoundText.style.display === 'none'){
            warningRoundText.style.display = 'block'
        }
        else {
            warningRoundText.classList.add('fastBlink');
            setTimeout(() => {
                warningRoundText.classList.remove('fastBlink');
            }, 1000);
        }
        roundNumber.value = 5;
    }
    else {
        numberOfRounds = +roundNumber.value;
        isReplayed = replayChecker.checked;
        resetGameState();
        initializeGameState();
        toggleGameContainer();
    }

});

backMenuButton.addEventListener('click', () => {
    resetMenuState();
    toggleGameContainer();
});

function toggleGameContainer() {
    if(mainMenu.classList.contains('flexDisplay')){
        mainMenu.classList.replace('flexDisplay', 'noneDisplay');
        gameSession.classList.replace('noneDisplay', 'flexDisplay');
    }
    else {
        gameSession.classList.replace('flexDisplay', 'noneDisplay');
        mainMenu.classList.replace('noneDisplay', 'flexDisplay');
    }
}

const roundNumber = document.querySelector("#roundNumber");
const replayChecker = document.querySelector('#replayChecker');

const roundCounter = document.querySelector('#roundCounter');
const totalRound = document.querySelector('#totalRound');
const isReplayedText = document.querySelector('#isReplayedText');
const matchLog = document.querySelector('#matchLog');
const gameStatus = document.querySelector('#gameStatus');

const aspectButtons = document.querySelectorAll('.aspectContainer span');

function resetMenuState() {
    warningRoundText.style.display = 'none';
}

function resetGameState() {
    backMenuButton.classList.remove('blink');
    roundCounter.textContent = 1;
    roundCounter.classList.add('blink');
    matchLog.textContent = '';
    gameStatus.textContent = 'STILL PLAYING';
    gameStatus.classList.add('blink');
    gameStatus.style.removeProperty('color');
    curRound = 1;
    humanScore = 0;
    computerScore = 0;
    aspectButtons.forEach((e) => {
        e.classList.add('blink');
    })
}

function initializeGameState() {
    totalRound.textContent = roundNumber.value;
    isReplayedText.textContent = replayChecker.checked ? '(with replay)' : '(without replay)';
}

function getComputerChoice() {
    let computerChoice = Math.floor(Math.random() * 3 + 1);
    switch (computerChoice) {
        case 1:
            return "strength";

        case 2:
            return "magic";
        
        case 3:
            return "speed";

        default:
            return "Computer choice error";
    }
}

const aspectContainer = document.querySelector('.aspectContainer');

aspectContainer.addEventListener('click', (event) => {
    if (event.target.classList.contains('aspectContainer')) {
        return;
    }

    if(curRound > numberOfRounds){
        return;
    }
    
    let humanChoice = event.target.tagName === 'SPAN' ? event.target.parentNode.id : event.target.id;

    let computerChoice = getComputerChoice();

    let result = playRound(humanChoice, computerChoice);
    if (result === 'human') {
        humanScore++;
    }
    else if (result === 'computer') {
        computerScore++;
    }

    updateGameContent(result, isReplayed, curRound, humanChoice, computerChoice);
    
    if (!(result === 'draw' && isReplayed)){
        curRound++;
    }

    if(curRound > numberOfRounds){
        stopGame();
        return;
    }

    roundCounter.textContent = curRound;
});

function playRound(humanChoice, computerChoice) {
    if (humanChoice === computerChoice){
        return 'draw';
    }
    if(humanChoice === 'strength'){
        if(computerChoice === 'magic'){
            return 'computer';
        }
        else{
            return 'human';
        }
    }
    else if(humanChoice === 'magic'){
        if(computerChoice === 'strength'){
            return 'human';
        }
        else{
            return 'computer';
        }
    }
    else if(humanChoice === 'speed'){
        if(computerChoice === 'strength'){
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

function updateGameContent(result, isReplayed, curRound, humanChoice, computerChoice) {
    const newLog = document.createElement('p');
    if(result === 'draw'){
        if(isReplayed){
            newLog.textContent = `Round-${curRound} DRAW! (${humanChoice} vs ` 
                                +`${computerChoice}). Replaying round-${curRound}.`;
        }
        else{
            newLog.textContent = `Round-${curRound} DRAW! (${humanChoice} vs ` 
                                +`${computerChoice}). Continuing to next round.`;
        }
    }
    else if(result === 'human'){
        newLog.textContent = `Round-${curRound} WON! (${humanChoice} vs ` 
                            +`${computerChoice}).`;
    }
    else if(result === 'computer'){
        newLog.textContent = `Round-${curRound} LOST! (${humanChoice} vs ` 
                            +`${computerChoice}).`;
    }
    else{
        newLog.textContent = 'RESULT ERROR!';
    }
    matchLog.appendChild(newLog);
    matchLog.scrollTop = matchLog.scrollHeight;
}

function stopGame() {    
    roundCounter.classList.remove('blink');

    aspectButtons.forEach((e) => {
        e.classList.remove('blink');
    })

    if (humanScore > computerScore) {
        gameStatus.textContent = `YOU WIN! ${humanScore} vs ${computerScore}`;
        gameStatus.style.color = 'green';
    }
    else if (humanScore < computerScore) {
        gameStatus.textContent = `YOU LOSE! ${humanScore} vs ${computerScore}`;
        gameStatus.style.color = 'red';
    }
    else {
        gameStatus.textContent = `TIE! ${humanScore} vs ${computerScore}`;
        gameStatus.style.color = '#FF9800';
    }

    gameStatus.classList.remove('blink');

    gameStatus.classList.add('fastBlink');
    setTimeout(() => {
        gameStatus.classList.remove('fastBlink');
    }, 1000);

    backMenuButton.classList.add('blink');

}