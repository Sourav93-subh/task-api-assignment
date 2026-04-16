const request = require('supertest');
const app = require('../src/app');

describe('Tasks API', () => {

  // ✅ Basic test
  test('should create a task', async () => {
    const res = await request(app)
      .post('/tasks')
      .send({ title: 'Test Task', priority: 'high' });

    expect(res.statusCode).toBe(201);
    expect(res.body.title).toBe('Test Task');
  });

  // 🔴 Bug test: wrong default status
  test('should have default status as pending', async () => {
    const res = await request(app)
      .post('/tasks')
      .send({ title: 'Bug Test', priority: 'high' });

    expect(res.body.status).toBe('pending'); // will FAIL
  });

  // 🔴 Bug test: priority should not change
  test('should not change priority on completion', async () => {
    const create = await request(app)
      .post('/tasks')
      .send({ title: 'Priority Test', priority: 'high' });

    const id = create.body.id;

    const complete = await request(app)
      .patch(`/tasks/${id}/complete`);

    expect(complete.body.priority).toBe('high'); // will FAIL
  });

  // ⚠️ Edge case: missing title
  test('should fail if title is missing', async () => {
    const res = await request(app)
      .post('/tasks')
      .send({ priority: 'high' });

    expect(res.statusCode).toBe(400);
  });

  // ⚠️ Edge case: invalid task ID
  test('should return 404 for invalid task id', async () => {
    const res = await request(app)
      .patch('/tasks/invalid-id/complete');

    expect(res.statusCode).toBe(404);
  });

  // 🔴 Bug test: invalid priority accepted
  test('should reject invalid priority', async () => {
    const res = await request(app)
      .post('/tasks')
      .send({ title: 'Invalid Priority', priority: 'super-high' });

    expect(res.statusCode).toBe(400); // likely FAIL
  });

  // 🔴 Bug test: completing twice
  test('should not allow completing task twice', async () => {
    const create = await request(app)
      .post('/tasks')
      .send({ title: 'Double Complete', priority: 'low' });

    const id = create.body.id;

    await request(app).patch(`/tasks/${id}/complete`);
    const second = await request(app).patch(`/tasks/${id}/complete`);

    expect(second.statusCode).toBe(400); // likely FAIL
  });

  // ✅ Feature test (for later)
  test('should assign task to user', async () => {
    const create = await request(app)
      .post('/tasks')
      .send({ title: 'Assign Test', priority: 'low' });

    const id = create.body.id;

    const res = await request(app)
      .patch(`/tasks/${id}/assign`)
      .send({ userId: 'user123' });

    expect(res.body.assignedTo).toBe('user123');
  });

});

