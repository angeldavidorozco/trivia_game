
// Get the final score from local storage or some other method
const finalScore = localStorage.getItem('finalScore') || 0;

// Display the final score
document.getElementById('final-score').innerHTML = `Your score <br> ${finalScore}`;

// Add an event listener to the save score button
document.getElementById('save-score').addEventListener('click', saveScore); 
document.getElementById('return').addEventListener('click', returnToHome); 



function saveScore(){
    const playerName = document.getElementById('player-name').value;

    if (!playerName){
        alert('Please enter your name');
        return;
    }
    if(playerName.length > 10){
        alert('Name must be less than 10 characters');
        return;
    }

    const scores = JSON.parse(localStorage.getItem('ls-scores')) || {};

    const date = new Date();
    const formattedDate = `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`;
    
    scores[playerName] = [finalScore, formattedDate];

    localStorage.setItem('ls-scores', JSON.stringify(scores));

    returnToHome();
}

function returnToHome(){
    window.location.href = '../index.html';
}