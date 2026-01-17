const { Events } = require('discord.js');
const Logger = require('../services/Logger');

module.exports = {
    name: Events.InteractionCreate,
    async execute(interaction) {
        if (interaction.isChatInputCommand()) {
            const command = interaction.client.commands.get(interaction.commandName);
            if (!command) return;

            try {
                await command.execute(interaction);
            } catch (error) {
                Logger.error(`Error executing command ${interaction.commandName}`, error);
                if (interaction.replied || interaction.deferred) {
                    await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
                } else {
                    await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
                }
            }
        } else if (interaction.isButton()) {
            const button = interaction.client.buttons.get(interaction.customId);
            if (!button) return; // Silent return for unknown buttons

            try {
                await button.execute(interaction);
            } catch (error) {
                Logger.error(`Error executing button ${interaction.customId}`, error);
                await interaction.reply({ content: 'Button Error.', ephemeral: true }).catch(() => { });
            }
        } else if (interaction.isModalSubmit()) {
            const modal = interaction.client.modals.get(interaction.customId);
            if (!modal) return;

            try {
                await modal.execute(interaction);
            } catch (error) {
                Logger.error(`Error executing modal ${interaction.customId}`, error);
                await interaction.reply({ content: 'Modal Error.', ephemeral: true }).catch(() => { });
            }
        }
    },
};
