const dgram = require('dgram');

function querySAMP(ip, port) {
    return new Promise((resolve, reject) => {
        const client = dgram.createSocket('udp4');
        const timeout = setTimeout(() => {
            client.close();
            reject(new Error('Query timeout'));
        }, 5000);

        // SA-MP Query Packet
        const packet = Buffer.alloc(11);
        packet.write('SAMP', 0); // Header

        // IP Address (4 bytes) - Handled by dgram, so we just send to the remote
        // But the protocol requires the IP it came from? No, actually just 'i' for info.
        // Actually, the packet is: SAMP + 4 bytes IP + 2 bytes Port + 'i'

        // Wait, SA-MP Query Protocol:
        // 'SAMP' (4 bytes)
        // IP (4 bytes - not usually used by server, can be any 4 bytes)
        // Port (2 bytes - little endian)
        // Opcode ('i' for info)

        // For simplicity, many servers just accept 'SAMP' + any 4 + any 2 + 'i'
        // Let's try to get IP bytes
        const ipParts = ip.split('.').map(Number);
        if (ipParts.length === 4) {
            packet[4] = ipParts[0];
            packet[5] = ipParts[1];
            packet[6] = ipParts[2];
            packet[7] = ipParts[3];
        } else {
            // If hostname, we can't easily get bytes here without DNS lookup
            // Protocol often accepts anything here
            packet[4] = 127; packet[5] = 0; packet[6] = 0; packet[7] = 1;
        }

        packet[8] = port & 0xFF;
        packet[9] = (port >> 8) & 0xFF;
        packet[10] = 'i'.charCodeAt(0);

        client.on('message', (msg) => {
            clearTimeout(timeout);
            client.close();

            // Response: Header(11) + Password(1) + Players(2) + MaxPlayers(2) + Hostname + Gamemode + Map
            if (msg.length < 11) return reject(new Error('Invalid response length'));

            const players = msg.readUInt16LE(12);
            const maxPlayers = msg.readUInt16LE(14);

            resolve({ players, maxPlayers });
        });

        client.on('error', (err) => {
            clearTimeout(timeout);
            client.close();
            reject(err);
        });

        client.send(packet, 0, packet.length, port, ip);
    });
}

const ip = 'nusantaralrp.ddns.net';
const port = 3417;

querySAMP(ip, port)
    .then(data => console.log(`Players: ${data.players}/${data.maxPlayers}`))
    .catch(err => console.error(`Error: ${err.message}`));
