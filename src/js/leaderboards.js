function generateLeaderboards() {
  let leaderboards = document.querySelector('.scores-table');
  let leaderboardsHTML = '';
  let scores = JSON.parse(localStorage.getItem('ls-scores'));
  let tableHeader = `<div class="titles">
                            <p>Name</p>
                            <p>Score</p>
                            <p>Date</p>
                        </div>`;

  let flatScores = [];
  for (let playerName in scores) {
    let playerScore = scores[playerName][0];
    let playerDate = scores[playerName][1];
    flatScores.push({ playerName, playerScore, playerDate });
  }

  // Sort the scores in descending order
  flatScores.sort((a, b) => parseInt(b.playerScore) - parseInt(a.playerScore));

  // Generate the leaderboard
  flatScores.forEach(({ playerName, playerScore, playerDate }) => {
    leaderboardsHTML += `
                            <div class="score">
                                <p>${playerName}</p>
                                <p>${playerScore}</p>
                                <p>${playerDate}</p>
                            </div>`;
  });

  leaderboards.innerHTML = tableHeader + leaderboardsHTML;
}

generateLeaderboards();
