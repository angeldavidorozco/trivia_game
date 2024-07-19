import { setQuestionAndAnswers, makeRequest, ShowGameBoard, HideGameBoard } from './utils.mjs';
import timerInstance from "./timer.mjs";
import { resetAnimation } from './animation.mjs';

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
    timerInstance.startTimer();
    
    gameRunning = false;
}