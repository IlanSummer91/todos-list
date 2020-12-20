const mongoose = require('mongoose');

const dbUrl = 'mongodb+srv://todo:todolist@cluster0.v1piz.mongodb.net/todos-list?retryWrites=true&w=majority';
const dbName = 'todos-list';

async function connect() {
 await mongoose.connect(`${dbUrl}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });
}

module.exports = {
  connect,
};