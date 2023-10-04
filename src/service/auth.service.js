import axios from "axios";
import api from "../api/axiosConfig";

class AuthService {
  login(username, password) {
    return axios
      .post(api + "/api/v1/login", { username, password })
      .then((res) => {
        if (res.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(res.data));
        }
        return res.data;
      })
      .catch((error) => {
        return error;
      });
  }
  logout() {
    localStorage.removeItem("user");
  }
  register(username, email, password) {
    return axios.post(api + "/api/v1/signup", { username, email, password });
  }
}

export default new AuthService();
