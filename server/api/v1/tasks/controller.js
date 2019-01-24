const tasks = [];

function currentDate() {
  const d = new Date();
  return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;
}

exports.create = (req, res, next) => {
  if (req.body.description && req.body.author) {
    const task = {
      id: tasks.length + 1,
      description: req.body.description,
      author: req.body.author,
      createdAt: currentDate(),
      updatedAt: null,
    };
    tasks.push(task);
    res.status(201);
    res.json({
      message: 'Task created',
    });
    return;
  }
  next({
    message: 'Params "description" and "author" are required',
    statusCode: 400,
    type: 'warn',
  });
};

exports.all = (req, res, next) => {
  res.json(tasks);
};

exports.read = (req, res, next) => {
  res.json({});
};

exports.update = (req, res, next) => {
  res.json({});
};

exports.delete = (req, res, next) => {
  res.json({});
};
