import axios from "axios";
const backendUrl = "https://miristschwindelig-pnu4i.ondigitalocean.app/backend"
/* eslint-disable */
class Log {
    constructor(baseURL = backendUrl + "/venlab") {
        this.api = axios.create({ baseURL });
    }

  async getAll() {
    return this.api.get("/log");
  }

  async getById(id) {
    return this.api.get(`/log/${id}`);
  }

  async create(data) {
    return this.api.post("/log", data);
  }

  async update(id, data) {
    return this.api.put(`/log/${id}`, data);
  }

  async deleteById(id) {
    return this.api.delete(`/log/${id}`);
  }
}

export default Log;
