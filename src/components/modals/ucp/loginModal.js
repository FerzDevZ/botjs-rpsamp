const db = require('../../../services/Database');
const config = require('../../../config/app.config');

module.exports = {
    customId: 'modal_login',
    async execute(interaction) {
        const ucpName = interaction.fields.getTextInputValue('ucp_name');

        try {
            const results = await db.query(
                `SELECT ${config.schema.ucpColumns.verifyCode}, ${config.schema.ucpColumns.discordId} FROM ${config.schema.ucpTable} WHERE ${config.schema.ucpColumns.name} = ?`,
                [ucpName]
            );

            if (results.length === 0) {
                return interaction.reply({ content: '❌ UCP tidak ditemukan!', ephemeral: true });
            }

            const data = results[0];

            // Security Check
            if (data[config.schema.ucpColumns.discordId] && data[config.schema.ucpColumns.discordId] !== interaction.user.id) {
                return interaction.reply({ content: '❌ Ini bukan akun UCP milikmu!', ephemeral: true });
            }

            // Send Info
            await interaction.user.send({
                content: `🔐 **INFORMASI LOGIN**\n\n👤 **UCP**: \`${ucpName}\`\n🔢 **PIN/OTP**: ||${data[config.schema.ucpColumns.verifyCode]}||\n`
            }).catch(() => { });

            await interaction.reply({ content: '✅ Informasi login telah dikirim ke DM kamu.', ephemeral: true });

        } catch (error) {
            console.error(error);
            await interaction.reply({ content: '❌ Terjadi kesalahan saat mengambil data.', ephemeral: true });
        }
    },
};
