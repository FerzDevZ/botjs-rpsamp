require('dotenv').config();

module.exports = {
    // Bot Identity
    token: process.env.DISCORD_TOKEN,
    clientId: process.env.CLIENT_ID,
    guildId: process.env.GUILD_ID,

    // Permissions
    adminRoleId: process.env.ADMIN_ROLE_ID,

    // Channels
    channels: {
        ucpInfo: process.env.UCP_INFO_CH,
        ucpPanel: process.env.UCP_PANEL_CH,
        serverStatus: process.env.SERVER_STATUS_CH,
        serverIp: process.env.SERVER_IP_CH,
        ticket: process.env.TICKET_CH,
    },

    // Game Server Connection
    server: {
        ip: process.env.SERVER_IP || '127.0.0.1',
        port: parseInt(process.env.SERVER_PORT) || 7777,
    },

    // Database Connection
    database: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        name: process.env.DB_NAME,
    },

    // Database Schema Mapping (Edit this to match your Gamemode!)
    schema: {
        // Table: Player UCP Account
        ucpTable: 'playerucp',
        ucpColumns: {
            name: 'ucp',            // Column for UCP Username
            verifyCode: 'verifycode', // Column for OTP/PIN
            discordId: 'DiscordID'    // Column for Discord User ID
        },

        // Table: Player Characters (In-Game)
        charTable: 'player_characters',
        charColumns: {
            name: 'Char_Name',      // Character Name
            ucp: 'Char_UCP',        // Link to UCP
            level: 'Char_Level',    // Level
            money: 'Char_Money',    // Money
            admin: 'Char_Admin'     // Admin Level
        }
    }
};
