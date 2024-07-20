import timerInstance from "./timer.mjs";
import { HideGameBoard } from './utils.mjs';
import { setScenario } from './setScenario.mjs';
import { endGame } from './game_start.js';

let lives = 3; 

export async function checkAnswer(button){
    HideGameBoard();
    if(button.dataset.correct==='true'){
        const remainingTime = timerInstance.stopTimer();
        const score = calculateScore(remainingTime);
        updateScore(score);
        await setScenario();
    }
    else{
        incorretAnswer();
    }
}

export async function incorretAnswer(){
    timerInstance.stopTimer();
    removeHeart();
    lives--; // Decrement lives
    if (lives > 0) {
        await setScenario();
    } else {
        await endGame();
    }

}


function removeHeart() {
    const heartIcons = document.querySelectorAll('.heart-icon');
    const lastHeartIcon = heartIcons[heartIcons.length - 1];
    if (lastHeartIcon) {
        lastHeartIcon.remove();
    }
}

function calculateScore(remainingTime) {
    const maxTime = 15; // maximum time is 15 seconds
    const maxScore = 100;
    const score = Math.max(0, maxScore * (remainingTime / maxTime));
    return Math.round(score);
}

function updateScore(score) {
    const scoreElement = document.querySelector('#session-score');
    const currentScore = parseInt(scoreElement.textContent.split(': ')[1]);
    const newScore = currentScore + score;
    scoreElement.textContent = `Score: ${newScore}`;
}