import axios from "axios";
/* eslint-disable */
class Boxpos {
  constructor(baseURL = "http://localhost:8082/venlab") {
      this.api = axios.create({ baseURL });
    }

  async getAll() {
    return this.api.get("/boxpos");
  }

  async getById(id) {
    return this.api.get(`/boxpos/${bId}/${bposId}`);
  }

  async create(data) {
    return this.api.post("/boxpos", data);
  }

  async update(id, data) {
    return this.api.put(`/boxpos/${bId}/${bposId}`, data);
  }

  async delete(id) {
    return this.api.delete(`/boxpos/${bId}/${bposId}`);
  }
}

export default Boxpos;
