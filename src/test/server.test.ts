import request from 'supertest';
import { initServer } from '../server';

import { Server } from 'http';
import crypto, { randomUUID } from 'crypto';

let server: Server;

beforeAll(() => {
  server = initServer();
});

afterAll((done) => {
  server.close(done);
});

describe('GET HttpMethod', () => {
  test('should return empty array with status code 200', async () => {
    const response = await request(server).get('/api/users');
    expect(response.status).toEqual(200);
    expect(response.text).toEqual(JSON.stringify([]));
  });

  test('should return There is no user with this id with status code 404 if there is no user with such id', async () => {
    const response = await request(server).get(`/api/users/${randomUUID()}`);
    expect(response.status).toEqual(404);
    expect(response.text).toEqual(JSON.stringify('There is no user with this id'));
  });
});

describe('POST HttpMethod', () => {
  const mockUuid = 'eacf91bf-5a9f-42d3-8c9c-05cd9c08a353';
  const user = { id: mockUuid, name: 'Igor', age: 23, hobbies: [] };

  test('shoid create new object and response with it', async () => {
    jest.spyOn(crypto, 'randomUUID').mockReturnValue(mockUuid);
    const response = await request(server).post('/api/users').send(user);
    expect(response.status).toEqual(201);
    expect(response.text).toEqual(JSON.stringify(user));
  });
});
