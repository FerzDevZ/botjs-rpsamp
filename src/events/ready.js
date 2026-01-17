const { Events, ActivityType } = require('discord.js');
const SAMPQuery = require('../services/SAMPQuery');
const Logger = require('../services/Logger');
const config = require('../config/app.config');

module.exports = {
    name: Events.ClientReady,
    once: true,
    async execute(client) {
        Logger.success(`Logged in as ${client.user.tag}!`);

        // Update Presence Loop
        const updatePresence = async () => {
            try {
                const data = await SAMPQuery.getServerStatus();
                client.user.setActivity(`${data.players}/${data.maxPlayers} Players`, { type: ActivityType.Playing });
            } catch (error) {
                client.user.setActivity('Server Offline', { type: ActivityType.Watching });
            }
        };

        updatePresence();
        setInterval(updatePresence, 30000);

        // Verify Guild
        const guild = client.guilds.cache.get(config.guildId);
        if (guild) {
            Logger.success(`Connected to Guild: ${guild.name}`);
        } else {
            Logger.warn(`Bot is NOT in the target Guild ID: ${config.guildId}`);
        }
    },
};
