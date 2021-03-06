const mongoose = require('mongoose');

const { Schema } = mongoose;

const fields = {
  description: {
    type: String,
    required: true,
    trim: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
};

const references = {
  author: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
};

const task = new Schema(Object.assign(fields, references), {
  timestamps: true,
});

task.post('save', (doc, next) => {
  doc
    .populate('author')
    .execPopulate()
    .then(() => {
      next();
    });
});

module.exports = {
  Model: mongoose.model('task', task),
  fields,
  references,
};
