const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');
const config = require('../../config/app.config');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('broadcast')
        .setDescription('Broadcast server status or IP (Admin Only)')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addStringOption(option =>
            option.setName('type')
                .setDescription('Type of broadcast')
                .setRequired(true)
                .addChoices(
                    { name: 'Server ON', value: 'server_on' },
                    { name: 'Server OFF', value: 'server_off' },
                    { name: 'Server IP', value: 'server_ip' }
                )),
    async execute(interaction) {
        if (!interaction.member.roles.cache.has(config.adminRoleId)) {
            return interaction.reply({ content: '❌ Access Denied.', ephemeral: true });
        }

        const type = interaction.options.getString('type');

        if (type === 'server_on' || type === 'server_off') {
            const ch = await interaction.client.channels.fetch(config.channels.serverStatus).catch(() => null);
            if (!ch) return interaction.reply({ content: '❌ Invalid Status Channel ID.', ephemeral: true });

            const embed = new EmbedBuilder()
                .setTitle('Server Information')
                .setColor(type === 'server_on' ? 0x00FF00 : 0xFF0000)
                .setDescription(`Server Nusantara Life Roleplay saat ini **${type === 'server_on' ? 'TELAH MENYALA' : 'SEDANG MATI'}**!`)
                .setTimestamp();
            await ch.send({ embeds: [embed] });
        }
        else if (type === 'server_ip') {
            const ch = await interaction.client.channels.fetch(config.channels.serverIp).catch(() => null);
            if (!ch) return interaction.reply({ content: '❌ Invalid IP Channel ID.', ephemeral: true });

            const embed = new EmbedBuilder()
                .setTitle('Server IP Address')
                .setColor(0xFFFF00)
                .addFields(
                    { name: 'Hostname', value: 'Nusantara Life Roleplay' },
                    { name: 'IP Address', value: `${config.server.ip}:${config.server.port}` }
                )
                .setThumbnail(interaction.client.user.displayAvatarURL());
            await ch.send({ embeds: [embed] });
        }

        await interaction.reply({ content: '✅ Broadcast sent!', ephemeral: true });
    },
};
