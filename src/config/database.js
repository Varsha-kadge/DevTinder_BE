const mongoose = require('mongoose');
const connectDB = async () => {
    await mongoose.connect('mongodb+srv://varshakadgem4_db_user:sIfZcWabZ6oNuhhB@namstenode.k1cragl.mongodb.net/DevTinder')
}

module.exports = connectDB;