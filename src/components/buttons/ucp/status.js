const db = require('../../../services/Database');
const config = require('../../../config/app.config');

module.exports = {
    customId: 'btn_status',
    async execute(interaction) {
        try {
            const results = await db.query(
                `SELECT ${config.schema.ucpColumns.name}, ${config.schema.ucpColumns.verifyCode} FROM ${config.schema.ucpTable} WHERE ${config.schema.ucpColumns.discordId} = ?`,
                [interaction.user.id]
            );

            if (results.length === 0) {
                return interaction.reply({ content: '❌ Kamu belum terdaftar di sistem UCP kami.', ephemeral: true });
            }

            const data = results[0];
            await interaction.reply({
                content: `📋 **Status Akun Anda**\n\n👤 **UCP**: \`${data[config.schema.ucpColumns.name]}\`\n🔢 **PIN/OTP**: ||${data[config.schema.ucpColumns.verifyCode]}||\n🔌 **Link Discord**: ✅ Terhubung\n\n*Jangan bagikan PIN ini ke siapapun!*`,
                ephemeral: true
            });
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: '❌ Terjadi kesalahan database.', ephemeral: true });
        }
    },
};
