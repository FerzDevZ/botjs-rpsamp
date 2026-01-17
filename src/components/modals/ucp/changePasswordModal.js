const db = require('../../../services/Database');
const config = require('../../../config/app.config');

module.exports = {
    customId: 'modal_changepw',
    async execute(interaction) {
        const newPw = interaction.fields.getTextInputValue('new_pw');

        try {
            // Check User UCP
            const results = await db.query(
                `SELECT ${config.schema.ucpColumns.name} FROM ${config.schema.ucpTable} WHERE ${config.schema.ucpColumns.discordId} = ?`,
                [interaction.user.id]
            );

            if (results.length === 0) {
                return interaction.reply({ content: '❌ Kamu belum punya akun UCP.', ephemeral: true });
            }

            const ucpName = results[0][config.schema.ucpColumns.name];

            // Update Password (PIN)
            await db.query(
                `UPDATE ${config.schema.ucpTable} SET ${config.schema.ucpColumns.verifyCode} = ? WHERE ${config.schema.ucpColumns.name} = ?`,
                [newPw, ucpName]
            );

            await interaction.reply({ content: `✅ Password/PIN UCP **${ucpName}** berhasil diubah menjadi: \`${newPw}\``, ephemeral: true });

        } catch (error) {
            console.error(error);
            await interaction.reply({ content: '❌ Gagal update password.', ephemeral: true });
        }
    },
};
