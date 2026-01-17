const dgram = require('dgram');
const config = require('../config/app.config');

class SAMPQueryService {
    query(ip, port) {
        return new Promise((resolve, reject) => {
            const socket = dgram.createSocket('udp4');
            let timeout = setTimeout(() => {
                socket.close();
                reject(new Error('Query timeout'));
            }, 3000);

            const packet = Buffer.alloc(11);
            packet.write('SAMP', 0);
            packet[4] = 127; packet[5] = 0; packet[6] = 0; packet[7] = 1;
            packet[8] = port & 0xFF;
            packet[9] = (port >> 8) & 0xFF;
            packet[10] = 'i'.charCodeAt(0);

            socket.on('message', (msg) => {
                clearTimeout(timeout);
                socket.close();
                if (msg.length < 11) return reject(new Error('Invalid response'));
                const players = msg.readUInt16LE(12);
                const maxPlayers = msg.readUInt16LE(14);
                resolve({ players, maxPlayers });
            });

            socket.on('error', (err) => {
                clearTimeout(timeout);
                socket.close();
                reject(err);
            });

            socket.send(packet, 0, packet.length, port, ip);
        });
    }

    async getServerStatus() {
        try {
            return await this.query(config.server.ip, config.server.port);
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new SAMPQueryService();
