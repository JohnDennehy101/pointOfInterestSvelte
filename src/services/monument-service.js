import axios from "axios";

export class MonumentService {
  monumentList = [];
  individualMonument;
  baseUrl = "";
  weatherData;
  newMonument;
  categories;

  constructor(baseUrl) {
    this.baseUrl = baseUrl;
    if (localStorage.user) {
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + JSON.parse(localStorage.user);
    }
  }

  async addMonument(monument) {
    let requestForm = new FormData();

    requestForm.append("title", String(monument.title));
    requestForm.append("description", String(monument.description));
    requestForm.append("latitude", String(monument.latitude));
    requestForm.append("longitude", String(monument.longitude));
    requestForm.append("county", String(monument.county));
    requestForm.append("province", String(monument.province));
    if (monument.images) {
      for (let i = 0; i < monument.images.length; i++) {
        requestForm.append("imageUpload", monument.images[i]);
      }
    } else {
      requestForm.append("imageUpload", "");
    }

    const response = await axios.post(
      this.baseUrl + "/api/monuments",
      requestForm
    );

    this.newMonument = response.data;
    //return this.newMonument;
    if (response) {
      return true;
    } else {
      return false;
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

  async getNonProvinceCategories() {
    try {
      const response = await axios.get(
        this.baseUrl + "/api/monuments/categories"
      );
      console.log(response);
      this.categories = response.data;
      return this.categories;
    } catch (error) {
      return [];
    }
  }

  async getIndividualMonument(id) {
    try {
      const response = await axios.get(this.baseUrl + "/api/monuments/" + id);

      this.monument = response.data;
      return this.monument;
    } catch (error) {
      return [];
    }
  }

  async getMonumentWeather(id) {
    try {
      const response = await axios.get(
        this.baseUrl + "/api/monuments/" + id + "/weather"
      );

      this.weatherData = response.data;
      return this.weatherData;
    } catch (error) {
      return [];
    }
  }
}
