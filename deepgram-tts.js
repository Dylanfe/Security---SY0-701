
class DeepgramTTS {
    constructor(textContainer, playButton, voiceSelect) {
        this.textContainer = textContainer;
        this.playButton = playButton;
        this.voiceSelect = voiceSelect;
        
        // Deepgram configuration from config.js
        this.apiKey = window.DEEPGRAM_CONFIG?.apiKey || '';
        this.baseUrl = window.DEEPGRAM_CONFIG?.baseUrl || 'https://api.deepgram.com/v1/speak';
        
        this.originalText = '';
        this.wordSpans = [];
        this.audioElement = null;
        this.isPlaying = false;
        this.isPaused = false;
        this.currentWordIndex = 0;
        this.wordTimings = [];
        this.highlightInterval = null;
        
        // Single Deepgram voice - Odysseus
        this.defaultVoice = window.DEEPGRAM_CONFIG?.model || 'aura-2-odysseus-en';
        this.voiceInfo = {
            name: 'Odysseus',
            model: 'aura-2-odysseus-en',
            language: 'en-US',
            gender: 'male',
            description: 'masculine, calm, smooth, comfortable, professional'
        };
    }

    init() {
        this._populateVoiceSelect();
        this._setupEventListeners();
        console.log('Deepgram TTS initialized successfully');
    }

    _populateVoiceSelect() {
        if (!this.voiceSelect) return;

        this.voiceSelect.innerHTML = '';
        
        // Single voice option - Odysseus
        const option = document.createElement('option');
        option.value = this.defaultVoice;
        option.textContent = `${this.voiceInfo.name} (American) - ${this.voiceInfo.description}`;
        option.setAttribute('data-language', this.voiceInfo.language);
        option.setAttribute('data-gender', this.voiceInfo.gender);
        option.selected = true;
        this.voiceSelect.appendChild(option);
        
        // Disable the select since there's only one option
        this.voiceSelect.disabled = true;
        this.voiceSelect.style.opacity = '0.7';
        this.voiceSelect.title = 'Using Odysseus voice - professional quality for quiz narration';
    }

    _setupEventListeners() {
        if (this.playButton) {
            this.playButton.addEventListener('click', () => {
                if (this.isPlaying && !this.isPaused) {
                    this.pause();
                } else if (this.isPaused) {
                    this.resume();
                } else {
                    this.play();
                }
            });
        }

        if (this.voiceSelect) {
            this.voiceSelect.addEventListener('change', () => {
                if (this.isPlaying) {
                    this.stop();
                }
            });
        }
    }

    _prepareText(text) {
        this.originalText = text;
        
        // Store the original DOM content
        this.originalHTML = this.textContainer.innerHTML;
        
        // Clear and create word spans for highlighting
        this.textContainer.innerHTML = '';
        
        // Split text into words while preserving spaces and punctuation
        const words = text.split(/(\s+)/).filter(part => part.trim().length > 0);
        this.wordSpans = [];
        
        words.forEach((word, index) => {
            const span = document.createElement('span');
            span.textContent = word;
            span.className = 'deepgram-word';
            span.setAttribute('data-word-index', index);
            this.textContainer.appendChild(span);
            this.wordSpans.push(span);
            
            // Add space after each word (except the last)
            if (index < words.length - 1) {
                this.textContainer.appendChild(document.createTextNode(' '));
            }
        });
    }

    async play(text = null) {
        if (text) {
            this._prepareText(text);
        } else if (this.isPaused) {
            this.resume();
            return;
        } else {
            // Get the current text from the container each time
            const textToSpeak = this.textContainer.textContent;
            if (!textToSpeak.trim()) {
                console.warn('No text available to speak');
                return;
            }
            this._prepareText(textToSpeak);
        }

        // Check if API key is available
        if (!this.apiKey || this.apiKey === '${DEEPGRAM_API_KEY}') {
            console.error('Deepgram API key not configured');
            alert('Deepgram API key not configured. This feature requires deployment with GitHub Actions to inject the API key securely.');
            return;
        }

        try {
            this._updateButtonState('loading');
            
            // Use Odysseus voice
            const selectedVoice = this.defaultVoice;
            
            // Generate speech with Deepgram
            const audioBlob = await this._generateSpeech(this.originalText, selectedVoice);
            
            // Create audio element
            this.audioElement = new Audio();
            this.audioElement.src = URL.createObjectURL(audioBlob);
            
            // Set up audio event listeners
            this.audioElement.addEventListener('loadeddata', () => {
                this._startWordHighlighting();
                this.audioElement.play();
                this.isPlaying = true;
                this.isPaused = false;
                this._updateButtonState('pause');
            });

            this.audioElement.addEventListener('ended', () => {
                this._onEnd();
            });

            this.audioElement.addEventListener('error', (e) => {
                console.error('Audio playback error:', e);
                this._onEnd();
            });

        } catch (error) {
            console.error('Deepgram TTS Error:', error);
            this._updateButtonState('play');
            alert('Error generating speech. Please try again.');
        }
    }

    pause() {
        if (this.audioElement && this.isPlaying) {
            this.audioElement.pause();
            this.isPaused = true;
            this._updateButtonState('resume');
            this._stopWordHighlighting();
        }
    }

    resume() {
        if (this.audioElement && this.isPaused) {
            this.audioElement.play();
            this.isPaused = false;
            this._updateButtonState('pause');
            this._startWordHighlighting();
        }
    }

    stop() {
        if (this.audioElement) {
            this.audioElement.pause();
            this.audioElement.currentTime = 0;
        }
        this._onEnd();
    }

