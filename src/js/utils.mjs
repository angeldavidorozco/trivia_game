
import { checkAnswer } from "./playerInfo.mjs";

export async function makeRequest() {
    const link = createFetchLink();
    try {
        const response = await fetch(
            link,
        );
        const data = await response.json();
        console.log(data);
        return data;
    }
    catch (error) {
        console.error(error);
    }
}

function createFetchLink() {

    let category = localStorage.getItem('selectedCategory');
    let difficulty = localStorage.getItem('selectedDifficulty');

    let link = `https://opentdb.com/api.php?amount=1&difficulty=${difficulty}&type=multiple&encode=base64`;
    if (category !== 'all') {
        link += `&category=${category}`;
    }
    return link;

}

let answerChecker = function(event) {
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
        button.removeEventListener('click', answerChecker);

        // Add the new event listener
        button.addEventListener('click', answerChecker);
    });

}
