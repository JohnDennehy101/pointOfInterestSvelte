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
      axios.defaults.headers.common["Authorization"] = "Bearer " + JSON.parse(localStorage.user);
    }
  }

  async addMonument(monument) {
try {
    let form = new FormData();

     form.append('title', String(monument.title));
      form.append('description', String(monument.description));
      form.append('latitude', String(monument.coordinates.latitude));
      form.append('longitude', String(monument.coordinates.longitude));
      form.append('county', String(monument.county));
      form.append('province', String(monument.province));
    //   requestFormData.append('test', 'true');
    //   const image = fs.createReadStream(path.join(__dirname, './testImages/castle.jpg'));
      form.append('imageUpload',  monument.images);
      const response = await axios.post(this.baseUrl + "/api/monuments", form);

    //   this.newMonument = response.data;
    //   return this.newMonument;
    if (response) {
        return true;
    }
    } catch (error) {
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
const response = await axios.get(this.baseUrl + "/api/monuments/categories");
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
      const response = await axios.get(this.baseUrl + "/api/monuments/" + id + "/weather");

      this.weatherData= response.data;
      return this.weatherData;
    } catch (error) {
      return [];
    }
  }

}