var timer;
var seconds = 60;
const questions = [
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