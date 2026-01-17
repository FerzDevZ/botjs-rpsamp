const mysql = require('mysql2/promise');
const config = require('../config/app.config');

class DatabaseService {
    constructor() {
        this.pool = null;
    }

    async connect() {
        try {
            this.pool = mysql.createPool({
                host: config.database.host,
                user: config.database.user,
                password: config.database.password,
                database: config.database.name,
                waitForConnections: true,
                connectionLimit: 10,
                queueLimit: 0
            });
            console.log('✅ Database connected.');
        } catch (error) {
            console.error('❌ Database connection failed:', error.message);
            process.exit(1);
        }
    }

    async query(sql, params) {
        if (!this.pool) await this.connect();
        try {
            const [results] = await this.pool.execute(sql, params);
            return results;
        } catch (error) {
            console.error('❌ Query Error:', error.message);
            throw error;
        }
    }
}

module.exports = new DatabaseService();
