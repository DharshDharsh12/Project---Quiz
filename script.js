const ArrayList = [
  {
    question: "What is the 1st Newspaper in India?",
    options: ["The Hindu", "Times of Indian", "Deccan Herald", "Bengal Gazette"],
    answer: "Bengal Gazette",
    image: "newspaper.jpg"
  },
  {
    question: "What is the 1st University in India?",
    options: ["Ancient University", "Jagaddala University", "Nalanda University", "Takahashila"],
    answer: "Nalanda University"
  },
  {
    question: "When was the 1st Telephone introduced in India?",
    options: ["1882", "1851", "1780", "1880"],
    answer: "1882"
  },
  {
    question: "Who is the 1st lady to become 'Miss World' from India?",
    options: ["Aishwarya Rai", "Reita Faria", "Diana Hayden", "Yukta Mookhey"],
    answer: "Reita Faria"
  },
  {
    question: "What is the capital of India?",
    options: ["Delhi", "Chennai", "Mumbai", "Kolkata"],
    answer: "Delhi"
  },
  {
    question: "Who painted the Mona Lisa?",
    options: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Michelangelo"],
    answer: "Leonardo da Vinci"
  },
  {
    question: "What is the largest ocean in the world?",
    options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
    answer: "Pacific Ocean"
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Venus", "Mars", "Jupiter", "Saturn"],
    answer: "Mars"
  },
  {
    question: "Who is the author of the Harry Potter book series?",
    options: ["J.R.R. Tolkien", "J.K. Rowling", "George R.R. Martin", "Dan Brown"],
    answer: " J.K. Rowling"
  },
  {
    question: "Which country is known as the Land of the Rising Sun?",
    options: ["China", "South Korea", "Japan", "Thailand"],
    answer: "Japan"
  }
];

let currentQuestionIndex = 0;
let score = 0;
let selectedOptionIndex = -1;
const startButton = document.getElementById("start-button");
const quizScreen = document.getElementById("quiz-screen");
const questionParagraph = document.getElementById("question-paragraph");
const optionsList = document.getElementById("options-list");
const resultContainer = document.getElementById("result");
const nextButton = document.getElementById("submit-button");
const steps = document.querySelectorAll(".timeline-step");
const timeline = document.querySelector(".timeline");
let confirmBox = document.getElementById("confirm-box");
const timerDisplay = document.getElementById("timer-display");
const circularProgress = document.querySelector(".circular-progress");
const progressValue = document.querySelector(".progress-value");
const resultScreen = document.getElementById("result-screen");
const finalResult = document.getElementById("final-result");
const quizWrapper = document.getElementById("quizWrapper");
let timer;


function hideOptions() {
  hideOn.style.display = 'none';
}

function startTimer() {
  let timeLeft = 70;
  timerDisplay.textContent = `Time Left: ${timeLeft}s`;

  timer = setInterval(function() {
    timeLeft--;
    if (timeLeft <= 0) {
      clearInterval(timer);
      selectedOptionIndex = -1;
      // nextQuestion();
      timerDisplay.textContent = `Time Left: ${timeLeft}s`;
      // confirmBox.style.display = "block";
    } else {
      timerDisplay.textContent = `Time Left: ${timeLeft}s`;
    }
  }, 1000);
}

function stopTimer() {
  clearInterval(timer);
  timerDisplay.textContent = "";
}

function startQuiz() {
  const startScreen = document.getElementById("start-screen");
  const quizScreen = document.getElementById("quiz-screen");
  startScreen.style.display = "none";
  quizScreen.style.display = "flex";
  displayQuestion();
}

startButton.addEventListener("click", startQuiz);

