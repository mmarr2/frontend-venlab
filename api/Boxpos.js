import axios from "axios";

class Boxpos {
  constructor(baseURL = "localhost:8082/venlab") {
    this.api = axios.create({
      baseURL: baseURL
    });
  }

  async getAll() {
    return this.api.get("/boxpos");
  }

  async getById(id) {
    return this.api.get(`/boxpos/${id}`);
  }

  async create(data) {
    return this.api.post("/boxpos", data);
  }

  async update(id, data) {
    return this.api.put(`/boxpos/${id}`, data);
  }

  async delete(id) {
    return this.api.delete(`/boxpos/${id}`);
  }
}

export default Sample;
