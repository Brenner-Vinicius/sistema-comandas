const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/churrasquinho')
  .then(() => console.log('MongoDB conectado'))
  .catch(err => console.log(err))

module.exports = mongoose