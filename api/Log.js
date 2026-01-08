import axios from "axios";

class Sample {
  constructor(baseURL) {
    this.api = axios.create({
      baseURL: baseURL
    });
  }

  async getAll() {
    return this.api.get("venlab/log");
  }

  async getById(id) {
    return this.api.get(`venlab/log/${id}`);
  }

  async create(data) {
    return this.api.post("venlab/log", data);
  }

  async update(id, data) {
    return this.api.put(`venlab/log/${id}`, data);
  }

  async delete(id) {
    return this.api.delete(`venlab/log/${id}`);
  }
}

export default Sample;
