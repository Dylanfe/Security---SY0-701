document.addEventListener('DOMContentLoaded', () => {
    // Quiz Setup
    const quizSetup = document.getElementById('quiz-setup');
    const numQuestionsInput = document.getElementById('num-questions-input');
    const numQuestionsSlider = document.getElementById('num-questions-slider');
    const startQuizBtn = document.getElementById('start-quiz-btn');

    // Quiz Proper
    const progressContainer = document.getElementById('progress-container');
    const quizContainer = document.getElementById('quiz-container');
    const questionCard = document.getElementById('question-card');
    const questionTopic = document.getElementById('question-topic');
    const questionText = document.getElementById('question-text');
    const optionsList = document.getElementById('options-list');
    const feedbackContainer = document.getElementById('feedback-container');
    const questionCounter = document.getElementById('question-counter');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');

    // Results
    const resultsContainer = document.getElementById('results-container');
    const scoreText = document.getElementById('score-text');
    const summaryContainer = document.getElementById('summary-container');
    const restartBtn = document.getElementById('restart-btn');

    let allQuestions = [];
    let questionsForCurrentQuiz = [];
    let currentQuestionIndex = 0;
    let answeredQuestions = []; // This will now be an array of result objects

    function initializeQuiz() {
        quizSetup.style.display = 'block';
        progressContainer.style.display = 'none';
        quizContainer.style.display = 'none';
        resultsContainer.style.display = 'none';
        if (allQuestions.length > 0) {
            numQuestionsInput.max = allQuestions.length;
            numQuestionsSlider.max = allQuestions.length;
        }
    }

    function syncInputs(source) {
        const value = parseInt(source.value, 10);
        if (source.id === 'num-questions-slider') {
            numQuestionsInput.value = value;
        } else {
            numQuestionsSlider.value = value;
        }
    }

    numQuestionsSlider.addEventListener('input', () => syncInputs(numQuestionsSlider));
    numQuestionsInput.addEventListener('input', () => syncInputs(numQuestionsInput));

    function startQuiz() {
        currentQuestionIndex = 0;
        answeredQuestions = new Array(questionsForCurrentQuiz.length).fill(null);
        
        quizSetup.style.display = 'none';
        resultsContainer.style.display = 'none';
        progressContainer.style.display = 'block';
        quizContainer.style.display = 'block';
        
        displayQuestion();
    }

    function displayQuestion() {
        feedbackContainer.style.display = 'none';
        feedbackContainer.innerHTML = '';
        
        const question = questionsForCurrentQuiz[currentQuestionIndex];
        questionCounter.textContent = `Question ${currentQuestionIndex + 1} of ${questionsForCurrentQuiz.length}`;
        questionTopic.textContent = question.topic;
        questionText.textContent = question.question;
        optionsList.innerHTML = '';

        question.options.forEach(opt => {
            const li = document.createElement('li');
            li.dataset.option = opt.charAt(0);
            li.textContent = opt;
            optionsList.appendChild(li);
        });

        const answered = answeredQuestions[currentQuestionIndex];
        if (answered) {
            showFeedbackFor(answered);
            optionsList.classList.add('disabled');
        } else {
            optionsList.classList.remove('disabled');
            optionsList.querySelectorAll('li').forEach(li => li.addEventListener('click', handleOptionSelect));
        }

        questionCard.style.display = 'block';
        updateNavButtons();
    }

    function handleOptionSelect(event) {
        const selectedOptionElement = event.target;
        const selectedOptionLetter = selectedOptionElement.dataset.option;
        const selectedOptionText = selectedOptionElement.textContent;
        const question = questionsForCurrentQuiz[currentQuestionIndex];
        
        const result = {
            question: question,
            userAnswerLetter: selectedOptionLetter,
            userAnswerText: selectedOptionText,
            isCorrect: selectedOptionLetter === question.answer.charAt(0)
        };
        answeredQuestions[currentQuestionIndex] = result;

        optionsList.classList.add('disabled');
        showFeedbackFor(result);
        updateNavButtons();
    }

    function showFeedbackFor(result) {
        const { question, userAnswerLetter, isCorrect } = result;
        const correctAnswer = question.answer.charAt(0);

        // Highlight options
        optionsList.querySelectorAll('li').forEach(li => {
            const optionLetter = li.dataset.option;
            if (optionLetter === correctAnswer) {
                li.classList.add('correct');
            }
            if (optionLetter === userAnswerLetter && !isCorrect) {
                li.classList.add('incorrect');
            }
        });

        let headerClass = isCorrect ? 'correct' : 'incorrect';
        let headerText = isCorrect ? 'Correct!' : `Incorrect. The correct answer was ${correctAnswer}).`;

        let explanationHtml = `<div class="explanation-content">...</div>`; // Full explanation logic here
        explanationHtml = `<div class="explanation-content">
            <h4>Explanation</h4><p><strong>${question.answer}</strong> is correct because: ${question.explanation.correct}</p>
            ${question.explanation.incorrect ? `<h5>Why the others are incorrect:</h5><ul>${Object.entries(question.explanation.incorrect).map(([key, value]) => `<li><strong>${key}):</strong> ${value}</li>`).join('')}</ul>` : ''}
            ${question.memory_aid ? `<p class="memory-aid"><strong>Memory Aid:</strong> ${question.memory_aid}</p>` : ''}
        </div>`;

        const feedbackHtml = `<div class="feedback-header ${headerClass}">${headerText}</div>${explanationHtml}`;
        
        feedbackContainer.innerHTML = feedbackHtml;
        feedbackContainer.style.display = 'block';
    }

    function updateNavButtons() {
        prevBtn.style.display = 'block';
        nextBtn.style.display = 'block';
        prevBtn.disabled = currentQuestionIndex === 0;
        
        if (currentQuestionIndex === questionsForCurrentQuiz.length - 1) {
            nextBtn.textContent = 'Finish Quiz';
        } else {
            nextBtn.textContent = 'Next Question';
        }
    }

    function showResults() {
        progressContainer.style.display = 'none';
        quizContainer.style.display = 'none';
        prevBtn.style.display = 'none';
        nextBtn.style.display = 'none';
        resultsContainer.style.display = 'block';

        const score = answeredQuestions.filter(a => a && a.isCorrect).length;
        scoreText.textContent = `Your Final Score: ${score} out of ${questionsForCurrentQuiz.length} (${((score / questionsForCurrentQuiz.length) * 100).toFixed(2)}%)`;
        
        summaryContainer.innerHTML = '<h3>Review Your Answers:</h3>';
        answeredQuestions.forEach(result => {
            if (!result) return;
            const resultCard = document.createElement('div');
            resultCard.className = 'result-card';
            
            let summaryHtml = `<p><strong>Question:</strong> ${result.question.question}</p><ul>`;
            result.question.options.forEach(opt => {
                const optionLetter = opt.charAt(0);
                let className = '';
                if (optionLetter === result.question.answer.charAt(0)) className = 'correct';
                if (optionLetter === result.userAnswerLetter && !result.isCorrect) className = 'incorrect';
                summaryHtml += `<li class="${className}">${opt}</li>`;
            });
            summaryHtml += `</ul><div class="explanation-content">...</div>`; // Full explanation
            summaryHtml += `<div class="explanation-content">
                <h4>Explanation</h4><p>${result.question.explanation.correct}</p>
                ${result.question.explanation.incorrect ? `<h5>Why the others are incorrect:</h5><ul>${Object.entries(result.question.explanation.incorrect).map(([key, value]) => `<li><strong>${key}):</strong> ${value}</li>`).join('')}</ul>` : ''}
                ${result.question.memory_aid ? `<p class="memory-aid"><strong>Memory Aid:</strong> ${result.question.memory_aid}</p>` : ''}
            </div>`;

            resultCard.innerHTML = summaryHtml;
            summaryContainer.appendChild(resultCard);
        });
    }

    startQuizBtn.addEventListener('click', () => {
        const num = parseInt(numQuestionsInput.value, 10);
        if (isNaN(num) || num < 1 || num > allQuestions.length) {
            alert(`Please enter a number between 1 and ${allQuestions.length}.`);
            return;
        }
        questionsForCurrentQuiz = allQuestions.sort(() => Math.random() - 0.5).slice(0, num);
        startQuiz();
    });

    nextBtn.addEventListener('click', () => {
        if (currentQuestionIndex === questionsForCurrentQuiz.length - 1) {
            showResults();
        } else {
            currentQuestionIndex++;
            displayQuestion();
        }
    });

    prevBtn.addEventListener('click', () => {
        if (currentQuestionIndex > 0) {
            currentQuestionIndex--;
            displayQuestion();
        }
    });

    restartBtn.addEventListener('click', initializeQuiz);

    fetch('sy0-701-questions.json')
        .then(response => response.json())
        .then(data => {
            allQuestions = data.questions;
            initializeQuiz();
        });
});
