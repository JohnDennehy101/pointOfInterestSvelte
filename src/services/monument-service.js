import axios from "axios";

export class MonumentService {
  monumentList = [];
  baseUrl = "";

  constructor(baseUrl) {
    this.baseUrl = baseUrl;
     if (localStorage.user) {
      axios.defaults.headers.common["Authorization"] = "Bearer " + JSON.parse(localStorage.user);
    }
  }

  async getMonuments() {
    try {
      const response = await axios.get(this.baseUrl + "/api/monuments");

      this.monumentList = response.data;
      return this.monumentList;
    } catch (error) {
      return [];
    }
  }

}