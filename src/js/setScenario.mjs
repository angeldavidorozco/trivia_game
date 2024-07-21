import { setQuestionAndAnswers, makeRequest } from './utils.mjs';
import timerInstance from "./timer.mjs";
import { resetAnimation } from './animation.mjs';
import { incorretAnswer } from './playerInfo.mjs';

let gameRunning = false;

export async function setScenario(){
    // If the game is already running, return immediately
    if (gameRunning) {
        return;
    }

    gameRunning = true;

    let info = await makeRequest();

    if(info.response_code === 5){
        HideGameBoard();
        while (info.response_code === 5) {
            await new Promise(r => setTimeout(r, 500));
            info = await makeRequest();
        }
    }
    resetAnimation();
    ShowGameBoard();
    setQuestionAndAnswers(info);
    timerInstance.startTimer(incorretAnswer);
    
    gameRunning = false;
}


export function ShowGameBoard(){
    document.querySelector('.loading-screen').classList.add('hidden');
    document.querySelector('.main-board').classList.remove('hidden');
}

export function HideGameBoard(){
    document.querySelector('.loading-screen').classList.remove('hidden');
    document.querySelector('.main-board').classList.add('hidden');
}

