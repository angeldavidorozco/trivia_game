import timerInstance from "./timer.mjs";
import { setScenario } from "./setScenario.mjs";


export async function makeRequest() {
    try {
        const response = await fetch(
            'https://opentdb.com/api.php?amount=1&difficulty=medium&type=multiple&encode=base64',
        );
        const data = await response.json();
        console.log(data);
        return data;
    }
    catch (error) {
        console.error(error);
    }
}

let currentEventListener = function(event) {
    return checkAnswer(event.target);
};

export async function setQuestionAndAnswers(data) {
    const questionBox = document.querySelector('#question');
    const gameButtons = document.querySelectorAll('.game-button');
    document.querySelector('#session-category').innerHTML = `Category: ${atob(data.results[0].category)}`;
    
    const question = atob(data.results[0].question);
    const answers = data.results[0].incorrect_answers.map((answer) => atob(answer));

    const correctAnswerIndex = Math.floor(Math.random() * (answers.length + 1));
    answers.splice(correctAnswerIndex, 0, atob(data.results[0].correct_answer));

    questionBox.innerHTML = question;

    gameButtons.forEach((button, index) => {
        button.innerHTML = answers[index];
        button.dataset.answer = answers[index];

        if (index === correctAnswerIndex) {
            button.dataset.correct = 'true';
        }
        else {
            button.dataset.correct = 'false';
        }
        // Remove the previous event listener, if it exists
        button.removeEventListener('click', currentEventListener);

        // Add the new event listener
        button.addEventListener('click', currentEventListener);
    });

}

export function ShowGameBoard(){
    document.querySelector('.loading-screen').classList.add('hidden');
    document.querySelector('.main-board').classList.remove('hidden');
}

export function HideGameBoard(){
    document.querySelector('.loading-screen').classList.remove('hidden');
    document.querySelector('.main-board').classList.add('hidden');
}

export async function checkAnswer(button){
    HideGameBoard();
    if(button.dataset.correct==='true'){
        const remainingTime = timerInstance.stopTimer();
        const score = calculateScore(remainingTime);
        updateScore(score);
        await setScenario();
    }
    else{
        timerInstance.stopTimer();
        removeHeart();
        await setScenario();
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
    const score = Math.max(0, maxScore * (1 - remainingTime / maxTime));
    return Math.round(score);
}

function updateScore(score) {
    const scoreElement = document.querySelector('#session-score');
    const currentScore = parseInt(scoreElement.textContent.split(': ')[1]);
    const newScore = currentScore + score;
    scoreElement.textContent = `Score: ${newScore}`;
}