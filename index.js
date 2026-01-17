require('dotenv').config();
const { Client, GatewayIntentBits, Partials } = require('discord.js');
const config = require('./src/config/app.config');
const Logger = require('./src/services/Logger');
const loadCommands = require('./src/handlers/commandHandler');
const loadEvents = require('./src/handlers/eventHandler');
const loadComponents = require('./src/handlers/componentHandler');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.DirectMessages
    ],
    partials: [Partials.Channel, Partials.Message, Partials.User],
});

// Initialize Handlers
(async () => {
    Logger.log('Starting Bot...');

    // Load Modules
    loadComponents(client);
    loadEvents(client);
    await loadCommands(client);

    // Login
    client.login(config.token).catch(err => {
        Logger.error('Login Failed:', err);
    });
})();
