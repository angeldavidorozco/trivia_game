async function getCategories(){
    try {
        const response = await fetch(
            'https://opentdb.com/api_category.php',
        );
        const data = await response.json();
        return data;
    }
    catch (error) {
        console.error(error);
    }
}

function setCategories(){
    getCategories().then(data => {
        const categories = data.trivia_categories;
        const dropdown = document.getElementById('category-dropdown');

        // Add a default option
        const option = document.createElement('option');
            option.value = 'all';
            option.text = 'All Categories';
            dropdown.add(option);


        categories.forEach((category) => {
            const option = document.createElement('option');
            option.value = category.id;
            option.text = category.name;
            dropdown.add(option);
        });
    });
}

function setDifficulty(){
    const dropdown = document.getElementById('difficulty-dropdown');
    const difficulties = ['Easy', 'Medium', 'Hard'];
    difficulties.forEach((difficulty) => {
        const option = document.createElement('option');
        option.value = difficulty.toLowerCase();
        option.text = difficulty;
        dropdown.add(option);
    });
}


export function setSelections(){
    setCategories();
    setDifficulty();
}


setSelections();

// Get the start button
const startButton = document.getElementById('start-game');
document.getElementById('return').addEventListener('click', () => {
    window.location.href = '../index.html';
}); 


startButton.addEventListener('click', () => {
    // Get the selected category and difficulty
    const categoryDropdown = document.getElementById('category-dropdown');
    const difficultyDropdown = document.getElementById('difficulty-dropdown');

    let selectedCategory = categoryDropdown.options[categoryDropdown.selectedIndex].value;
    let selectedDifficulty = difficultyDropdown.options[difficultyDropdown.selectedIndex].value;

    localStorage.setItem('selectedCategory', selectedCategory);
    localStorage.setItem('selectedDifficulty', selectedDifficulty);

    window.location.href = 'game.html';
});