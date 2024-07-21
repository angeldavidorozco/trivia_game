import { setScenario } from './setScenario.mjs';

setScenario();

export function endGame() {
  saveScore();

  window.location.href = '../end_game/index.html';
}

function saveScore() {
  const scoreElements = Array.from(document.querySelectorAll('#session-score'));
  const visibleScoreElement = scoreElements.find(
    (element) => element.offsetParent !== null,
  );
  if (visibleScoreElement) {
    const currentScore = parseInt(
      visibleScoreElement.textContent.split(': ')[1],
    );
    localStorage.setItem('finalScore', currentScore);
  }
}
