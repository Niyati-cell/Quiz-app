const questions = [
  {
    question: "What does HTML stand for?",
    options: ["Hyper Text Markup Language", "High Tech Modern Language", "Hyper Transfer Markup Link", "Home Tool Markup Language"],
    answer: 0
  },
  {
    question: "Which language is used to style web pages?",
    options: ["Python", "CSS", "Java", "SQL"],
    answer: 1
  },
  {
    question: "Which symbol is used for comments in JavaScript?",
    options: ["<!-- -->", "#", "//", "**"],
    answer: 2
  },
  {
    question: "Which method adds an element to the end of an array?",
    options: ["pop()", "shift()", "push()", "add()"],
    answer: 2
  },
  {
    question: "Which HTML tag is used for the largest heading?",
    options: ["<h6>", "<h1>", "<head>", "<heading>"],
    answer: 1
  }
];

const TIME_PER_QUESTION = 15;

let currentIndex = 0;
let score = 0;
let timeLeft = TIME_PER_QUESTION;
let timerId = null;

const progressEl = document.getElementById("progress");
const timerEl = document.getElementById("timer");
const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const nextBtn = document.getElementById("next-btn");
const quizEl = document.getElementById("quiz");
const resultEl = document.getElementById("result");
const scoreEl = document.getElementById("score");
const restartBtn = document.getElementById("restart-btn");

function startTimer() {
  clearInterval(timerId);
  timeLeft = TIME_PER_QUESTION;
  timerEl.textContent = "Time left: " + timeLeft + "s";
  timerEl.classList.remove("urgent");

  timerId = setInterval(function () {
    timeLeft--;
    timerEl.textContent = "Time left: " + timeLeft + "s";

    if (timeLeft <= 5) {
      timerEl.classList.add("urgent");
    }

    if (timeLeft <= 0) {
      clearInterval(timerId);
      timeUp();
    }
  }, 1000);
}

function timeUp() {
  const correct = questions[currentIndex].answer;
  const buttons = optionsEl.querySelectorAll(".option");

  buttons.forEach(function (btn, i) {
    btn.disabled = true;
    if (i === correct) {
      btn.classList.add("correct");
    }
  });

  timerEl.textContent = "Time's up!";
  nextBtn.disabled = false;
}

function showQuestion() {
  const q = questions[currentIndex];
  progressEl.textContent = "Question " + (currentIndex + 1) + " of " + questions.length;
  questionEl.textContent = q.question;
  optionsEl.innerHTML = "";
  nextBtn.disabled = true;

  q.options.forEach(function (text, i) {
    const btn = document.createElement("button");
    btn.textContent = text;
    btn.className = "option";
    btn.addEventListener("click", function () {
      selectAnswer(i);
    });
    optionsEl.appendChild(btn);
  });

  startTimer();
}

function selectAnswer(selected) {
  clearInterval(timerId);

  const correct = questions[currentIndex].answer;
  const buttons = optionsEl.querySelectorAll(".option");

  buttons.forEach(function (btn, i) {
    btn.disabled = true;
    if (i === correct) {
      btn.classList.add("correct");
    } else if (i === selected) {
      btn.classList.add("wrong");
    }
  });

  if (selected === correct) {
    score++;
  }
  nextBtn.disabled = false;
}

nextBtn.addEventListener("click", function () {
  currentIndex++;
  if (currentIndex < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
});

function showResult() {
  clearInterval(timerId);
  quizEl.classList.add("hidden");
  resultEl.classList.remove("hidden");
  scoreEl.textContent = "You scored " + score + " out of " + questions.length;
}

restartBtn.addEventListener("click", function () {
  currentIndex = 0;
  score = 0;
  resultEl.classList.add("hidden");
  quizEl.classList.remove("hidden");
  showQuestion();
});

showQuestion();