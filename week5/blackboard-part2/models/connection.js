
const mongoose = require('mongoose');

const connectionString = 'mongodb+srv://mohamedbenzahaf01_db_user:Toulouse31@blackboard.egq6twh.mongodb.net/blackboard?appName=blackboard';

mongoose.connect(connectionString, {
  connectTimeoutMS: 2000,
})
  .then(() => console.log("Database connected"))
  .catch(error => console.error(error));