    async _generateSpeech(text, voice) {
        const requestBody = {
            text: text
        };

        console.log('Deepgram request:', requestBody);
        console.log('Using voice model:', voice);

        const url = `${this.baseUrl}?model=${voice}&encoding=linear16&sample_rate=24000`;

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': `Token ${this.apiKey}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody),
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Deepgram API error response:', errorText);
            throw new Error(`Deepgram API error: ${response.status} ${response.statusText} - ${errorText}`);
        }

        return await response.blob();
    }

    _startWordHighlighting() {
        // Calculate word timings based on word length and complexity
        const words = this.originalText.split(/\s+/).filter(word => word.trim().length > 0);
        
        if (!this.audioElement || words.length === 0) return;
        
        // Wait for duration to be available
        const startHighlighting = () => {
            const duration = this.audioElement.duration;
            if (!duration || duration === Infinity) {
                setTimeout(startHighlighting, 100);
                return;
            }
            
            // Calculate individual word timings based on word characteristics
            const wordTimings = this._calculateWordTimings(words, duration);
            
            this.currentWordIndex = 0;
            this._clearHighlights();
            
            // Start with first word immediately
            if (this.wordSpans[0]) {
                this.wordSpans[0].classList.add('deepgram-highlight');
            }
            
            // Track audio progress more frequently for accuracy
            this.highlightInterval = setInterval(() => {
                if (!this.audioElement || this.audioElement.paused) {
                    return;
                }

                const currentTime = this.audioElement.currentTime;
                
                // Find the word that should be highlighted at current time
                let targetWordIndex = -1;
                for (let i = 0; i < wordTimings.length; i++) {
                    if (currentTime >= wordTimings[i].start && currentTime < wordTimings[i].end) {
                        targetWordIndex = i;
                        break;
                    }
                }
                
                // Update highlighting if word changed
                if (targetWordIndex !== -1 && targetWordIndex !== this.currentWordIndex) {
                    this._clearHighlights();
                    this.currentWordIndex = targetWordIndex;
                    
                    if (this.wordSpans[this.currentWordIndex]) {
                        this.wordSpans[this.currentWordIndex].classList.add('deepgram-highlight');
                        
                        // Scroll into view smoothly
                        this.wordSpans[this.currentWordIndex].scrollIntoView({
                            behavior: 'smooth',
                            block: 'center',
                            inline: 'nearest'
                        });
                    }
                }
            }, 50); // Check every 50ms for better accuracy
        };
        
        startHighlighting();
    }

    _calculateWordTimings(words, totalDuration) {
        const timings = [];
        let currentTime = 0;
        
        // Calculate relative weights for each word based on characteristics
        const wordWeights = words.map(word => {
            let weight = word.length; // Base weight on character count
            
            // Add weight for syllables (rough estimation)
            const syllables = word.toLowerCase().replace(/[^aeiou]/g, '').length || 1;
            weight += syllables * 0.3;
            
            // Add weight for complex words (longer words take more time)
            if (word.length > 8) weight += 2;
            if (word.length > 12) weight += 3;
            
            // Add weight for punctuation (pauses)
            if (/[.!?]$/.test(word)) weight += 2;
            if (/[,;:]$/.test(word)) weight += 1;
            
            return Math.max(weight, 0.5); // Minimum weight
        });
        
        const totalWeight = wordWeights.reduce((sum, weight) => sum + weight, 0);
        
        // Distribute time based on weights
        words.forEach((word, index) => {
            const wordDuration = (wordWeights[index] / totalWeight) * totalDuration;
            const startTime = currentTime;
            const endTime = currentTime + wordDuration;
            
            timings.push({
                word: word,
                start: startTime,
                end: endTime,
                duration: wordDuration
            });
            
            currentTime = endTime;
        });
        
        return timings;
    }

    _stopWordHighlighting() {
        if (this.highlightInterval) {
            clearInterval(this.highlightInterval);
            this.highlightInterval = null;
        }
    }

    _clearHighlights() {
        this.wordSpans.forEach(span => {
            span.classList.remove('deepgram-highlight');
        });
    }

    _onEnd() {
        this.isPlaying = false;
        this.isPaused = false;
        this.currentWordIndex = 0;
        this._clearHighlights();
        this._stopWordHighlighting();
        this._updateButtonState('play');
        
        // Clean up audio element
        if (this.audioElement) {
            URL.revokeObjectURL(this.audioElement.src);
            this.audioElement = null;
        }
        
        // Restore original HTML content
        if (this.originalHTML) {
            this.textContainer.innerHTML = this.originalHTML;
        }
        
        // Clear stored references
        this.originalText = '';
        this.originalHTML = '';
        this.wordSpans = [];
    }

    _updateButtonState(state) {
        if (!this.playButton) return;
        
        const button = this.playButton;
        
        switch (state) {
            case 'play':
                button.disabled = false;
                button.classList.remove('active');
                button.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-volume-2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>`;
                button.title = "Read question aloud";
                break;
            case 'pause':
                button.disabled = false;
                button.classList.add('active');
                button.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>`;
                button.title = "Pause reading";
                break;
            case 'resume':
                button.disabled = false;
                button.classList.add('active');
                button.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="5,3 19,12 5,21"></polygon></svg>`;
                button.title = "Resume reading";
                break;
            case 'loading':
                button.disabled = true;
                button.classList.add('active');
                button.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle></svg>`;
                button.title = "Generating speech...";
                break;
        }
    }

    // Public methods
    isSupported() {
        return true; // Deepgram works in all modern browsers
    }

    getVoiceInfo() {
        return {
            totalVoices: 1,
            provider: 'Deepgram',
            currentVoice: this.voiceInfo.name,
            voiceModel: this.voiceInfo.model,
            voiceDescription: this.voiceInfo.description,
            apiStatus: 'Connected'
        };
    }
}

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = DeepgramTTS;
} else {
    window.DeepgramTTS = DeepgramTTS;
}