function displayQuestion() {
  const question = ArrayList[currentQuestionIndex];
  questionParagraph.innerHTML = `<img src="${ArrayList.image}" alt="Question Image" style="max-width: 100%;">`;
  questionParagraph.textContent = `${currentQuestionIndex + 1}. ${question.question}`;
  optionsList.innerHTML = "";

  resultContainer.style.display = "none";
  question.options.forEach((option, optionIndex) => {
    const optionItem = document.createElement("button");
    optionItem.classList.add("options");

    if (selectedOptionIndex === optionIndex) {
      optionItem.classList.add("selected");
    }

    optionItem.textContent = option;
    optionItem.addEventListener("click", function() {
      clearSelectedOptions();
      optionItem.classList.add("selected");
      selectedOptionIndex = optionIndex;
    });
    optionsList.appendChild(optionItem);
  });
  // startQuiz();
  startTimer();
  updateButtonLabel();
  updateTimeline();
}

function updateButtonLabel() {
  if (currentQuestionIndex === ArrayList.length - 1) {
    nextButton.textContent = "Submit";
  } else {
    nextButton.textContent = "Next";
  }
}


function updateTimeline(index) {
  timeline.innerHTML = "";

  for (let i = 0; i < ArrayList.length; i++) {
    const step = document.createElement("div");
    step.classList.add("timeline-step");

    if (i < currentQuestionIndex) {
      step.classList.add("answered");
    }

    if (i === currentQuestionIndex) {
      step.classList.add("active");
    }

    if (i === currentQuestionIndex && selectedOptionIndex !== -1) {
      step.classList.add("answered-selected");
    }

    step.dataset.index = i;

    step.addEventListener("click", function() {
      const clickedIndex = parseInt(this.dataset.index, 10);
      if (clickedIndex < currentQuestionIndex) {
        displayQuestion(clickedIndex);
      }
    });
    timeline.appendChild(step);
  }
}



nextButton.addEventListener("click", function() {
  if (currentQuestionIndex === ArrayList.length) {
    confirmBox.style.display = "block";
  } else {

    if (selectedOptionIndex === -1) {
      resultContainer.textContent = "Please choose an option before submitting.";
      resultContainer.style.color = "red";
      resultContainer.style.display = "block";
      return;
    }

    const correctAnswerIndex = ArrayList[currentQuestionIndex].options.indexOf(
      ArrayList[currentQuestionIndex].answer
    );

    if (selectedOptionIndex === correctAnswerIndex) {
      score++;
      console.log(score);
    }

    currentQuestionIndex++;

    if (currentQuestionIndex < ArrayList.length) {
      displayQuestion();
      resultContainer.style.display = "none";
      clearSelectedOptions();
      stopTimer();
    } else {
      confirmBox.style.display = "block";
      stopTimer();
    }
  }
});



function displayResult() {

  finalResult.innerHTML = "WOW! Your score is " + score + " out of " + ArrayList.length;
  resultScreen.style.display = "flex";
  quizWrapper.classList.add("hidden");

  let progressStartValue = 0;
  let progressEndValue = score * 10;
  let speed = 50;

  let prog = setInterval(() => {
    progressStartValue++;

    progressValue.textContent = `${progressStartValue} %`;
    circularProgress.style.background = `conic-gradient(#7d2ae8 ${progressStartValue * 3.6}deg, #ededed 0deg)`;
    console.log(`${progressStartValue} , ${progressEndValue}`);
    if (progressStartValue == progressEndValue) {
      clearInterval(prog);
    }
  }, speed);
}



function confirmSubmission(answer) {
  const resultScreen = document.getElementById("result-screen");
  const finalResult = document.getElementById("final-result");

  if (answer === 'yes') {
    resultScreen.style.display = "flex";
    confirmBox.style.display = "none";
    quizScreen.classList.add("blur");

    displayResult();
  } else if (answer === 'no') {
    confirmBox.style.display = "none";
    quizScreen.classList.add("blur");
  }
}

document.getElementById("confirm-yes").addEventListener("click", function() {
  confirmSubmission('yes');
});

document.getElementById("confirm-no").addEventListener("click", function() {
  confirmSubmission('no');
});

function clearSelectedOptions() {
  const options = document.querySelectorAll("#options-list button");
  options.forEach((option) => {
    option.classList.remove("selected");
  });
}
