const db = require('../../../services/Database');
const config = require('../../../config/app.config');

module.exports = {
    customId: 'modal_reroll',
    async execute(interaction) {
        const charName = interaction.fields.getTextInputValue('char_name');

        try {
            // Check Character
            const results = await db.query(
                `SELECT * FROM ${config.schema.charTable} WHERE ${config.schema.charColumns.name} = ?`,
                [charName]
            );

            if (results.length === 0) {
                return interaction.reply({ content: '❌ Karakter tidak ditemukan!', ephemeral: true });
            }

            // Check Ownership
            const ucpRes = await db.query(
                `SELECT ${config.schema.ucpColumns.name} FROM ${config.schema.ucpTable} WHERE ${config.schema.ucpColumns.discordId} = ?`,
                [interaction.user.id]
            );

            if (ucpRes.length === 0) {
                return interaction.reply({ content: '❌ Kamu tidak punya akun UCP.', ephemeral: true });
            }

            const charUcp = results[0][config.schema.charColumns.ucp];
            const userUcp = ucpRes[0][config.schema.ucpColumns.name];

            if (charUcp !== userUcp) {
                return interaction.reply({ content: '❌ Karakter ini bukan milik UCP kamu!', ephemeral: true });
            }

            // Delete Character
            await db.query(
                `DELETE FROM ${config.schema.charTable} WHERE ${config.schema.charColumns.name} = ?`,
                [charName]
            );

            await interaction.reply({ content: `✅ Karakter \`${charName}\` berhasil dihapus permanen via Reroll System.`, ephemeral: true });

        } catch (error) {
            console.error(error);
            await interaction.reply({ content: '❌ Gagal reroll. Pastikan nama benar.', ephemeral: true });
        }
    },
};
