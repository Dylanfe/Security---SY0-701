// Configuration file for the Security+ Quiz Application
// This file safely references environment variables without exposing secrets

const config = {
    // ElevenLabs API key - will be injected at build time by GitHub Actions
    elevenLabsApiKey: process.env.ELEVENLABS_API_KEY || window.ELEVENLABS_API_KEY || null
};

// For development: you can create a config.local.js file with your API key
// and it will be ignored by git due to .gitignore
try {
    if (typeof configLocal !== 'undefined') {
        Object.assign(config, configLocal);
    }
} catch (e) {
    // No local config found, using defaults
}
