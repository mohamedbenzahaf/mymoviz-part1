const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://mohamedbenzahaf01_db_user:Toulouse31@blackboard.egq6twh.mongodb.net/todos?retryWrites=true&w=majority');

module.exports = mongoose;
