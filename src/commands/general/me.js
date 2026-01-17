const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const db = require('../../services/Database');
const config = require('../../config/app.config');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('me')
        .setDescription('Cek stats karakter kamu sendiri (Wajib sudah link Discord)'),
    async execute(interaction) {
        try {
            // Find UCP linked to Discord ID
            const ucpRes = await db.query(
                `SELECT ${config.schema.ucpColumns.name} FROM ${config.schema.ucpTable} WHERE ${config.schema.ucpColumns.discordId} = ?`,
                [interaction.user.id]
            );

            if (ucpRes.length === 0) {
                return interaction.reply({ content: '❌ Kamu belum mendaftar UCP! Silahkan daftar di channel UCP.', ephemeral: true });
            }

            const ucpName = ucpRes[0][config.schema.ucpColumns.name];

            // Get Main Character (Limit 1)
            const charRes = await db.query(
                `SELECT * FROM ${config.schema.charTable} WHERE ${config.schema.charColumns.ucp} = ? LIMIT 1`,
                [ucpName]
            );

            if (charRes.length === 0) {
                return interaction.reply({ content: `✅ UCP: **${ucpName}** terdaftar, tapi belum ada karakter. Login ingame untuk buat karakter!`, ephemeral: true });
            }

            const char = charRes[0];
            const embed = new EmbedBuilder()
                .setTitle(`👤 Character Info: ${char[config.schema.charColumns.name]}`)
                .setColor(0x00AAFF)
                .setThumbnail(interaction.user.displayAvatarURL())
                .addFields(
                    { name: 'UCP Account', value: `\`${ucpName}\``, inline: true },
                    { name: 'Level', value: `\`${char[config.schema.charColumns.level]}\``, inline: true },
                    { name: 'Money', value: `\`$${char[config.schema.charColumns.money]}\``, inline: true },
                    { name: 'Last Login', value: `<t:${Math.floor(Date.now() / 1000)}:R>`, inline: false }
                );

            await interaction.reply({ embeds: [embed] });
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: '❌ Error mengambil data.', ephemeral: true });
        }
    },
};
