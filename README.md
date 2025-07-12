# SY0-701 Security+ Quiz with Deepgram TTS

A comprehensive Security+ (SY0-701) quiz application with professional text-to-speech narration powered by Deepgram's Odysseus voice.

## Features

- 🎯 **Complete SY0-701 Coverage** - All Security+ domains and objectives
- 🔊 **Professional TTS** - Deepgram's Odysseus voice with word highlighting
- 📱 **Responsive Design** - Works on desktop, tablet, and mobile
- 🌙 **Dark Mode** - Eye-friendly dark theme
- 📊 **Progress Tracking** - Question palette and performance analytics
- 🚩 **Question Flagging** - Mark questions for review
- 📚 **Study Guide** - Integrated study materials

## Setup Instructions

### 1. Fork/Clone the Repository

```bash
git clone https://github.com/Dylanfe/Security---SY0-701.git
```

### 2. Set up Deepgram API Key in GitHub Secrets

1. **Get your Deepgram API Key:**
   - Go to [Deepgram Console](https://console.deepgram.com/)
   - Navigate to your project
   - Copy your API key

2. **Add to GitHub Secrets:**
   - Go to your GitHub repository
   - Click **Settings** → **Secrets and variables** → **Actions**
   - Click **New repository secret**
   - Name: `DEEPGRAM_API_KEY`
   - Value: Your Deepgram API key
   - Click **Add secret**

### 3. Enable GitHub Pages

1. Go to **Settings** → **Pages**
2. Source: **GitHub Actions**
3. The site will be deployed automatically when you push to `main`

The GitHub Action will:
- ✅ Inject your API key from secrets
- ✅ Deploy to GitHub Pages
- ✅ Keep your API key secure

## Local Development

For local development, create a `config.local.js` file (not committed to git):

```javascript
const DEEPGRAM_CONFIG = {
    apiKey: 'your-api-key-here',
    baseUrl: 'https://api.deepgram.com/v1/speak',
    model: 'aura-2-odysseus-en'
};

window.DEEPGRAM_CONFIG = DEEPGRAM_CONFIG;
```

Then update `index.html` to load this file:

```html
<script src="config.local.js"></script>
```

## File Structure

```
├── index.html              # Main quiz interface
├── script.js               # Quiz logic and functionality
├── deepgram-tts.js         # Deepgram TTS with word highlighting
├── config.js               # Configuration (API key injected by GitHub Actions)
├── tts-styles.css          # TTS styling and word highlighting
├── style.css               # Main application styles
├── study-guide.js          # Study guide content
├── study-guide-mode.js     # Study guide functionality
├── sy0-701-questions.json  # Question database
├── .github/workflows/deploy.yml  # GitHub Actions deployment
└── README.md               # This file
```

## Security Features

- 🔒 **API Key Protection** - Never exposed in repository
- 🚀 **GitHub Actions** - Secure deployment pipeline
- 🛡️ **Client-side Only** - No backend required
- 📦 **GitHub Pages** - Free hosting

## TTS Features

- 🎙️ **Odysseus Voice** - Professional male voice optimized for education
- 📍 **Word Highlighting** - Bold blue highlighting follows speech
- ⏯️ **Play/Pause/Stop** - Full audio control
- 📱 **Mobile Optimized** - Works on all devices
- 🎯 **Accurate Timing** - Smart word duration calculation

## Browser Compatibility

- ✅ Chrome/Chromium (recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Edge

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is for educational purposes. Please respect Deepgram's terms of service and API usage limits.

## Support

If you encounter issues:

1. Check that your Deepgram API key is correctly set in GitHub Secrets
2. Verify GitHub Pages is enabled
3. Check the Actions tab for deployment errors
4. Ensure you have sufficient Deepgram API credits

