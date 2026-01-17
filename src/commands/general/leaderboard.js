const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const db = require('../../services/Database');
const config = require('../../config/app.config');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('leaderboard')
        .setDescription('Lihat 10 pemain terkaya di server'),
    async execute(interaction) {
        try {
            const res = await db.query(
                `SELECT ${config.schema.charColumns.name}, ${config.schema.charColumns.money} FROM ${config.schema.charTable} ORDER BY ${config.schema.charColumns.money} DESC LIMIT 10`
            );

            const list = res.map((p, i) => `**#${i + 1}** ${p[config.schema.charColumns.name]} - 💲${p[config.schema.charColumns.money]}`).join('\n');

            const embed = new EmbedBuilder()
                .setTitle('🏆 Top 10 Richest Players')
                .setColor(0xFFD700)
                .setDescription(list || 'Belum ada data.');

            await interaction.reply({ embeds: [embed] });
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: '❌ Gagal memuat leaderboard.', ephemeral: true });
        }
    },
};
