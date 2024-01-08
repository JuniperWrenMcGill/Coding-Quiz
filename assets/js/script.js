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
      
  ];

  let currentQuestionIndex = 0;
  let timer;
  let remainingTime = 30; // Initial time in seconds


//   Start the game

function startQuiz() {
    // Get the "Start Quiz" button element
    const startBtn = document.getElementById('startBtn');

    // Hide the button when it's clicked
    startBtn.style.display = 'none';

    // Start timer
    startTimer();

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
  } else {
      // Incorrect answer
      console.log('Incorrect!');
      // Decrease the timer by 5 seconds
      decreaseTimer(10);
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
  }
}

// function to start the timer
function startTimer() {
  // Set an initial timer value
  let timerValue = 30;

  // display and update the timer every second
  timer = setInterval(function () {
      document.getElementById('timer').innerText = timerValue;
      // check if the timer has reached 0
      if (timerValue <= 0) {
          clearInterval(timer); // Stop the timer
          console.log('Time is up');
          // ADD LOGIC FOR WHEN QUIZ IS DONE HERE
      } else {
          timerValue--; // Decrease the timer by one second
      }
  }, 1000); // 1000 milliseconds = 1 second
}

// function to decrease the timer by a specified number of seconds
function decreaseTimer(seconds) {
    // decrease the remaining time by the specified number of seconds
    remainingTime = Math.max(remainingTime - seconds, 0);

    // update the timer element with the new value
    document.getElementById('timer').innerText = remainingTime;

    // check if the timer has reached 0
    if (remainingTime === 0) {
        clearInterval(timer); // stop the timer
        console.log('Time is up');
        // add your logic for when time is up here
    }
}