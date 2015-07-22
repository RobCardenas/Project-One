module.exports = {
	PORT: process.env.PORT || '3000',
	MONGO_URI: process.env.MONGOLAB_URI || 'mongodb://localhost/project-one',
	SESSION_SECRET: process.env.SESSION_SECRET || 'bubulubu'
};