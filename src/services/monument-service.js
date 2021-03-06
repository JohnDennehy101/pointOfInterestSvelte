import axios from "axios";

export class MonumentService {
  monumentList = [];
  individualMonument;
  baseUrl = "";
  weatherData;
  newMonument;
  editedMonument;
  categories;
  selectedCategories;
  successfullyDeletedMonument;

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

    if (monument.category.length) {
      for (let category in monument.category) {
        requestForm.append("category", monument.category[category]);
      }
    }
    
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

  //Similar to above - could be refactored
  async editMonument(monument) {

    let requestForm = new FormData();

    requestForm.append("title", String(monument.title));
    requestForm.append("description", String(monument.description));
    requestForm.append("latitude", String(monument.latitude));
    requestForm.append("longitude", String(monument.longitude));
    requestForm.append("county", String(monument.county));
    requestForm.append("province", String(monument.province));

    if (monument.category.length > 0) {
      for (let category in monument.category) {
        requestForm.append("category", monument.category[category]);
      }
    }
    else {
      requestForm.append("category", monument.category);
    }
    
    if (monument.images) {
      for (let i = 0; i < monument.images.length; i++) {
        requestForm.append("imageUpload", monument.images[i]);
      }
    } else {
      requestForm.append("imageUpload", "");
    }

    console.log(requestForm);
    const response = await axios.put(
      this.baseUrl + "/api/monuments/" + monument._id,
      requestForm
    );

    this.editedMonument = response.data;
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

  async deleteMonument(id) {
    try {
      const formattedId = id.replace(/"/g, '');
      console.log(formattedId);
      const response = await axios.delete(this.baseUrl + "/api/monuments/" + formattedId);

      this.successfullyDeletedMonument = response.data;
      return this.successfullyDeletedMonument;
    } catch (error) {
      return [];
    }
  }

  async getNonProvinceCategories() {
    try {
      const response = await axios.get(
        this.baseUrl + "/api/monuments/categories"
      );
      this.categories = response.data;
      return this.categories;
    } catch (error) {
      return [];
    }
  }


  async getProvinceCategories() {
    try {
      const response = await axios.get(
        this.baseUrl + "/api/monuments/provinces"
      );
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

  async getCurrentMonumentCategories(id) {
     try {
      const response = await axios.get(
        this.baseUrl + "/api/monuments/categories/" + id
      );

      this.selectedCategories = response.data;
      return this.selectedCategories;
    } catch (error) {
      return [];
    }
  }
}
