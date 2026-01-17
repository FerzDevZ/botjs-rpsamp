const { ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } = require('discord.js');

module.exports = {
    customId: 'btn_register',
    async execute(interaction) {
        const modal = new ModalBuilder()
            .setCustomId('modal_register')
            .setTitle('Pendaftaran UCP Baru');

        const ucpInput = new TextInputBuilder()
            .setCustomId('ucp_name')
            .setLabel('Nama UCP (Tanpa Spasi)')
            .setStyle(TextInputStyle.Short)
            .setRequired(true);

        const row = new ActionRowBuilder().addComponents(ucpInput);
        modal.addComponents(row);

        await interaction.showModal(modal);
    },
};
