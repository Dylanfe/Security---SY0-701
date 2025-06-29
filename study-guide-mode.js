// Study Guide Mode Functionality
document.addEventListener('DOMContentLoaded', () => {
    // Study Guide Elements
    const quizModeBtn = document.getElementById('quiz-mode-btn');
    const studyGuideModeBtn = document.getElementById('study-guide-mode-btn');
    const studyGuideMode = document.getElementById('study-guide-mode');
    const quizSetup = document.getElementById('quiz-setup');
    const progressContainer = document.getElementById('progress-container');
    const quizContainer = document.getElementById('quiz-container');
    const resultsContainer = document.getElementById('results-container');
    const navigationButtons = document.getElementById('navigation-buttons');
    const bottomControls = document.querySelector('.bottom-controls');
    
    // Study Guide Specific Elements
    const studyNavTree = document.getElementById('study-nav-tree');
    const studyGuideContentMain = document.getElementById('study-guide-content-main');
    const studySearch = document.getElementById('study-search');
    const searchBtn = document.getElementById('search-btn');
    const studiedCount = document.getElementById('studied-count');
    const totalObjectives = document.getElementById('total-objectives');
    
    // Toolbar buttons
    const bookmarkBtn = document.getElementById('bookmark-btn');
    const notesBtn = document.getElementById('notes-btn');
    const markStudiedBtn = document.getElementById('mark-studied-btn');
    const printBtn = document.getElementById('print-btn');
    const studyNotesPanel = document.getElementById('study-notes-panel');
    const studyNotesText = document.getElementById('study-notes-text');
    const saveNotesBtn = document.getElementById('save-notes-btn');
    const closeNotesBtn = document.getElementById('close-notes-btn');

    // Study Guide State
    let currentMode = 'quiz';
    let currentObjective = null;
    let studiedObjectives = JSON.parse(localStorage.getItem('studiedObjectives') || '[]');
    let bookmarkedObjectives = JSON.parse(localStorage.getItem('bookmarkedObjectives') || '[]');
    let objectiveNotes = JSON.parse(localStorage.getItem('objectiveNotes') || '{}');

    // Initialize
    initializeStudyGuide();

    function initializeStudyGuide() {
        renderNavigationTree();
        updateProgress();
        
        // Set total objectives count
        const totalCount = Object.values(studyGuideStructure).reduce((sum, domain) => 
            sum + domain.objectives.length, 0);
        totalObjectives.textContent = totalCount;
    }

    // Mode Switching
    quizModeBtn.addEventListener('click', () => switchToQuizMode());
    studyGuideModeBtn.addEventListener('click', () => switchToStudyGuideMode());

    function switchToQuizMode() {
        currentMode = 'quiz';
        quizModeBtn.classList.add('active');
        studyGuideModeBtn.classList.remove('active');
        
        studyGuideMode.style.display = 'none';
        quizSetup.style.display = 'block';
        progressContainer.style.display = 'none';
        quizContainer.style.display = 'none';
        resultsContainer.style.display = 'none';
        navigationButtons.style.display = 'flex';
        bottomControls.style.display = 'none';
        
        document.body.classList.remove('quiz-active');
        document.querySelector('.container').classList.remove('study-guide-active');
    }

    function switchToStudyGuideMode() {
        currentMode = 'study-guide';
        studyGuideModeBtn.classList.add('active');
        quizModeBtn.classList.remove('active');
        
        quizSetup.style.display = 'none';
        progressContainer.style.display = 'none';
        quizContainer.style.display = 'none';
        resultsContainer.style.display = 'none';
        navigationButtons.style.display = 'none';
        bottomControls.style.display = 'none';
        studyGuideMode.style.display = 'block';
        
        document.body.classList.remove('quiz-active');
        document.querySelector('.container').classList.add('study-guide-active');
        
        // Show welcome screen if no objective is selected
        if (!currentObjective) {
            showWelcomeScreen();
        }
    }

    function renderNavigationTree() {
        studyNavTree.innerHTML = '';
        
        Object.entries(studyGuideStructure).forEach(([domainKey, domain]) => {
            const domainItem = document.createElement('div');
            domainItem.className = 'domain-item';
            
            const domainHeader = document.createElement('div');
            domainHeader.className = 'domain-header';
            domainHeader.innerHTML = `
                <span>${domainKey}: ${domain.title}</span>
                <span class="domain-toggle">▶</span>
            `;
            
            const objectivesList = document.createElement('div');
            objectivesList.className = 'objectives-list';
            
            domain.objectives.forEach(objective => {
                const objectiveItem = document.createElement('div');
                objectiveItem.className = 'objective-item';
                if (studiedObjectives.includes(objective)) {
                    objectiveItem.classList.add('studied');
                }
                if (currentObjective === objective) {
                    objectiveItem.classList.add('active');
                }
                
                const objectiveNumber = objective.split(' ')[0];
                const objectiveTitle = objective.substring(objective.indexOf(' ') + 1);
                
                objectiveItem.innerHTML = `
                    <span>${objectiveNumber}<br><small>${objectiveTitle}</small></span>
                    <span class="objective-status">
                        ${studiedObjectives.includes(objective) ? '✓' : ''}
                        ${bookmarkedObjectives.includes(objective) ? '📖' : ''}
                    </span>
                `;
                
                objectiveItem.addEventListener('click', () => {
                    loadObjective(objective);
                });
                
                objectivesList.appendChild(objectiveItem);
            });
            
            domainHeader.addEventListener('click', () => {
                domainHeader.classList.toggle('expanded');
                objectivesList.classList.toggle('expanded');
            });
            
            domainItem.appendChild(domainHeader);
            domainItem.appendChild(objectivesList);
            studyNavTree.appendChild(domainItem);
        });
    }

    function loadObjective(objective) {
        currentObjective = objective;
        
        // Update navigation active state
        document.querySelectorAll('.objective-item').forEach(item => {
            item.classList.remove('active');
        });
        
        // Find and highlight current objective
        const objectiveItems = document.querySelectorAll('.objective-item');
        objectiveItems.forEach(item => {
            if (item.textContent.includes(objective.split(' ')[0])) {
                item.classList.add('active');
            }
        });
        
        // Load content
        if (studyGuideData[objective]) {
            studyGuideContentMain.innerHTML = `
                <div class="study-content">
                    ${studyGuideData[objective]}
                </div>
            `;
            highlightKeyTerms();
        } else {
            studyGuideContentMain.innerHTML = `
                <div class="study-content">
                    <h3>${objective}</h3>
                    <p>Content for this objective is being prepared. Please check back later.</p>
                </div>
            `;
        }
        
        // Update toolbar buttons
        updateToolbarState();
        
        // Load notes if they exist
        if (objectiveNotes[objective]) {
            studyNotesText.value = objectiveNotes[objective];
        } else {
            studyNotesText.value = '';
        }
    }

    function showWelcomeScreen() {
        const welcomeContent = document.querySelector('.study-guide-welcome');
        if (welcomeContent) {
            studyGuideContentMain.innerHTML = welcomeContent.outerHTML;
            
            // Add click handlers to domain cards
            document.querySelectorAll('.domain-card').forEach(card => {
                card.addEventListener('click', () => {
                    const domainNumber = card.dataset.domain;
                    const domainKey = `Domain ${domainNumber}.0`;
                    
                    // Expand the corresponding domain in navigation
                    const domainHeaders = document.querySelectorAll('.domain-header');
                    domainHeaders.forEach(header => {
                        if (header.textContent.includes(domainKey)) {
                            header.classList.add('expanded');
                            header.nextElementSibling.classList.add('expanded');
                        }
                    });
                });
            });
        }
        currentObjective = null;
        updateToolbarState();
    }

    function updateToolbarState() {
        if (!currentObjective) {
            bookmarkBtn.classList.remove('active');
            markStudiedBtn.classList.remove('active');
            bookmarkBtn.disabled = true;
            markStudiedBtn.disabled = true;
            notesBtn.disabled = true;
            printBtn.disabled = true;
        } else {
            bookmarkBtn.disabled = false;
            markStudiedBtn.disabled = false;
            notesBtn.disabled = false;
            printBtn.disabled = false;
            
            if (bookmarkedObjectives.includes(currentObjective)) {
                bookmarkBtn.classList.add('active');
            } else {
                bookmarkBtn.classList.remove('active');
            }
            
            if (studiedObjectives.includes(currentObjective)) {
                markStudiedBtn.classList.add('active');
            } else {
                markStudiedBtn.classList.remove('active');
            }
        }
    }

    function updateProgress() {
        studiedCount.textContent = studiedObjectives.length;
        renderNavigationTree(); // Refresh to show updated status
    }

    function highlightKeyTerms() {
        // This would highlight key security terms in the content
        const content = studyGuideContentMain.querySelector('.study-content');
        if (!content) return;
        
        const keyTerms = [
            'CIA Triad', 'Authentication', 'Authorization', 'Accounting', 'Firewall',
            'Encryption', 'VPN', 'IDS', 'IPS', 'SIEM', 'PKI', 'MFA', 'Zero Trust',
            'DLP', 'EDR', 'XDR', 'NGFW', 'WAF', 'HSM', 'TPM', 'RADIUS', 'LDAP',
            'SAML', 'OAuth', 'TLS', 'IPSec', 'AES', 'RSA', 'SHA', 'MD5'
        ];
        
        let html = content.innerHTML;
        keyTerms.forEach(term => {
            const regex = new RegExp(`\\b(${term})\\b`, 'gi');
            html = html.replace(regex, '<span class="key-term">$1</span>');
        });
        content.innerHTML = html;
    }

    // Search functionality
    searchBtn.addEventListener('click', performSearch);
    studySearch.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            performSearch();
        }
    });

    function performSearch() {
        const searchTerm = studySearch.value.toLowerCase().trim();
        if (!searchTerm) return;
        
        let results = [];
        
        Object.entries(studyGuideData).forEach(([objective, content]) => {
            if (content.toLowerCase().includes(searchTerm) || 
                objective.toLowerCase().includes(searchTerm)) {
                results.push(objective);
            }
        });
        
        if (results.length > 0) {
            // Load first result
            loadObjective(results[0]);
            
            // Show search results summary
            const resultSummary = document.createElement('div');
            resultSummary.className = 'search-results';
            resultSummary.innerHTML = `
                <h4>Search Results for "${searchTerm}" (${results.length} found)</h4>
                <ul>
                    ${results.map(result => `
                        <li><a href="#" onclick="loadObjective('${result}')">${result}</a></li>
                    `).join('')}
                </ul>
            `;
            
            studyGuideContentMain.insertBefore(resultSummary, studyGuideContentMain.firstChild);
        } else {
            alert(`No results found for "${searchTerm}"`);
        }
    }

    // Toolbar functionality
    bookmarkBtn.addEventListener('click', () => {
        if (!currentObjective) return;
        
        if (bookmarkedObjectives.includes(currentObjective)) {
            bookmarkedObjectives = bookmarkedObjectives.filter(obj => obj !== currentObjective);
        } else {
            bookmarkedObjectives.push(currentObjective);
        }
        
        localStorage.setItem('bookmarkedObjectives', JSON.stringify(bookmarkedObjectives));
        updateToolbarState();
        renderNavigationTree();
    });

    markStudiedBtn.addEventListener('click', () => {
        if (!currentObjective) return;
        
        if (studiedObjectives.includes(currentObjective)) {
            studiedObjectives = studiedObjectives.filter(obj => obj !== currentObjective);
        } else {
            studiedObjectives.push(currentObjective);
        }
        
        localStorage.setItem('studiedObjectives', JSON.stringify(studiedObjectives));
        updateToolbarState();
        updateProgress();
    });

    notesBtn.addEventListener('click', () => {
        if (!currentObjective) return;
        
        if (studyNotesPanel.style.display === 'none' || !studyNotesPanel.style.display) {
            studyNotesPanel.style.display = 'block';
            notesBtn.classList.add('active');
        } else {
            studyNotesPanel.style.display = 'none';
            notesBtn.classList.remove('active');
        }
    });

    printBtn.addEventListener('click', () => {
        if (!currentObjective) return;
        
        const printContent = studyGuideContentMain.innerHTML;
        const printWindow = window.open('', '_blank');
        printWindow.document.write(`
            <html>
                <head>
                    <title>${currentObjective}</title>
                    <style>
                        body { font-family: Arial, sans-serif; margin: 20px; }
                        h3, h4, h5 { color: #2c3e50; }
                        ul, ol { margin-left: 20px; }
                        .key-term { background-color: #3498db; color: white; padding: 2px 5px; border-radius: 3px; }
                    </style>
                </head>
                <body>
                    ${printContent}
                </body>
            </html>
        `);
        printWindow.document.close();
        printWindow.print();
    });

    // Notes functionality
    saveNotesBtn.addEventListener('click', () => {
        if (!currentObjective) return;
        
        const notes = studyNotesText.value.trim();
        if (notes) {
            objectiveNotes[currentObjective] = notes;
        } else {
            delete objectiveNotes[currentObjective];
        }
        
        localStorage.setItem('objectiveNotes', JSON.stringify(objectiveNotes));
        alert('Notes saved successfully!');
    });

    closeNotesBtn.addEventListener('click', () => {
        studyNotesPanel.style.display = 'none';
        notesBtn.classList.remove('active');
    });

    // Make loadObjective globally available for search results
    window.loadObjective = loadObjective;
});
