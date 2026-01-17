const { ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } = require('discord.js');

module.exports = {
    customId: 'btn_reroll',
    async execute(interaction) {
        const modal = new ModalBuilder()
            .setCustomId('modal_reroll')
            .setTitle('Hapus Karakter Permanen');

        const charInput = new TextInputBuilder()
            .setCustomId('char_name')
            .setLabel('Nama Karakter yg dihapus')
            .setStyle(TextInputStyle.Short)
            .setRequired(true);

        const row = new ActionRowBuilder().addComponents(charInput);
        modal.addComponents(row);

        await interaction.showModal(modal);
    },
};
