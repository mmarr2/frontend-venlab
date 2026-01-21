import axios from "axios";
const backendUrl = "https://miristschwindelig-pnu4i.ondigitalocean.app/backend"
/* eslint-disable */
class Analysis {
  constructor(baseURL = backendUrl + "/venlab") {
    this.api = axios.create({ baseURL });
  }

  async getAll() {
    return this.api.get("/analysis");
  }

  async getById(id) {
    return this.api.get(`/analysis/${id}`);
  }

  async create(data) {
    return this.api.post("/analysis", data);
  }

  async update(id, data) {
    return this.api.put(`/analysis/${id}`, data);
  }

  async deleteById(id) {
    return this.api.delete(`/analysis/${id}`);
  }
}

export default Analysis;
