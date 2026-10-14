const mongoose = require('mongoose');

const connectionString = 'mongodb+srv://mohamedbenzahaf01_db_user:Toulouse31@blackboard.egq6twh.mongodb.net/';

mongoose.connect(connectionString)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err.message));

module.exports = mongoose;
