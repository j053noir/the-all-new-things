const mongoose = require('mongoose');

const { Schema } = mongoose;

const fields = {
  description: {
    type: String,
    required: true,
    trim: true,
  },
};

const task = new Schema(fields, {
  timestamps: true,
});

module.exports = mongoose.model('task', task);
