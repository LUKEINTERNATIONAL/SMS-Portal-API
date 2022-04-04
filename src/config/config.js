
module.exports = {
    port: process.env.PORT || 8186,
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
    },
    emailVariables: {
        apikey: 'xVK4d9W0RG2e8tRl9Z5z8w',
        from: 'dominickasanga@gmail.com'
    }
}