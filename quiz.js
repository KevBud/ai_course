const quizData = [
    {
        question: "What is the defining characteristic of 'Supervised Learning'?",
        options: [
            "The model is trained on data that lacks any labels or predefined answers.",
            "The model learns from a 'ground truth' in the form of labeled data with inputs and correct outputs.",
            "The model interacts with an environment and learns through positive and negative rewards.",
            "The model is used exclusively to group data into clusters based on similarities."
        ],
        correct: 1
    },
    {
        question: "What is the primary function of 'backpropagation' during the training process?",
        options: [
            "It sends data forward through the layers to generate an initial guess.",
            "It acts as a filter to remove noise from the input data before it reaches the network.",
            "It calculates how much each weight contributed to the error and adjusts them backward through the network.",
            "It converts linear relationships into non-linear relationships within each individual cell."
        ],
        correct: 2
    },
    {
        question: "What does the concept of 'Self-Attention' mean in a Transformer architecture?",
        options: [
            "The model focuses on translating one word at a time without looking at the surrounding context.",
            "The model weighs the importance of different words in a sentence against each other to understand context.",
            "The model automatically corrects spelling errors in the user's input.",
            "The model deletes words deemed irrelevant to save computing power."
        ],
        correct: 1
    },
    {
        question: "How does the basic principle of a 'Diffusion Model' work for image generation?",
        options: [
            "It cuts and pastes pieces from millions of existing photos to create a collage.",
            "It trains two networks that compete against each other in a zero-sum game.",
            "It creates an image by step-by-step removing noise from a random noise matrix.",
            "It predicts the next pixel in a row based on all previous pixels."
        ],
        correct: 2
    },
    {
        question: "What is meant by the 'Exploration vs. Exploitation' dilemma?",
        options: [
            "The choice between collecting more raw data or beginning the model training.",
            "The choice between using a CPU or a GPU to run the algorithm.",
            "The balance between trying new unknown actions and using actions that have yielded high rewards in the past.",
            "The difference between training in a simulated environment versus a real-world environment."
        ],
        correct: 2
    }
];

let currentQuestion = 0;
let score = 0;

const questionEl = document.getElementById('question-area');
const optionsEl = document.getElementById('options-area');
const nextBtn = document.getElementById('next-btn');
const submitBtn = document.getElementById('submit-btn');
const quizBox = document.getElementById('quiz-container');
const resultArea = document.getElementById('result-area');

function loadQuiz() {
    const currentQuizData = quizData[currentQuestion];
    questionEl.innerHTML = `<h3>${currentQuizData.question}</h3>`;
    optionsEl.innerHTML = '';

    currentQuizData.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.innerText = option;
        button.classList.add('option-btn');
        button.onclick = () => selectOption(index);
        optionsEl.appendChild(button);
    });
}

function selectOption(index) {
    const buttons = document.querySelectorAll('.option-btn');
    buttons.forEach(btn => btn.classList.remove('selected'));
    buttons[index].classList.add('selected');
    
    if (currentQuestion < quizData.length - 1) {
        nextBtn.style.display = 'block';
    } else {
        submitBtn.style.display = 'block';
    }

    // sparar svar tillfällit
    quizData[currentQuestion].userAnswer = index;
}

nextBtn.onclick = () => {
    if (quizData[currentQuestion].userAnswer === quizData[currentQuestion].correct) {
        score++;
    }
    currentQuestion++;
    nextBtn.style.display = 'none';
    loadQuiz();
};

submitBtn.onclick = () => {
    if (quizData[currentQuestion].userAnswer === quizData[currentQuestion].correct) {
        score++;
    }
    quizBox.style.display = 'none';
    resultArea.style.display = 'block';
    document.getElementById('score-text').innerText = `You scored ${score} out of ${quizData.length}!`;
    document.getElementById('feedback-text').innerText = score === quizData.length ? 
        "Excellent! You've mastered the basics of AI." : "Good effort! Review the modules to improve your score.";
};

loadQuiz();