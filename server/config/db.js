const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const connectDB = () => {
    mongoose
        .connect(process.env.MONGO_URI, {
        })
        .then(() => {
            console.log('MongoDB connected');
        })
        .catch((err) => {
            console.error('MongoDB connection error:', err.message);
            process.exit(1);
        });
};

const getDB = () => mongoose.connection;

module.exports = {
    connectDB,
    getDB,
};