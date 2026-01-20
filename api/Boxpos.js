import axios from "axios";
const backendUrl = "https://miristschwindelig-pnu4i.ondigitalocean.app/backend"
/* eslint-disable */
class Boxpos {
    constructor(baseURL = backendUrl + "/venlab") {
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

  async deleteById(id) {
    return this.api.delete(`/boxpos/${bId}/${bposId}`);
  }
}

export default Boxpos;
