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
  res.json(tasks.slice());
};

exports.read = (req, res, next) => {
  const task = tasks.find(t => t.id === +req.params.id);

  if (task) {
    res.json(task);
    return;
  }
  next({
    message: `Task (${req.params.id}) not found`,
    statusCode: 404,
    type: 'warn',
  });
};

exports.update = (req, res, next) => {
  if (req.body.description && req.body.author) {
    const index = tasks.findIndex(t => t.id === +req.params.id);

    if (index >= 0) {
      const task = {
        id: tasks[index].id,
        description: req.body.description,
        author: req.body.author,
        createdAt: tasks[index].createdAt,
        updatedAt: currentDate(),
      };

      tasks.splice(index, 1, task);

      res.json({
        message: `Task (${task.id}) updated`,
      });
      return;
    }
    next({
      message: `Task (${req.params.id}) not found`,
      statusCode: 404,
      type: 'warn',
    });
  }
  next({
    message: 'Params "description" and "author" are required',
    statusCode: 400,
    type: 'warn',
  });
};

exports.delete = (req, res, next) => {
  res.json({});
};
