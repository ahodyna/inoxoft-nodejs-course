module.exports = {
    PORT: process.env.PORT || 5000,
    DB_CONNECT_URL: process.env.DB_CONNECT_URL || 'mongodb://localhost:27017/database',
    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET || 'word',
    REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET || 'hello',
    FORGOT_PASS_TOKEN_SECRET: process.env.FORGOT_PASS_TOKEN_SECRET || 'qwertyuiop',
    EMAIL_BROADCAST: process.env.EMAIL_BROADCAST || 'test@gmail.com',
    EMAIL_BROADCAST_PASS: process.env.EMAIL_BROADCAST_PASS || '12345',
    FRONTED_URL: process.env.FRONTED_URL || 'https://google.com'
};
