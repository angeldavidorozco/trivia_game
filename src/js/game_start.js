import { setScenario } from "./setScenario.mjs";

setScenario();

export function endGame(){

    saveScore();
    
    window.location.href = '../end_game/index.html';
}


function saveScore(){
    const scoreElement = document.querySelector('#session-score');
    const currentScore = parseInt(scoreElement.textContent.split(': ')[1]);
    
    localStorage.setItem('finalScore', currentScore);
}