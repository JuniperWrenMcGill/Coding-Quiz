const quizQuestions = [
    {
      question: "What is JavaScript?",
      options: ["A programming language", "My favorite cat", "A clothing brand"],
      answer: "A programming language"
    },
    {
        question: "What is the purpose of JavaScript in web development?",
        options: ["Styling web pages", "Enhancing interactivity and dynamic content", " Defining page structure"],
        answer: "Enhancing interactivity and dynamic content"
    },
    {
        question: "Which operator is used for equality comparison in JavaScript?",
        options: ["==", "===", "="],
        answer: "==="
    },  
    {
      question: "What does the acronym DOM stand for in web development?",
      options: ["Document Object Model", "Document Order Model", "Data Object Model"],
      answer: "Document Object Model"
    },  
    {
      question: "What is the purpose of the fetch function in JavaScript?",
      options: ["To manipulate the DOM", "To make asynchronous HTTP requests", "To create a loop"],
      answer: "To make asynchronous HTTP requests"
    },  
  ];

  let currentQuestionIndex = 0;
  let timer;
  let remainingTime = quizQuestions.length * 15; // Initial time in seconds
  let timerValue = quizQuestions.length * 15;
  let userScore = 0;


//   Start the game

function startQuiz() {
    // Get the "Start Quiz" button element
    const startBtn = document.getElementById('startBtn');

    // Hide the button when it's clicked
    startBtn.style.display = 'none';

    // Start timer
    startTimer();
    document.getElementById('timer-container').classList.remove("hide");

    // Show the first question
    showQuestion();
}

// Add an event listener to the button
document.getElementById('startBtn').addEventListener("click", startQuiz);

function showQuestion() {
    const currentQuestion = quizQuestions[currentQuestionIndex];

  // Display the question and options in the HTML
  const quizContainer = document.getElementById('quiz-container');
  quizContainer.innerHTML = `
    <h2>${currentQuestion.question}</h2>
    <ul style="list-style: none; padding: 0;">
    ${currentQuestion.options.map(option => `<li style="border: 3px solid #ccc; background-color: #492b3a; margin: 20px; padding: 20px;">${option}</li>`).join('')}
    </ul>
  `;

  // Add event listeners  to the options
  const options = quizContainer.querySelectorAll('li');
  options.forEach(option => {
      option.addEventListener('click', handleOptionClick);
  });
}

function handleOptionClick(event) {
  const selectedOption = event.target.textContent;
  const currentQuestion = quizQuestions[currentQuestionIndex];

  if (selectedOption === currentQuestion.answer) {
      // Correct answer
      console.log('Correct!');
      userScore++;
  } else {
      // Incorrect answer
      console.log('Incorrect!');
      // Decrease the timer by 5 seconds
      timerValue -=10;
  }

  // Move to the next question
  currentQuestionIndex++;

  // Check if there are more questions
  if (currentQuestionIndex < quizQuestions.length) {
      // Wait for a brief moment to allow the user to see feedback before moving to the next question
      setTimeout(showQuestion, 1000);
  } else {
      // End of the quiz
      console.log("Quiz completed!");
      clearInterval(timer); // Stop the timer
      promptForInitials()
  }
}

// start the timer
function startTimer() {
  // Display and update the timer every second
  timer = setInterval(function () {
      document.getElementById('timer').innerText = timerValue;

      // Check if the timer has reached 0
      if (timerValue <= 0) {
          clearInterval(timer); // Stop the timer
          console.log('Time is up');
          promptForInitials()
      } else {
          timerValue--; // Decrease the timer by one second
      }
  }, 1000); // 1000 milliseconds = 1 second
}

// show the modal
function showModal() {
  document.getElementById('modal').style.display = 'block';
}

// hide the modal
function hideModal() {
  document.getElementById('modal').style.display = 'none';
}

// prompt user for initials
function promptForInitials() {
  showModal();
  document.getElementById('saveButton').addEventListener('click', savePlayerInfo);
}

// save player information in local storage
function savePlayerInfo() {
  const initials = document.getElementById('high-score').value;
  if (initials) {
    // grab existing player information from local storage
    const existingPlayerInfo = JSON.parse(localStorage.getItem("playerInfo")) || [];

    // add the new player's information
    existingPlayerInfo.push({ initials, score: userScore });

   // save the updated player information back to local storage
    localStorage.setItem("playerInfo", JSON.stringify(existingPlayerInfo));

    // hide the modal after saving
    hideModal();
    document.getElementById('high-scores').classList.remove("hide");
  } else {
    alert("Please enter your initials.");
  }
}

function displayHighScores() {
  // grab high scores from local storage
  const highScores = JSON.parse(localStorage.getItem("playerInfo")) || [];

  // sort high scores by score in descending order
  highScores.sort((a, b) => b.score - a.score);

  // create an HTML string to display the high scores
  const highScoresHTML = highScores.map((player, index) => `<p>${index + 1}. ${player.initials}: ${player.score}</p>`).join('');

  // display the high scores in a modal or another element
  // replace 'highScoresContainer' with the ID or class of the element where you want to display the scores
  document.getElementById('high-scores').innerHTML = highScoresHTML;

}
// Example: Add an event listener to a button or link to trigger the display of high scores
document.getElementById('high-scoresBtn').addEventListener('click', displayHighScores);