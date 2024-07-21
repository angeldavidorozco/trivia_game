import timerInstance from "./timer.mjs";
import { HideGameBoard } from './setScenario.mjs';
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
    HideGameBoard();
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
    const heartIcons = Array.from(document.querySelectorAll('.heart-icon'));
    const visibleHeartIcons = heartIcons.filter(icon => icon.offsetParent !== null);
    const lastVisibleHeartIcon = visibleHeartIcons[visibleHeartIcons.length - 1];
    if (lastVisibleHeartIcon) {
        lastVisibleHeartIcon.remove();
    }
}

function calculateScore(remainingTime) {
    let difficulty = localStorage.getItem('selectedDifficulty');
    let scoreMultiplier = getMultiplier(difficulty);
    const maxTime = 15; // maximum time is 15 seconds
    const maxScore = 100;
    // Using Max to avoid negative scores
    const score = Math.max(0, scoreMultiplier * maxScore * (remainingTime / maxTime));
    return Math.round(score);
}

function updateScore(score) {
    const scoreElements = Array.from(document.querySelectorAll('#session-score'));
    const visibleScoreElement = scoreElements.find(element => element.offsetParent !== null);
    if (visibleScoreElement) {
        const currentScore = parseInt(visibleScoreElement.textContent.split(': ')[1]);
        const newScore = currentScore + score;
        visibleScoreElement.textContent = `Score: ${newScore}`;
    }
}

function getMultiplier(difficulty) {
    switch (difficulty) {
        case 'easy':
            return 1;
        case 'medium':
            return 2;
        case 'hard':
            return 3;
        default:
            return 1;
    }
}