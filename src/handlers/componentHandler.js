const fs = require('fs');
const path = require('path');
const Logger = require('../services/Logger');

module.exports = (client) => {
    client.buttons = new Map();
    client.modals = new Map();

    // Load Buttons
    const buttonsPath = path.join(__dirname, '../components/buttons');
    if (fs.existsSync(buttonsPath)) {
        const buttonFiles = fs.readdirSync(buttonsPath).filter(file => file.endsWith('.js'));
        for (const file of buttonFiles) {
            const button = require(path.join(buttonsPath, file));
            client.buttons.set(button.customId, button);
            Logger.log(`Loaded Button: ${button.customId}`);
        }
    }

    // Load Modals
    const modalsPath = path.join(__dirname, '../components/modals');
    if (fs.existsSync(modalsPath)) {
        const modalFiles = fs.readdirSync(modalsPath).filter(file => file.endsWith('.js'));
        for (const file of modalFiles) {
            const modal = require(path.join(modalsPath, file));
            client.modals.set(modal.customId, modal);
            Logger.log(`Loaded Modal: ${modal.customId}`);
        }
    }
};
