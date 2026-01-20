import axios from "axios";
const backendUrl = "https://miristschwindelig-pnu4i.ondigitalocean.app/backend"
/* eslint-disable */
class Threshold {
    constructor(baseURL = backendUrl + "/venlab") {
        this.api = axios.create({ baseURL });
    }

  async getAll() {
    return this.api.get("/threshold");
  }

  async getById(id) {
    return this.api.get(`/threshold/${id}`);
  }

  async create(data) {
    return this.api.post("/threshold", data);
  }

  async update(id, data) {
    return this.api.put(`/threshold/${id}`, data);
  }

  async deleteById(id) {
    return this.api.delete(`/threshold/${id}`);
  }
}

export default Threshold;
