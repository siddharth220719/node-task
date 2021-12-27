const mongoose = require('mongoose');

mongoose.connect(
  'mongodb+srv://task-app:P@ssw0rd22071994@cluster0.jzfm1.mongodb.net/node-task?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  }
);
