import axios from "axios";

export class UserService {
  userList = [];
  baseUrl = "";

  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  async getUsers() {
    try {
      const response = await axios.get(this.baseUrl + "/api/users")
      this.userList = response.data;
      return this.userList;
    } catch (error) {
      return [];
    }
  }

  async login(email, password) {
    try {
      console.log(this.baseUrl);
      const response = await axios.post(`${this.baseUrl}/api/users/authenticate`, {email, password});
      console.log(response.status);
      return response.status == 201;
    } catch (error) {
      return false;
    }
  }
}