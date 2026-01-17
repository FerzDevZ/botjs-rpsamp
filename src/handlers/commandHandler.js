const fs = require('fs');
const path = require('path');
const { REST, Routes } = require('discord.js');
const config = require('../config/app.config');
const Logger = require('../services/Logger');

module.exports = async (client) => {
    client.commands = new Map();
    const commandsArray = [];
    const commandsPath = path.join(__dirname, '../commands');

    const commandFolders = fs.readdirSync(commandsPath);

    for (const folder of commandFolders) {
        const folderPath = path.join(commandsPath, folder);
        if (!fs.lstatSync(folderPath).isDirectory()) continue;

        const commandFiles = fs.readdirSync(folderPath).filter(file => file.endsWith('.js'));
        for (const file of commandFiles) {
            const command = require(path.join(folderPath, file));
            if ('data' in command && 'execute' in command) {
                client.commands.set(command.data.name, command);
                commandsArray.push(command.data.toJSON());
                Logger.log(`Loaded Command: /${command.data.name}`);
            } else {
                Logger.warn(`The command at ${file} is missing "data" or "execute" property.`);
            }
        }
    }

    const rest = new REST({ version: '10' }).setToken(config.token);

    try {
        Logger.log('Started refreshing application (/) commands.');
        await rest.put(
            Routes.applicationGuildCommands(config.clientId, config.guildId),
            { body: commandsArray },
        );
        Logger.success('Successfully reloaded application (/) commands.');
    } catch (error) {
        if (error.code === 50001) {
            Logger.error('FATAL: MISSING ACCESS (50001). Re-invite bot with applications.commands scope!');
        } else {
            Logger.error('Failed to register commands:', error);
        }
    }
};
