//This is an application of timed quize. 

var startButton = document.getElementById("start-btn");
var nextButton = document.getElementById("next-btn");
var questionContainerElement = document.getElementById("question-container");
var questionElement = document.getElementById("question");
var answerButtonsElement = document.getElementById("answer-buttons");
var introduction = document.getElementById("introduction");
var secondsDisplay = document.getElementById("seconds");
var score = 0;

//bonus shuffling the questins
let shuffledQuestions, currentQuestionIndex;
let time
//adding event lestiner for start button 
startButton.addEventListener("click", startGame);
nextButton.addEventListener("click", () => {
  currentQuestionIndex++
  setNextQuestion();
})

//next question will appear
//Correct answer will move to the next question
function startGame() {
    startButton.classList.add("hide");
    shuffledQuestions = questions.sort(() => Math.random() - .5);
    currentQuestionIndex = 0
    questionContainerElement.classList.remove("hide");
    setNextQuestion();
  }
  
  
  function setNextQuestion() {
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex]);
  }
  
  function showQuestion(question) {
    questionElement.innerText = question.question;
    question.answers.forEach(answer => {
      var button = document.createElement("button");
      button.innerText = answer.text;
      button.classList.add("btn");
      if (answer.correct) {
        button.dataset.correct = answer.correct;
      }
      button.addEventListener("click", selectAnswer);
      answerButtonsElement.appendChild(button);
    })
  }
  
  function resetState() {
    clearStatusClass(document.body);
    nextButton.classList.add("hide");
    while (answerButtonsElement.firstChild) {
      answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
  }
  
  function selectAnswer(e) {
    var selectedButton = e.target;
    var correct = selectedButton.dataset.correct;
    setStatusClass(document.body, correct);
    Array.from(answerButtonsElement.children).forEach(button => {
      setStatusClass(button, button.dataset.correct);
    })
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
      nextButton.classList.remove("hide");
    } else {
            var name = prompt("Enter your name");
            localStorage.setItem("name", name);
    }
  }
  
  function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
      element.classList.add("correct");
    } else {
      element.classList.add("wrong");
    }
  }
  
  function clearStatusClass(element) {
    element.classList.remove("correct");
    element.classList.remove("wrong");
  }
  // questions
  var questions = [
    {
      question: "HTML is:",
      answers: [
        { text: "The standard markup language for Web pages.", correct: true },
        { text: "Pre designed platform.", correct: false },
        { text: "The programming language of the Web.", correct: false },
        { text: "A framework for developing responsive.", correct: false }
      ]
    },
    {
      question: "One of the following is not a programming language",
      answers: [
        { text: "html", correct: false },
        { text: "image", correct: true },
        { text: "Dev Ed", correct: false },
        { text: "Fun Fun Function", correct: false }
      ]
    },
    {
      question: "Which of the following is a data type",
      answers: [
        { text: "Syntax", correct: false },
        { text: "Boolean", correct: true },
        { text: "Variable", correct: false },
        { text: "Margin", correct: false }
      ]
    },
    {
      question: "What are the CSS selectors are used for?",
      answers: [
        { text: "Generate space around an element's content.", correct: false },
        { text: "Define the font family", correct: false },
        { text: "Define a special state of an element", correct: false },
        { text: "CSS selectors are used to find or select HTML elements to style.", correct: true }
      ]
    }
  ]
//adding scores

/*wrong anwsers will penalized by subtracking 
10 sc from the timer then move to next questions*/


//once all questions answered given a score
//user will enter their info.
//local storing the user info.
//Show the highest score.
