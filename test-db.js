const db = require('./db');

async function testConnection() {
    console.log('Testing MySQL connection...');
    try {
        const results = await db.query('SELECT 1 + 1 AS solution');
        console.log('Database connection successful! Solution:', results[0].solution);
        process.exit(0);
    } catch (error) {
        console.error('Database connection failed.');
        console.error(error);
        process.exit(1);
    }
}

testConnection();
