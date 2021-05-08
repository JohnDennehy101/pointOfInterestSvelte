import axios from "axios";

export class MonumentService {
  monumentList = [];
  baseUrl = "";

  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  async getMonuments() {
    try {
      const response = await axios.get(this.baseUrl + "/api/monuments")
      this.monumentList = response.data;
      console.log(this.monumentList);
      return this.monumentList;
    } catch (error) {
      return [];
    }
  }

}