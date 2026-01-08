import axios from "axios";
/* eslint-disable */
class Analysis {
  constructor(baseURL = "http://localhost:8082/venlab") {
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

  async delete(id) {
    return this.api.delete(`/analysis/${id}`);
  }
}

export default Analysis;
