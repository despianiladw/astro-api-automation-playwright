const { test, expect } = require('@playwright/test');

const UsersApi = require('../../pages/usersApi');
const { userData } = require('../../test-data/usersData');

test.describe('Users API Testing', () => {

  let usersApi;

  test.beforeEach(async ({ request }) => {
    usersApi = new UsersApi(request);
  });


  // API - 001
  test('API-001 - Get first page of users', async () => {
    const response = await usersApi.getUsers(1);
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.page).toBe(1);
    expect(body.data).toBeInstanceOf(Array);
  });


  // API - 002
  test('API-002 - Get user with valid ID', async () => {
    const response = await usersApi.getUser(2);
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.data.id).toBe(2);
    expect(body.data).toHaveProperty('email');
    expect(body.data).toHaveProperty('first_name');
    expect(body.data).toHaveProperty('last_name');
  });


  // API - 003
  test('API-003 - Get user with invalid ID', async () => {
    const response = await usersApi.getUser('a123213213');
    expect(response.status()).toBe(404);
  });


  // API - 004
  test('API-004 - Create user with valid data', async () => {
    const response = await usersApi.createUser(userData.validUser);
    expect(response.status()).toBe(201);

    const body = await response.json();
    expect(body.name).toBe(userData.validUser.name);
    expect(body.job).toBe(userData.validUser.job);
    expect(body).toHaveProperty('id');
    expect(body).toHaveProperty('createdAt');
  });


  // API - 005 - testcase will be failed, invalid data user wrong payload
  test('API-005 - Create user with invalid data', async () => {
    const response = await usersApi.createUser(userData.invalidPayload);
    expect(response.status()).toBe(400);
  });
  

  // API - 006
  test('API-006 - Update existing user', async () => {
    const response = await usersApi.updateUser(
      2,
      userData.updatedUser
    );
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.name).toBe(userData.updatedUser.name);
    expect(body.job).toBe(userData.updatedUser.job);
  });


  // API - 007
  test('API-007 - Update non-existing user', async () => {

    const response = await usersApi.updateUser(
      'a123213213',
      userData.updatedUser
    );
    expect(response.status()).toBe(404);
  });


  // API - 008
  test('API-008 - Delete existing user', async () => {
    const response = await usersApi.deleteUser(2);
    expect(response.status()).toBe(204);
  });


  // API - 009
  test('API-009 - Delete non-existing user', async () => {
    const response = await usersApi.deleteUser('a123213213');
    expect(response.status()).toBe(204);
  });

});