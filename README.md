# 🤖 Discord Bot Modular - SA-MP Integration
> Sistem Bot Resmi **Nusantara Life Roleplay**

Bot Discord profesional yang dirancang khusus untuk server SA-MP dengan arsitektur modular. Bot ini menangani integrasi UCP (User Control Panel), Sistem Tiket, dan Administrasi Server yang terhubung langsung ke database MySQL secara *real-time*.

---

## ✨ Fitur Unggulan

### 🔐 Sistem UCP Terintegrasi
- **Daftar Instan**: Player bisa mendaftar akun UCP langsung dari Discord menggunakan formulir (Modal).
- **Verifikasi OTP/PIN**: Kode login dikirim aman melalui DM (Direct Message).
- **My Status**: Cek detail akun dan PIN UCP sendiri tanpa takut diintip orang lain.
- **Manajemen Akun**: Fitur ganti password/PIN dan *Reroll* (hapus karakter) yang aman dengan verifikasi kepemilikan.

### 🛠️ Kit Admin (Administrator Tools)
- **/setup-panels**: Command satu klik untuk memunculkan panel UCP & Tiket yang interaktif.
- **/setadmin**: Atur level admin karakter ingame langsung dari Discord.
- **/broadcast**: Kirim pengumuman status server (ON/OFF/IP) dengan tampilan embed yang rapi.
- **Fleksibel & Adaptif**: Skema database bisa diatur di `app.config.js` sehingga cocok untuk gamemode apapun tanpa perlu mengubah kodingan inti.

### 🎮 Fitur Pemain
- **/me**: Cek statistik karakter sendiri (Level, Uang, dll) yang sudah terhubung ke Discord.
- **/leaderboard**: Menampilkan daftar 10 pemain terkaya di server.
- **/rules**: Akses cepat ke peraturan dasar server.
- **Live Status**: Status aktivitas bot otomatis menampilkan jumlah player yang sedang online di server.

---

## 📂 Struktur Project

Bot ini menggunakan sistem **Handler-based**, membuat kodingan jauh lebih rapi, terstruktur, dan mudah dikembangkan.

```
bot/
├── src/
│   ├── commands/       # Direktori Slash Commands (Dipisah per kategori)
│   ├── components/     # Logika Button & Modal (Form)
│   ├── config/         # Konfigurasi Utama & Mapping Database
│   ├── events/         # Handler Event Discord (Ready, Interaction, dll)
│   ├── handlers/       # System Loader (Inti sistem modular)
│   └── services/       # Service Koneksi Database & Query SA-MP
├── index.js            # Entry Point (Hanya untuk inisialisasi)
└── .env                # Konfigurasi Rahasia (Token, Database, dll)
```

---

## ⚙️ Konfigurasi

### 1. Penyesuaian Database
Buka file `src/config/app.config.js`. Pada bagian `schema`, sesuaikan nama tabel dan kolom agar cocok dengan database gamemode Anda.

```javascript
schema: {
    ucpTable: 'playerucp',      // Nama tabel akun UCP
    ucpColumns: {
        name: 'ucp',            // Kolom username
        verifyCode: 'verifycode', // Kolom untuk PIN/OTP
        discordId: 'DiscordID'    // Kolom untuk menyimpan ID Discord
    },
    // ... mapping untuk tabel karakter
}
```

### 2. Environment Variables
Pastikan file `.env` telah diisi dengan kredensial yang benar:

```ini
DISCORD_TOKEN=token_bot_anda
CLIENT_ID=id_aplikasi_bot
GUILD_ID=id_server_discord
# ... (Kredensial Database & ID Channel)
```

---

## 🚀 Cara Penggunaan

1. **Install Dependensi**
   Jalankan perintah ini di terminal untuk mengunduh modul yang diperlukan:
   ```bash
   npm install
   ```

2. **Jalankan Bot**
   Hidupkan bot dengan perintah:
   ```bash
   node index.js
   ```

3. **Deploy Panel**
   - Masuk ke Discord, dan ketik command `/setup-panels` (Admin Only) untuk memunculkan panel di channel yang sudah disetting.

---
**Developed for Nusantara Life Roleplay**
*Dibuat dengan standar industri agar stabil dan mudah dikelola.*



**ENV FOR SCRIPT**
*Untuk Mengatur Atau Core Inti Bot*
```DISCORD_TOKEN=
DB_HOST=
DB_USER=
DB_PASSWORD=
DB_NAME=

GUILD_ID=
CLIENT_ID=
ADMIN_ROLE_ID=

# Channel IDs
UCP_INFO_CH=
UCP_PANEL_CH=
SERVER_STATUS_CH=
SERVER_IP_CH=
TICKET_CH=

# Constants
SERVER_IP=
SERVER_PORT=
```
