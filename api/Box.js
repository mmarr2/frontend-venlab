import axios from "axios";
/* eslint-disable */
class Box {
  constructor(baseURL = "http://localhost:8082/venlab") {
    this.api = axios.create({ baseURL });
  }

  async getAll() {
    return this.api.get("/box");
  }

  async getById(id) {
    return this.api.get(`/box/${id}`);
  }

  async create(data) {
    return this.api.post("/box", data);
  }

  async update(id, data) {
    return this.api.put(`/box/${id}`, data);
  }

  async deleteById(id) {
    return this.api.delete(`/box/${id}`);
  }
}

export default Box;
