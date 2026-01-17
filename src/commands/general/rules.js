const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('rules')
        .setDescription('Baca peraturan dasar server'),
    async execute(interaction) {
        const embed = new EmbedBuilder()
            .setTitle('📜 Server Rules (Singkat)')
            .setColor(0xFFFFFF)
            .setDescription('1. **Dilarang Cheating/Hacking** (Ban Permanen)\n2. **Hormati Player Lain** (No SARA/Toxic)\n3. **Metagaming & Powergaming** Dilarang keras.\n4. **Roleplay Properly**: Gunakan /me dan /do dengan benar.\n\n*Baca rules lengkap di channel #rules*');
        await interaction.reply({ embeds: [embed] });
    },
};
