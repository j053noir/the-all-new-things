const mongoose = require('mongoose');

const task = {
  description: String,
};

module.exports = mongoose.model('task', task);
