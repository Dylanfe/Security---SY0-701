document.addEventListener('DOMContentLoaded', () => {
    // Theme switcher
    const themeCheckbox = document.getElementById('theme-checkbox');
    const body = document.body;

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
    const flagBtn = document.getElementById('flag-btn');
    const optionsList = document.getElementById('options-list');
    const feedbackContainer = document.getElementById('feedback-container');
    const studyGuideContainer = document.getElementById('study-guide-container');
    const studyGuideToggle = document.getElementById('study-guide-toggle');
    const studyGuideContent = document.getElementById('study-guide-content');
    const questionCounter = document.getElementById('question-counter');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const bottomControls = document.querySelector('.bottom-controls');
    const questionPalette = document.getElementById('question-palette');
    const palettePrevBtn = document.getElementById('palette-prev-btn');
    const paletteNextBtn = document.getElementById('palette-next-btn');
    const palettePageInfo = document.getElementById('palette-page-info');
    const paletteToggleBtn = document.getElementById('palette-toggle-btn');

    // Results
    const resultsContainer = document.getElementById('results-container');
    const scoreText = document.getElementById('score-text');
    const summaryContainer = document.getElementById('summary-container');
    const restartBtn = document.getElementById('restart-btn');

    let allQuestions = [];
    let questionsForCurrentQuiz = [];
    let currentQuestionIndex = 0;
    let answeredQuestions = [];
    let flaggedQuestions = [];
    let palettePage = 0;
    const questionsPerPage = 50;

    // --- Theme Switcher Logic ---
    function applyTheme(theme) {
        if (theme === 'dark') {
            body.classList.add('dark-mode');
            themeCheckbox.checked = true;
        } else {
            body.classList.remove('dark-mode');
            themeCheckbox.checked = false;
        }
    }

    themeCheckbox.addEventListener('change', () => {
        if (themeCheckbox.checked) {
            localStorage.setItem('theme', 'dark');
            applyTheme('dark');
        } else {
            localStorage.setItem('theme', 'light');
            applyTheme('light');
        }
    });

    const savedTheme = localStorage.getItem('theme') || 'light';
    applyTheme(savedTheme);
    // -----------------------------

    function initializeQuiz() {
        body.classList.remove('quiz-active');
        quizSetup.style.display = 'block';
        progressContainer.style.display = 'none';
        quizContainer.style.display = 'none';
        resultsContainer.style.display = 'none';
        bottomControls.style.display = 'none';
        bottomControls.style.visibility = 'hidden';
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
        palettePage = 0;
        answeredQuestions = new Array(questionsForCurrentQuiz.length).fill(null);
        flaggedQuestions = new Array(questionsForCurrentQuiz.length).fill(false);
        
        body.classList.add('quiz-active');
        quizSetup.style.display = 'none';
        resultsContainer.style.display = 'none';
        progressContainer.style.display = 'block';
        quizContainer.style.display = 'block';
        bottomControls.style.display = 'block';
        bottomControls.style.visibility = 'visible';
        questionPalette.style.display = 'grid';
        document.getElementById('palette-pagination').style.display = 'flex';
        
        renderQuestionPalette();
        displayQuestion();
    }

    function renderQuestionPalette() {
        questionPalette.innerHTML = '';
        const totalPages = Math.ceil(questionsForCurrentQuiz.length / questionsPerPage);
        const start = palettePage * questionsPerPage;
        const end = start + questionsPerPage;
        const pageQuestions = questionsForCurrentQuiz.slice(start, end);

        pageQuestions.forEach((_, index) => {
            const actualIndex = start + index;
            const btn = document.createElement('button');
            btn.className = 'palette-btn';
            btn.textContent = actualIndex + 1;
            btn.dataset.index = actualIndex;

            if (flaggedQuestions[actualIndex]) {
                btn.classList.add('flagged');
            } else {
                const answered = answeredQuestions[actualIndex];
                if (answered) {
                    btn.classList.add(answered.isCorrect ? 'correct' : 'incorrect');
                }
            }

            if (actualIndex === currentQuestionIndex) {
                btn.classList.add('current');
            }

            btn.addEventListener('click', () => {
                currentQuestionIndex = actualIndex;
                displayQuestion();
            });
            questionPalette.appendChild(btn);
        });

        palettePageInfo.textContent = `Page ${palettePage + 1} of ${totalPages}`;
        palettePrevBtn.disabled = palettePage === 0;
        paletteNextBtn.disabled = palettePage >= totalPages - 1;
    }

    function displayQuestion() {
        feedbackContainer.style.display = 'none';
        feedbackContainer.innerHTML = '';
        studyGuideContainer.style.display = 'none';
        studyGuideContent.style.display = 'none';
        
        const question = questionsForCurrentQuiz[currentQuestionIndex];
        questionCounter.textContent = `Question ${currentQuestionIndex + 1} of ${questionsForCurrentQuiz.length}`;
        questionTopic.textContent = question.topic;
        questionText.textContent = question.question;
        optionsList.innerHTML = '';

        flagBtn.classList.toggle('flagged', flaggedQuestions[currentQuestionIndex]);

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
        renderQuestionPalette();
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
        renderQuestionPalette();
    }

    function showFeedbackFor(result) {
        const { question, userAnswerLetter, isCorrect } = result;
        const correctAnswer = question.answer.charAt(0);

        optionsList.querySelectorAll('li').forEach(li => {
            const optionLetter = li.dataset.option;
            if (optionLetter === correctAnswer) li.classList.add('correct');
            if (optionLetter === userAnswerLetter && !isCorrect) li.classList.add('incorrect');
        });

        let headerClass = isCorrect ? 'correct' : 'incorrect';
        let headerText = isCorrect ? 'Correct!' : `Incorrect. The correct answer was ${correctAnswer}).`;

        let explanationHtml = `<div class="explanation-content">
            <h4>Explanation</h4><p><strong class="correct-answer">${question.answer}</strong> is correct because: ${question.explanation.correct}</p>
            ${question.explanation.incorrect ? `<h5>Why the others are incorrect:</h5><ul>${Object.entries(question.explanation.incorrect).map(([key, value]) => `<li><strong class="incorrect-answer">${key}):</strong> ${value}</li>`).join('')}</ul>` : ''}
            ${question.memory_aid ? `<p class="memory-aid"><strong>Memory Aid:</strong> ${question.memory_aid}</p>` : ''}
        </div>`;

        const feedbackHtml = `<div class="feedback-header ${headerClass}">${headerText}</div>${explanationHtml}`;
        
        feedbackContainer.innerHTML = feedbackHtml;
        feedbackContainer.style.display = 'block';

        if (studyGuideData[question.topic]) {
            let studyGuideHtml = studyGuideData[question.topic];
            const keyTerms = (question.key_terms || []).concat(question.answer);
            
            function escapeRegExp(string) {
                return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
            }

            keyTerms.forEach(term => {
                const regex = new RegExp(`\\b(${escapeRegExp(term)})\\b`, 'gi');
                studyGuideHtml = studyGuideHtml.replace(regex, '<span class="key-term">$1</span>');
            });
            studyGuideContent.innerHTML = studyGuideHtml;
            studyGuideContainer.style.display = 'block';
        }
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
        body.classList.remove('quiz-active');
        progressContainer.style.display = 'none';
        quizContainer.style.display = 'none';
        prevBtn.style.display = 'none';
        nextBtn.style.display = 'none';
        bottomControls.style.display = 'none';
        resultsContainer.style.display = 'block';

        const score = answeredQuestions.filter(a => a && a.isCorrect).length;
        scoreText.textContent = `Your Final Score: ${score} out of ${questionsForCurrentQuiz.length} (${((score / questionsForCurrentQuiz.length) * 100).toFixed(2)}%)`;
        
        summaryContainer.innerHTML = '<h3>Review Your Answers:</h3>';
        answeredQuestions.forEach((result, index) => {
            if (!result) return;
            const resultCard = document.createElement('div');
            resultCard.className = 'result-card';
            if (flaggedQuestions[index]) {
                resultCard.innerHTML += `<p><strong>🚩 Flagged for Review</strong></p>`;
            }
            
            let summaryHtml = `<p><strong>Question:</strong> ${result.question.question}</p><ul>`;
            result.question.options.forEach(opt => {
                const optionLetter = opt.charAt(0);
                let className = '';
                if (optionLetter === result.question.answer.charAt(0)) className = 'correct';
                if (optionLetter === result.userAnswerLetter && !result.isCorrect) className = 'incorrect';
                summaryHtml += `<li class="${className}">${opt}</li>`;
            });
            summaryHtml += `</ul><div class="explanation-content">
                <h4>Explanation</h4><p>${result.question.explanation.correct}</p>
                ${result.question.explanation.incorrect ? `<h5>Why the others are incorrect:</h5><ul>${Object.entries(result.question.explanation.incorrect).map(([key, value]) => `<li><strong>${key}):</strong> ${value}</li>`).join('')}</ul>` : ''}
                ${result.question.memory_aid ? `<p class="memory-aid"><strong>Memory Aid:</strong> ${result.question.memory_aid}</p>` : ''}
            </div>`;

            resultCard.innerHTML += summaryHtml;
            summaryContainer.appendChild(resultCard);
        });
    }

    flagBtn.addEventListener('click', () => {
        flaggedQuestions[currentQuestionIndex] = !flaggedQuestions[currentQuestionIndex];
        flagBtn.classList.toggle('flagged', flaggedQuestions[currentQuestionIndex]);
        renderQuestionPalette();
    });

    studyGuideToggle.addEventListener('click', () => {
        const isHidden = studyGuideContent.style.display === 'none';
        studyGuideContent.style.display = isHidden ? 'block' : 'none';
        studyGuideToggle.textContent = isHidden ? 'Hide Study Guide' : 'View in Study Guide';
    });

    paletteToggleBtn.addEventListener('click', () => {
        bottomControls.classList.toggle('open');
    });

    palettePrevBtn.addEventListener('click', () => {
        if (palettePage > 0) {
            palettePage--;
            renderQuestionPalette();
        }
    });

    paletteNextBtn.addEventListener('click', () => {
        const totalPages = Math.ceil(questionsForCurrentQuiz.length / questionsPerPage);
        if (palettePage < totalPages - 1) {
            palettePage++;
            renderQuestionPalette();
        }
    });

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
