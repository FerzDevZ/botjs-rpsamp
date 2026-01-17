const db = require('../../../services/Database');
const config = require('../../../config/app.config');

module.exports = {
    customId: 'modal_register',
    async execute(interaction) {
        const ucpName = interaction.fields.getTextInputValue('ucp_name');

        // Validation
        if (ucpName.includes(' ')) {
            return interaction.reply({ content: '❌ Nama UCP tidak boleh mengandung spasi!', ephemeral: true });
        }

        try {
            // Check Existing UCP Name
            const existing = await db.query(
                `SELECT * FROM ${config.schema.ucpTable} WHERE ${config.schema.ucpColumns.name} = ?`,
                [ucpName]
            );
            if (existing.length > 0) {
                return interaction.reply({ content: '❌ Nama UCP tersebut sudah digunakan!', ephemeral: true });
            }

            // Check if user already has UCP linked
            const discordCheck = await db.query(
                `SELECT * FROM ${config.schema.ucpTable} WHERE ${config.schema.ucpColumns.discordId} = ?`,
                [interaction.user.id]
            );
            if (discordCheck.length > 0) {
                return interaction.reply({ content: `❌ Kamu sudah memiliki akun UCP: **${discordCheck[0][config.schema.ucpColumns.name]}**.`, ephemeral: true });
            }

            // Create Account
            const verifyCode = Math.floor(100000 + Math.random() * 900000);
            await db.query(
                `INSERT INTO ${config.schema.ucpTable} (${config.schema.ucpColumns.name}, ${config.schema.ucpColumns.verifyCode}, ${config.schema.ucpColumns.discordId}) VALUES (?, ?, ?)`,
                [ucpName, verifyCode, interaction.user.id]
            );

            // Notify User
            await interaction.user.send({
                content: `✅ **PENDAFTARAN SUKSES!**\n\n👤 **UCP**: \`${ucpName}\`\n🔢 **PIN/OTP**: ||${verifyCode}||\n\n*Gunakan nama UCP dan PIN ini untuk login di server.*`
            }).catch(() => { });

            await interaction.reply({ content: '✅ Akun berhasil dibuat! Cek DM kamu untuk melihat PIN.', ephemeral: true });

        } catch (error) {
            console.error(error);
            await interaction.reply({ content: '❌ Terjadi kesalahan database.', ephemeral: true });
        }
    },
};
