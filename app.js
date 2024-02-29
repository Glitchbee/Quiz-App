const questions = [
    {
        question: "Which is the fastest animal in the world ?",
        answers: [
            { text: "Cheetha", correct: false },
            { text: "Puma", correct: false },
            { text: "Peregrine-falcon", correct: true },
            { text: "Lion", correct: false },
        ]
    },

    {
        question: "Which is the largest animal in the world ?",
        answers: [
            { text: "Lion", correct: false },
            { text: "Blue-Whale", correct: true },
            { text: "Tiger", correct: false },
            { text: "Elephant", correct: false },

        ]
    },

    {
        question: "Which is the largest country ?",
        answers: [
            { text: "Asia", correct: true },
            { text: "China", correct: false },
            { text: "Russia", correct: false },
            { text: "US", correct: false },

        ]
    },

    {
        question: "Which one of the following animal is the apex-predator in the sea ?",
        answers: [
            { text: "Crocodile", correct: false },
            { text: "Great-White-Sharks", correct: false },
            { text: "Sperm-Whale", correct: false },
            { text: "Killer-Whale", correct: true },

        ]
    }
];



const questionElement = document.getElementById('quiz-qs');
const nextBtn = document.querySelector('.next-btn');
const answerButtons = document.querySelector('.option-btn');

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextBtn.innerHTML = 'Next';
    showQuestion();
}


function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNum = currentQuestionIndex + 1;

    questionElement.innerHTML = questionNum + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement('button');
        button.classList.add('btn');
        button.innerHTML = answer.text;
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }

        button.addEventListener('click', selectAnswer);
    });

}

function resetState() {
    nextBtn.style.display = 'none';
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }

}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === 'true';
    if (isCorrect) {
        selectedBtn.classList.add('correct');
        score++;
    }
    else {
        selectedBtn.classList.add('incorrect');
    }
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === 'true') {
            button.classList.add('correct');
        }

        button.disabled = true;
    });
    nextBtn.style.display = 'block';
}


function showScore() {
    resetState();
    questionElement.innerHTML = `You have scored ${score} out of ${questions.length}.`;
    nextBtn.innerHTML = 'Play Again';
    nextBtn.style.display = 'block';
}


function handleNextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    }
    else {
        showScore();
    }
}

nextBtn.addEventListener('click', () => {
    if (currentQuestionIndex < questions.length) {
        handleNextQuestion();
    }
    else {
        startQuiz();
    }
})

startQuiz();