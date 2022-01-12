
module.exports = {
    port: process.env.PORT || 8190,
    db: {
        database: process.env.DB_NAME || 'eidsr_sms_portal',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASS || 'root',
        options: {
            dialect: process.env.DIALECT || 'mysql',
            host: process.env.HOST || 'localhost'
        }
    },
    authentication: {
        jwtSecret: process.env.JWT_SECRET || 'sedret'
    }
}