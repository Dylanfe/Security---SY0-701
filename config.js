// Configuration file for the Security+ Quiz Application
// Basic configuration without external API dependencies

const config = {
    // Application settings can be added here as needed
};

// For development: you can create a config.local.js file with local settings
// and it will be ignored by git due to .gitignore
try {
    if (typeof configLocal !== 'undefined') {
        Object.assign(config, configLocal);
    }
} catch (e) {
    // No local config found, using defaults
}
