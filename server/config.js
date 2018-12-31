module.exports = {
    ENV: process.env.NODE_ENV || 'development',
    PORT: process.env.PORT || 3000,
    URL: process.env.BASE_URL || 'http://localhost:3000',
    MONGODB_URI: process.env.MONGODB_URI || 'mongodb://abc123!:abc123!@ds163836.mlab.com:63836/customer_api_restify',
    JTW_SECRET: process.env.JTW_SECRET || 'devsecret123'
};
