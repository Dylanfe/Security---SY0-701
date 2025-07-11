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
    const readAloudBtn = document.getElementById('read-aloud-btn');
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
    const paletteCloseBtn = document.getElementById('palette-close-btn');

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
    let allObjectives = [];

    // Official Security+ (V7) objectives with titles, descriptions, and topic mapping
    const officialObjectives = [
        {
            key: "General security concepts (12%)",
            description: [
                "Security controls: comparing technical, preventive, managerial, deterrent, operational, detective, physical, corrective, compensating, and directive controls.",
                "Fundamental concepts: summarizing confidentiality, integrity, and availability (CIA); non-repudiation; authentication, authorization, and accounting (AAA); zero trust; and deception/disruption technology.",
                "Change management: explaining business processes, technical implications, documentation, and version control.",
                "Cryptographic solutions: using public key infrastructure (PKI), encryption, obfuscation, hashing, digital signatures, and blockchain."
            ],
            topics: [
                "1.1 Compare and contrast various types of security controls.",
                "1.2 Summarize these fundamental security concepts:",
                "1.3 Explain the importance of change management processes and the impact to security.",
                "1.4 Explain the importance of using appropriate cryptographic solutions."
            ]
        },
        {
            key: "Threats, vulnerabilities, and mitigations (22%)",
            description: [
                "Threat actors and motivations: comparing nation-states, unskilled attackers, hacktivists, insider threats, organized crime, shadow IT, and motivations like data exfiltration, espionage, and financial gain.",
                "Threat vectors and attack surfaces: explaining message-based, unsecure networks, social engineering, file-based, voice call, supply chain, and vulnerable software vectors.",
                "Vulnerabilities: explaining application, hardware, mobile device, virtualization, operating system (OS)-based, cloud-specific, web-based, and supply chain vulnerabilities.",
                "Malicious activity: analyzing malware attacks, password attacks, application attacks, physical attacks, network attacks, and cryptographic attacks.",
                "Mitigation techniques: using segmentation, access control, configuration enforcement, hardening, isolation, and patching."
            ],
            topics: [
                "2.1 Compare and contrast common threat actors and motivations.",
                "2.2 Explain common threat vectors and attack surfaces.",
                "2.3 Explain various types of vulnerabilities.",
                "2.4 Given a scenario, analyze indicators of malicious activity.",
                "2.5 Explain the purpose of mitigation techniques used to secure the enterprise."
            ]
        },
        {
            key: "Security architecture (18%)",
            description: [
                "Architecture models: comparing on-premises, cloud, virtualization, Internet of Things (IoT), industrial control systems (ICS), and infrastructure as code (IaC).",
                "Enterprise infrastructure: applying security principles to infrastructure considerations, control selection, and secure communication/access.",
                "Data protection: comparing data types, securing methods, general considerations, and classifications.",
                "Resilience and recovery: explaining high availability, site considerations, testing, power, platform diversity, backups, and continuity of operations."
            ],
            topics: [
                "3.1 Compare and contrast security implications of different architecture models.",
                "3.2 Given a scenario, apply security principles to secure enterprise infrastructure.",
                "3.3 Compare and contrast concepts and strategies to protect data.",
                "3.4 Explain the importance of resilience and recovery in security architecture."
            ]
        },
        {
            key: "Security operations (28%)",
            description: [
                "Computing resources: applying secure baselines, mobile solutions, hardening, wireless security, application security, sandboxing, and monitoring.",
                "Asset management: explaining acquisition, disposal, assignment, and monitoring/tracking of hardware, software, and data assets.",
                "Vulnerability management: identifying, analyzing, remediating, validating, and reporting vulnerabilities.",
                "Alerting and monitoring: explaining monitoring tools and computing resource activities.",
                "Enterprise security: modifying firewalls, IDS/IPS, DNS filtering, DLP (data loss prevention), NAC (network access control), and EDR/XDR (endpoint/extended detection and response).",
                "Identity and access management: implementing provisioning, SSO (single sign-on), MFA (multifactor authentication), and privileged access tools.",
                "Automation and orchestration: explaining automation use cases, scripting benefits, and considerations.",
                "Incident response: implementing processes, training, testing, root cause analysis, threat hunting, and digital forensics.",
                "Data sources: using log data and other sources to support investigations."
            ],
            topics: [
                "4.1 Given a scenario, apply common security techniques to computing resources.",
                "4.2 Explain the security implications of proper hardware, software, and data asset management.",
                "4.3 Explain various activities associated with vulnerability management.",
                "4.4 Explain security alerting and monitoring concepts and tools.",
                "4.5 Given a scenario, modify enterprise capabilities to enhance security.",
                "4.6 Given a scenario, implement and maintain identity and access management.",
                "4.7 Explain the importance of automation and orchestration related to secure operations.",
                "4.8 Explain appropriate incident response activities.",
                "4.9 Given a scenario, use data sources to support an investigation."
            ]
        },
        {
            key: "Security program management and oversight (20%)",
            description: [
                "Security governance: summarizing guidelines, policies, standards, procedures, external considerations, monitoring, governance structures, and roles/responsibilities.",
                "Risk management: explaining risk identification, assessment, analysis, register, tolerance, appetite, strategies, reporting, and business impact analysis (BIA).",
                "Third-party risk: managing vendor assessment, selection, agreements, monitoring, questionnaires, and rules of engagement.",
                "Security compliance: summarizing compliance reporting, consequences of non-compliance, monitoring, and privacy.",
                "Audits and assessments: explaining attestation, internal/external audits, and penetration testing.",
                "Security awareness: implementing phishing training, anomalous behavior recognition, user guidance, reporting, and monitoring."
            ],
            topics: [
                "5.1 Summarize elements of effective security governance.",
                "5.2 Explain elements of the risk management process.",
                "5.3 Explain the processes associated with third-party risk assessment and management.",
                "5.4 Summarize elements of effective security compliance.",
                "5.5 Explain types and purposes of audits and assessments.",
                "5.6 Given a scenario, implement security awareness practices."
            ]
        }
    ];

    // Populate objectives dropdown
    function populateObjectiveDropdown() {
        const select = document.getElementById('objective-dropdown');
        select.innerHTML = '';
        // Add 'All Objectives' option
        const allOption = document.createElement('option');
        allOption.value = '__ALL__';
        allOption.textContent = 'All Objectives';
        select.appendChild(allOption);
        officialObjectives.forEach((obj, i) => {
            const option = document.createElement('option');
            option.value = obj.key;
            option.textContent = obj.key;
            select.appendChild(option);
        });
    }

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
        // Hide previous button on first question, show and enable on others
        if (currentQuestionIndex === 0) {
            prevBtn.style.display = 'none';
        } else {
            prevBtn.style.display = 'block';
            prevBtn.disabled = false;
        }
        
        nextBtn.style.display = 'block';
        
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
        // Hide the toggle button when palette is open, show when closed
        if (bottomControls.classList.contains('open')) {
            paletteToggleBtn.style.display = 'none';
        } else {
            paletteToggleBtn.style.display = 'block';
        }
    });

    paletteCloseBtn.addEventListener('click', () => {
        bottomControls.classList.remove('open');
        paletteToggleBtn.style.display = 'block';
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
        // Get selected official objective
        const select = document.getElementById('objective-dropdown');
        const selectedKey = select.value;
        let filteredQuestions = allQuestions;
        if (selectedKey !== '__ALL__') {
            const selectedObj = officialObjectives.find(obj => obj.key === selectedKey);
            if (selectedObj) {
                filteredQuestions = allQuestions.filter(q => selectedObj.topics.includes(q.topic));
            }
        }
        if (filteredQuestions.length === 0) {
            alert('No questions found for the selected objective.');
            return;
        }
        questionsForCurrentQuiz = filteredQuestions.sort(() => Math.random() - 0.5).slice(0, num);
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

    readAloudBtn.addEventListener('click', () => {
        const text = questionText.textContent;
        if (text) {
            readAloud(text);
        }
    });

    async function readAloud(text) {
        try {
            readAloudBtn.disabled = true;
            readAloudBtn.classList.add('active');

            // Check if ElevenLabs API key is available first (prioritize high-quality voice)
            if (typeof config !== 'undefined' && config.elevenLabsApiKey) {
                // Use ElevenLabs for high-quality voice, browser speech synthesis for word highlighting
                const apiKey = config.elevenLabsApiKey;
                const voiceId = 'UgBBYS2sOqTuMpoF3BR0'; // Mark's voice ID
                const ttsUrl = `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`;

                const headers = {
                    'Content-Type': 'application/json',
                    'xi-api-key': apiKey,
                    'Accept': 'audio/mpeg'
                };

                const data = {
                    text: text,
                    model_id: 'eleven_monolingual_v1',
                    voice_settings: {
                        stability: 0.5,
                        similarity_boost: 0.5
                    }
                };

                // Get ElevenLabs audio
                const audioResponse = await fetch(ttsUrl, {
                    method: 'POST',
                    headers: headers,
                    body: JSON.stringify(data)
                });

                if (!audioResponse.ok) {
                    throw new Error(`Audio fetch failed with status: ${audioResponse.status}`);
                }

                const audioBlob = await audioResponse.blob();
                const audioUrl = URL.createObjectURL(audioBlob);

                // Prepare text for highlighting
                const originalText = questionText.textContent;
                const words = originalText.split(/(\s+)/).filter(word => word.trim().length > 0);
                questionText.innerHTML = originalText.split(/(\s+)/).map(part => 
                    part.trim().length > 0 ? `<span>${part}</span>` : part
                ).join('');
                const wordSpans = Array.from(questionText.querySelectorAll('span'));

                // Use browser speech synthesis silently for word boundaries, but play ElevenLabs audio
                const utterance = new SpeechSynthesisUtterance(text);
                utterance.volume = 0; // Mute the browser speech
                utterance.rate = 1.1; // Slightly faster to better match ElevenLabs timing

                const audio = new Audio(audioUrl);
                let currentWordIndex = 0;

                utterance.onboundary = (event) => {
                    if (event.name === 'word') {
                        // Remove highlight from previous word
                        if (currentWordIndex > 0 && wordSpans[currentWordIndex - 1]) {
                            wordSpans[currentWordIndex - 1].classList.remove('highlight');
                        }
                        
                        // Highlight current word
                        if (currentWordIndex < wordSpans.length && wordSpans[currentWordIndex]) {
                            wordSpans[currentWordIndex].classList.add('highlight');
                            currentWordIndex++;
                        }
                    }
                };

                // Start both audio and silent speech synthesis for timing
                audio.play();
                if ('speechSynthesis' in window) {
                    speechSynthesis.speak(utterance);
                }

                audio.onended = () => {
                    speechSynthesis.cancel(); // Stop the silent speech
                    wordSpans.forEach(span => span.classList.remove('highlight'));
                    readAloudBtn.disabled = false;
                    readAloudBtn.classList.remove('active');
                    questionText.innerHTML = originalText;
                };

                audio.onerror = () => {
                    speechSynthesis.cancel();
                    readAloudBtn.disabled = false;
                    readAloudBtn.classList.remove('active');
                    questionText.innerHTML = originalText;
                    alert('Error playing audio.');
                };

            } else if ('speechSynthesis' in window) {
                // Fallback to browser speech synthesis if no ElevenLabs API key
                const originalText = questionText.textContent;
                const words = originalText.split(/(\s+)/).filter(word => word.trim().length > 0);
                questionText.innerHTML = originalText.split(/(\s+)/).map(part => 
                    part.trim().length > 0 ? `<span>${part}</span>` : part
                ).join('');
                const wordSpans = Array.from(questionText.querySelectorAll('span'));

                const utterance = new SpeechSynthesisUtterance(text);
                
                // Try to find a more natural voice
                const voices = speechSynthesis.getVoices();
                const preferredVoice = voices.find(voice => 
                    voice.name.includes('Google') || 
                    voice.name.includes('Microsoft') ||
                    voice.name.includes('Natural') ||
                    voice.name.includes('Enhanced')
                ) || voices.find(voice => voice.lang.startsWith('en')) || voices[0];
                
                if (preferredVoice) {
                    utterance.voice = preferredVoice;
                }
                
                utterance.rate = 0.9;
                utterance.pitch = 1;
                utterance.volume = 1;

                let currentWordIndex = 0;

                utterance.onboundary = (event) => {
                    if (event.name === 'word') {
                        // Remove highlight from previous word
                        if (currentWordIndex > 0 && wordSpans[currentWordIndex - 1]) {
                            wordSpans[currentWordIndex - 1].classList.remove('highlight');
                        }
                        
                        // Highlight current word
                        if (currentWordIndex < wordSpans.length && wordSpans[currentWordIndex]) {
                            wordSpans[currentWordIndex].classList.add('highlight');
                            currentWordIndex++;
                        }
                    }
                };

                utterance.onend = () => {
                    wordSpans.forEach(span => span.classList.remove('highlight'));
                    readAloudBtn.disabled = false;
                    readAloudBtn.classList.remove('active');
                    questionText.innerHTML = originalText;
                };

                utterance.onerror = () => {
                    readAloudBtn.disabled = false;
                    readAloudBtn.classList.remove('active');
                    questionText.innerHTML = originalText;
                    alert('Error with speech synthesis.');
                };

                speechSynthesis.speak(utterance);
            } else {
                throw new Error('Text-to-speech not supported in this browser');
            }

        } catch (error) {
            console.error('Error with text-to-speech:', error);
            alert(`Sorry, there was an error reading the question aloud: ${error.message}`);
            readAloudBtn.disabled = false;
            readAloudBtn.classList.remove('active');
            questionText.innerHTML = questionText.textContent;
        }
    }

    fetch('sy0-701-questions.json')
        .then(response => response.json())
        .then(data => {
            allQuestions = data.questions;
            populateObjectiveDropdown();
            initializeQuiz();
        });
});
