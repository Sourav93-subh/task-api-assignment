const request = require('supertest');
const app = require('../src/app');

describe('Tasks API', () => {

  test('should create a task', async () => {
    const res = await request(app)
      .post('/tasks')
      .send({ title: 'Test Task', priority: 'high' });

    expect(res.statusCode).toBe(201);
    expect(res.body.title).toBe('Test Task');
  });

  test('should have default status as pending', async () => {
    const res = await request(app)
      .post('/tasks')
      .send({ title: 'Bug Test', priority: 'high' });

    expect(res.body.status).toBe('pending'); // will FAIL
  });

  test('should not change priority on completion', async () => {
    const create = await request(app)
      .post('/tasks')
      .send({ title: 'Priority Test', priority: 'high' });

    const id = create.body.id;

    const complete = await request(app)
      .patch(`/tasks/${id}/complete`);

    expect(complete.body.priority).toBe('high'); // will FAIL
  });

});

