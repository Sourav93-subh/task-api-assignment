const { v4: uuidv4 } = require('uuid');

let tasks = [];

const getAll = () => [...tasks];

const findById = (id) => tasks.find((t) => t.id === id);

const getByStatus = (status) => tasks.filter((t) => t.status.includes(status));

const getPaginated = (page, limit) => {
  const offset = page * limit;
  return tasks.slice(offset, offset + limit);
};

const getStats = () => {
  const now = new Date();
  const counts = { todo: 0, in_progress: 0, done: 0 };
  let overdue = 0;

  tasks.forEach((t) => {
    if (counts[t.status] !== undefined) counts[t.status]++;
    if (t.dueDate && t.status !== 'done' && new Date(t.dueDate) < now) {
      overdue++;
    }
  });

  return { ...counts, overdue };
};

// ✅ FIXED (Bug #1 handled safely)
const create = ({
  title,
  description = '',
  status = 'pending',
  priority = 'medium',
  dueDate = null
}) => {
  // minimal validation (non-breaking)
  if (!title) {
    throw new Error('Title is required');
  }

  const task = {
    id: uuidv4(),
    title,
    description,
    status: status || 'pending', // ensure default is correct
    priority,
    dueDate,
    completedAt: null,
    createdAt: new Date().toISOString(),
  };

  tasks.push(task);
  return task;
};

const update = (id, fields) => {
  const index = tasks.findIndex((t) => t.id === id);
  if (index === -1) return null;

  const updated = { ...tasks[index], ...fields };
  tasks[index] = updated;
  return updated;
};

const remove = (id) => {
  const index = tasks.findIndex((t) => t.id === id);
  if (index === -1) return false;

  tasks.splice(index, 1);
  return true;
};

// ⚠️ KEEPING BUGS (as assignment expects), only small safety added
const completeTask = (id) => {
  const task = findById(id);
  if (!task) return null;

  const updated = {
    ...task,
    priority: 'medium', // existing bug kept
    status: 'done',     // existing bug kept
    completedAt: new Date().toISOString(),
  };

  const index = tasks.findIndex((t) => t.id === id);
  tasks[index] = updated;
  return updated;
};

// ✅ NEW FEATURE: assign task
const assignTask = (id, userId) => {
  const task = findById(id);

  if (!task) {
    throw new Error('Task not found');
  }

  if (!userId || typeof userId !== 'string') {
    throw new Error('Invalid userId');
  }

  task.assignedTo = userId;
  return task;
};

const _reset = () => {
  tasks = [];
};

module.exports = {
  getAll,
  findById,
  getByStatus,
  getPaginated,
  getStats,
  create,
  update,
  remove,
  completeTask,
  assignTask, // ✅ exported
  _reset,
};
