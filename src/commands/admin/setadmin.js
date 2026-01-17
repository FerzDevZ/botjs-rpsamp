const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const db = require('../../services/Database');
const config = require('../../config/app.config');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('setadmin')
        .setDescription('Set admin level for a character (Admin Only)')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addStringOption(option =>
            option.setName('charname')
                .setDescription('The name of the character (e.g., First_Last)')
                .setRequired(true))
        .addIntegerOption(option =>
            option.setName('level')
                .setDescription('Admin level (0-7)')
                .setRequired(true)),
    async execute(interaction) {
        if (!interaction.member.roles.cache.has(config.adminRoleId)) {
            return interaction.reply({ content: '❌ Access Denied.', ephemeral: true });
        }

        const charName = interaction.options.getString('charname');
        const level = interaction.options.getInteger('level');

        try {
            const result = await db.query(
                `UPDATE ${config.schema.charTable} SET ${config.schema.charColumns.admin} = ? WHERE ${config.schema.charColumns.name} = ?`,
                [level, charName]
            );

            if (result.affectedRows === 0) return interaction.reply({ content: '❌ Karakter tidak ditemukan!', ephemeral: true });

            await interaction.reply({ content: `✅ Admin level \`${charName}\` diubah ke ${level}.` });
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: '❌ Gagal update database.', ephemeral: true });
        }
    },
};
