require('dotenv').config();
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const config = {
	uri,
	port: process.env.PORT || 3000,
	host: process.env.HOST || 'http://localhost',
	publicRoute: process.env.PUBLIC_ROUTE || '/app',
};

module.exports = config;
