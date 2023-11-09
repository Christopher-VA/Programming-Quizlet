var startBtn = document.querySelector("#btn");
var buttonFirst = $("#btn");
var timeEl = $("#timer");
var secondsLeft = 100;
var questionNumberIndex = 0;
var questionContainer = $('#question-container');
var scoreContainer = $('#score-container');
var saveButton = document.querySelector('#save')
var finalScore = 0;
var userName = document.getElementById('#msg');
questionContainer.hide();
scoreContainer.hide();

var quizGame = function() {
    function setTime() {
        var timerInterval = setInterval(function() {
            timeEl.text("Timer: " + secondsLeft);
            secondsLeft--;
    
            if (secondsLeft < 1) {
                clearInterval(timerInterval);
                endGame();
            }
        }, 1000);
    }
    
    setTime();
    loadQuestion();
    buttonFirst.hide();
    questionContainer.show();
}

    var questions = [
        {
            question: "Which JS code is used for calling an event?",
            options: {
                0: 'addEventListener',
                1: 'clearInterval',
                2: 'querySelector',
                3: 'setInterval'
            },
            correctAnswer: 0
        },
        {
            question: "How do you make variables using Javascript?",
            options: {
                0: 'function',
                1: 'if',
                2: 'var',
                3: 'for'
            },
            correctAnswer: 2
        },
        {
            question: "What type of variable is this: True",
            options: {
                0: 'number',
                1: 'boolean',
                2: 'string',
                3: 'array'
            },
            correctAnswer: 1
        },
        {
            question: "Which symbole is used for Jquery",
            options: {
                0: '$',
                1: '#',
                2: '*',
                3: '%'
            },
            correctAnswer: 0
        }
    ]



var loadQuestion = function() {
    if (questionNumberIndex === 4) {
        endGame();
        return;
    }

    var question = document.getElementById("ques");
    var opt = document.getElementById("opt");

    question.textContent = questions[questionNumberIndex].question;
    opt.innerHTML = ""

 
    for (i = 0; i < 4; i++) {
        var choice = document.createElement("button");
        choice.classList.add('btn')
        choice.setAttribute('data-index', i);

        console.log(questionNumberIndex);
        console.log(questions[questionNumberIndex]);
        choice.textContent = questions[questionNumberIndex].options[i];

 
        opt.appendChild(choice);
    }

}

function checkAnswer(e){
    var target = e.target;
    
    if(!target.classList.contains('btn')) return;
    
    var correctAnswer = questions[questionNumberIndex].correctAnswer;
    var currentAnswer = parseInt(target.dataset.index);
    console.log(typeof currentAnswer);
    console.log(typeof correctAnswer);

    if (correctAnswer !== currentAnswer) {
        if (secondsLeft <= 20){
            secondsLeft = 0
            endGame();
        }
        secondsLeft -= 20;
    }

    console.log(3)
    questionNumberIndex++;
    loadQuestion();
}

var endGame = function() {
    questionContainer.hide();
    scoreContainer.show();
    var timeLeft = $('#time-left');
    finalScore = secondsLeft

    timeLeft.text(finalScore);
    timeEl.remove();
}

var userArry = [finalScore, userName];

function storeScore() {
    localStorage.setItem('user', JSON.stringify(userArry));
    window.location.href = 'highscore.html';
    console.log(userArry);
}

saveButton.addEventListener('click', storeScore);

opt.addEventListener('click', checkAnswer)

startBtn.addEventListener("click", quizGame);