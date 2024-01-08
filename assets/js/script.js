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

//   Start the game

function startQuiz() {
    // Get the "Start Quiz" button element
    const startBtn = document.getElementById('startBtn');

    // Hide the button when it's clicked
    startBtn.style.display = 'none';

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
      ${currentQuestion.options.map(option => `<li>${option}</li>`).join('')}
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
