const { ChannelType, ThreadAutoArchiveDuration } = require('discord.js');
const config = require('../../../config/app.config');

module.exports = {
    customId: 'btn_open_ticket',
    async execute(interaction) {
        try {
            const thread = await interaction.channel.threads.create({
                name: `tiket-${interaction.user.username}`,
                autoArchiveDuration: ThreadAutoArchiveDuration.OneHour,
                type: ChannelType.PublicThread,
                reason: 'Laporan User',
            });

            await thread.send({
                content: `Halo <@${interaction.user.id}>, silahkan jelaskan laporanmu di sini. Staff <@&${config.adminRoleId}> akan segera membantu.`
            });

            await interaction.reply({ content: `✅ Tiket dibalas di <#${thread.id}>`, ephemeral: true });
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: '❌ Gagal membuat tiket. Cek permission bot.', ephemeral: true });
        }
    },
};
