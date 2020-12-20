const mongoose = require('mongoose');

let dbUrl = 'mongodb://localhost:27017/todos-list';
if(process.env.DB_URL) {
  dbUrl = process.env.DB_URL;
}

async function connect() {
 await mongoose.connect(`${dbUrl}/${dbName}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });
}

module.exports = {
  connect,
};