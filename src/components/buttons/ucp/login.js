const { ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } = require('discord.js');

module.exports = {
    customId: 'btn_login',
    async execute(interaction) {
        const modal = new ModalBuilder()
            .setCustomId('modal_login')
            .setTitle('Cek Informasi Login');

        const ucpInput = new TextInputBuilder()
            .setCustomId('ucp_name')
            .setLabel('Masukkan Nama UCP')
            .setStyle(TextInputStyle.Short)
            .setRequired(true);

        const row = new ActionRowBuilder().addComponents(ucpInput);
        modal.addComponents(row);

        await interaction.showModal(modal);
    },
};
