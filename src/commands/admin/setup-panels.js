const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, PermissionFlagsBits } = require('discord.js');
const config = require('../../config/app.config');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('setup-panels')
        .setDescription('Post the UCP and Ticket panels to designated channels (Admin Only)')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    async execute(interaction) {
        // Admin Role Check
        if (!interaction.member.roles.cache.has(config.adminRoleId)) {
            return interaction.reply({ content: '❌ Access Denied.', ephemeral: true });
        }

        // Setup UCP Panel
        const ucpChannel = await interaction.client.channels.fetch(config.channels.ucpPanel).catch(() => null);
        if (ucpChannel) {
            const embed = new EmbedBuilder()
                .setTitle('🔐 USER CONTROL PANEL (UCP)')
                .setDescription('Selamat datang di **Nusantara Life Roleplay**.\nSilahkan gunakan menu di bawah untuk mengatur akun Anda.')
                .setColor(0x2b2d31)
                .addFields(
                    { name: '🆕 Member Baru', value: 'Klik **Daftar UCP** untuk membuat akun baru.', inline: true },
                    { name: '🔑 Lupa Password/Pin?', value: 'Klik **Cek Login** atau **Ganti Password**.', inline: true },
                    { name: '🗑️ Reset Karakter', value: 'Klik **Reroll** untuk menghapus karakter lama.', inline: false }
                )
                .setFooter({ text: 'Nusantara Life Roleplay Automatic System' });

            const row1 = new ActionRowBuilder().addComponents(
                new ButtonBuilder().setCustomId('btn_register').setLabel('📝 Daftar UCP').setStyle(ButtonStyle.Success),
                new ButtonBuilder().setCustomId('btn_login').setLabel('👀 Cek Info Login').setStyle(ButtonStyle.Secondary),
                new ButtonBuilder().setCustomId('btn_status').setLabel('👤 My Status').setStyle(ButtonStyle.Primary)
            );

            const row2 = new ActionRowBuilder().addComponents(
                new ButtonBuilder().setCustomId('btn_change_pw').setLabel('🔑 Ganti Password').setStyle(ButtonStyle.Primary),
                new ButtonBuilder().setCustomId('btn_reroll').setLabel('💀 Reroll / Hapus Char').setStyle(ButtonStyle.Danger)
            );

            await ucpChannel.send({ embeds: [embed], components: [row1, row2] });
        }

        // Setup Ticket Panel
        const ticketChannel = await interaction.client.channels.fetch(config.channels.ticket).catch(() => null);
        if (ticketChannel) {
            const embed = new EmbedBuilder()
                .setTitle('📨 Laporan & Bantuan')
                .setDescription('Klik tombol di bawah untuk melaporkan cheater atau masalah teknis lainnya.')
                .setColor(0xFF0000);

            const row = new ActionRowBuilder().addComponents(
                new ButtonBuilder().setCustomId('btn_open_ticket').setLabel('Buka Tiket Laporan').setStyle(ButtonStyle.Danger)
            );
            await ticketChannel.send({ embeds: [embed], components: [row] });
        }

        await interaction.reply({ content: '✅ Panels setup successfully!', ephemeral: true });
    },
};
