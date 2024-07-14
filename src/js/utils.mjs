export async function makeRequest() {
    try {
        const response = await fetch(
            'https://opentdb.com/api.php?amount=1&difficulty=medium&type=multiple&encode=base64',
        );
        const data = await response.json();
        console.log(atob(data.results[0].correct_answer));
        return data;
    }
    catch (error) {
        console.error(error);
    }
}

export async function setQuestionAndAnswers(data) {
    const questionBox = document.querySelector('#question');
    const gameButtons = document.querySelectorAll('.game-button');
    
    
  
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
    });

}


//setQuestionAndAnswers();