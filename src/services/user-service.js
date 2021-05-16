import axios from "axios";
import { user } from "../stores";
export class UserService {
  userList = [];
  baseUrl = "";
  editedUser;
  existingUser;

  constructor(baseUrl) {
    this.baseUrl = baseUrl;
    if (localStorage.user) {
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + JSON.parse(localStorage.user);
    }
  }

  async getUsers() {
    try {
      const response = await axios.get(this.baseUrl + "/api/users");
      this.userList = response.data;
      return this.userList;
    } catch (error) {
      return [];
    }
  }

  async getIndividualUser(id) {
    try {
 const response = await axios.get(this.baseUrl + "/api/users/" + id);
 this.existingUser = response.data;
 return this.existingUser;
    } catch (error) {

    }
  }

  async signUp(newUser) {
    let success;
    try {
      const response = await axios.post(`${this.baseUrl}/api/users`, newUser);
      if (response) {
success = await this.login(newUser.email, newUser.password);
      }
      
      return success;
    } catch (error) {
      return false;
    }
  }

  async editUser(editedUser) {
    try {
      const response = await axios.put(`${this.baseUrl}/api/users/${editedUser._id}`, editedUser);
      this.editedUser = response.data;
      return this.editedUser;
    } catch (error) {
      return false;
    }
  }

  async login(email, password) {
    try {
      const response = await axios.post(
        `${this.baseUrl}/api/users/authenticate`,
        { email, password }
      );
      if (response.data.success) {
        axios.defaults.headers.common["Authorization"] =
          "Bearer " + response.data.token;
        user.set({
          email: email,
          token: response.data.token,
        });
        localStorage.user = JSON.stringify(response.data.token);
        return true;
      }
    } catch (error) {
      return false;
    }
  }

  async logout() {
    user.set({
      email: "",
      token: "",
    });
    axios.defaults.headers.common["Authorization"] = "";
    localStorage.user = null;
    localStorage.monument = null;
  }

  async deleteUser(jwt) {
try {
      const response = await axios.delete(`${this.baseUrl}/api/users/${jwt}`);
      if (response) {
        return true;
      }
    } catch (error) {
      return false;
    }
  }
}
