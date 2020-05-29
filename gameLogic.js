console.log('gameLogic.js ran...');

var gameBoard = document.getElementById('game-board');
var playerInfo = document.getElementById('player-info');
var ai = document.getElementById('ai');
var btnChoices = document.getElementById('btn-choices');
var score = document.getElementById('score');
var restartBox = document.getElementById('restart-box');
var yesBtn = document.getElementById('yes-btn');
var noBtn = document.getElementById('no-btn');
var aiChoice = ['rock','paper','scissors'];
var userChoice = '';
var aiScore = 0;
var userScore = 0;
var interval = 0;
var secondInterval = 0;

function startGame(){
    aiScore = 0;
    userScore = 0;
    playerInfo.setAttribute('style','color: black;');
    score.innerText = `AI: ${aiScore} User Score: ${userScore}`;
    initializeTurn();
}

function reset(){
    playerInfo.setAttribute('style','display: block;');
    ai.setAttribute('style','display: block;');
    btnChoices.setAttribute('style','display: flex;');
    score.setAttribute('style','display: block;');
    restartBox.style.display = 'none';
    startGame();
}

function initializeTurn(){
    playerInfo.style.color = 'black';
    playerInfo.innerText = '';
    ai.innerText = '';
    let counter = 0;

    interval = setInterval(function(){
        console.log('set interval ran');
        

        if(counter === 0){
            playerInfo.innerText = 'Rock';
        }else{
            playerInfo.innerText = 'Rock, Paper...';
        }
        counter++;
    },1000);
}

function checkChoice(e){
    clearInterval(interval);
    if(e.target.id === 'rock'){
        userChoice = 'rock';
        checkWinner();
    }else if(e.target.id === 'paper'){
        userChoice = 'paper';
        checkWinner();
    }else{
        userChoice = 'scissors';
        checkWinner();
    }
}

function checkWinner(){
    let aiValue = aiChoice[Math.floor(Math.random() * aiChoice.length)];

    if(aiValue === userChoice){
        //it's a draw
        ai.innerText = `${aiValue.toUpperCase()}!`;
        playerInfo.setAttribute('style','color: red;');
        playerInfo.innerText = 'Draw...';
        updateScore();
        setTimeout(checkScore,1000);
    }else if((aiValue === 'rock' && userChoice === 'scissors') || 
        aiValue === 'scissors' && userChoice === 'paper' ||
        aiValue === 'paper' && userChoice === 'rock'){
            //ai wins that round
            aiScore++;
            ai.innerText = `${aiValue.toUpperCase()}!`;
            playerInfo.setAttribute('style','color: red;');
            playerInfo.innerText = 'You lose that round...';
            updateScore();
            setTimeout(checkScore,1000);
    }else{
        //player wins that round
        userScore++;
        ai.innerText = `${aiValue.toUpperCase()}!`;
        playerInfo.setAttribute('style','color: green;');
        playerInfo.innerText = 'You win that round!';
        updateScore();
        setTimeout(checkScore,1000);
    }
}

function updateScore(){
    score.innerText = `AI: ${aiScore} User Score: ${userScore}`;
}

function checkScore(){
    if(aiScore === 3){
        gameOver(0);
        return;
    }else if(userScore === 3){
        gameOver(1);
        return;
    }else{
       initializeTurn(); 
    } 
}

function gameOver(choice){
    if(choice === 0){
        //ai wins
        playerInfo.setAttribute('style','color: red;');
        playerInfo.innerText = 'You lose...';
    }else{
        //player wins
        playerInfo.setAttribute('style','color: green;');
        playerInfo.innerText = 'You win!';
    }
    showRestartBox();
}

function showRestartBox(){
    ai.setAttribute('style','display: none;');
    btnChoices.setAttribute('style','display: none;');
    score.setAttribute('style','display: none;');
    restartBox.style.display = 'flex';
}

function checkColor(){
    // var body = document.querySelector('body');
    // body.setAttribute('style',`background-color: ${require('./index.js')}`);
}

yesBtn.addEventListener('click',function(){
    reset();
});

noBtn.addEventListener('click',function(){
    window.close();
});

startGame();

//secondInterval = setInterval(checkColor,1000);