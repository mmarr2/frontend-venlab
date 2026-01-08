import axios from "axios";
/* eslint-disable */
class Sample {
  constructor(baseURL = "http://localhost:8082/venlab") {
    this.api = axios.create({ baseURL });
  }

  async getAll() {
    return this.api.get("/sample");
  }

  async getById(id) {
    return this.api.get(`/sample/${id}`);
  }

  async create(data) {
    return this.api.post("/sample", data);
  }

  async update(id, data) {
    return this.api.put(`/sample/${id}`, data);
  }

  async deleteById(id) {
    return this.api.delete(`/sample/${id}`);
  }
}

export default Sample;
