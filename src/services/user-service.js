import axios from "axios";
import {user} from "../stores"
export class UserService {
  userList = [];
  baseUrl = "";

  constructor(baseUrl) {
    this.baseUrl = baseUrl;
     if (localStorage.user) {
      axios.defaults.headers.common["Authorization"] = "Bearer " + JSON.parse(localStorage.user);
    }
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
       if (response.data.success) {
        axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.token;
        user.set({
          email: email,
          token: response.data.token
        });
        localStorage.user = JSON.stringify(response.data.token);
        return true;
    }
    
  }
  catch (error) {
      return false;
    }
  }
}