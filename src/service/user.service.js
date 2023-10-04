import axios from "axios";
import authHeader from "./authHeader";
import api from "../api/axiosConfig";

class UserService {
  getMovies() {
    return axios.get(api + "/api/v1/movies");
  }
}

export default new UserService();
