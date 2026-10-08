class UsersApi {

    constructor(request) {
      this.request = request;
    }
  
    async getUsers(page = 1) {
      return await this.request.get('/api/users?page=${page}');
    }
  
    async getUser(userId) {
      return await this.request.get('/api/users/${userId}');
    }
  
    async createUser(data) {
      return await this.request.post('/api/users', {
        data: data
      });
    }
  
    async updateUser(userId, data) {
      return await this.request.put('/api/users/${userId}', {
        data: data
      });
    }
  
    async deleteUser(userId) {
      return await this.request.delete('/api/users/${userId}');
    }
  }
  
  module.exports = UsersApi;