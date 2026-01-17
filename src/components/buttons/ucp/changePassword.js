const { ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } = require('discord.js');

module.exports = {
    customId: 'btn_change_pw',
    async execute(interaction) {
        const modal = new ModalBuilder()
            .setCustomId('modal_changepw')
            .setTitle('Ganti Password UCP');

        const pwInput = new TextInputBuilder()
            .setCustomId('new_pw')
            .setLabel('Password Baru')
            .setStyle(TextInputStyle.Short)
            .setRequired(true);

        const row = new ActionRowBuilder().addComponents(pwInput);
        modal.addComponents(row);

        await interaction.showModal(modal);
    },
};
