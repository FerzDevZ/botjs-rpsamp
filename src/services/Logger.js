class Logger {
    log(message) {
        console.log(`[INFO] ${message}`);
    }

    success(message) {
        console.log(`✅ [SUCCESS] ${message}`);
    }

    error(message, error = '') {
        console.error(`❌ [ERROR] ${message}`, error);
    }

    warn(message) {
        console.warn(`⚠️ [WARN] ${message}`);
    }
}

module.exports = new Logger();
