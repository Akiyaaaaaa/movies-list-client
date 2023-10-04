import axios from "axios";

const URL = import.meta.env.VITE_REACT_BASE_URL;
class AuthService {
  login(username, password) {
    return axios
      .post(URL + "/login", { username, password })
      .then((res) => {
        if (res.data.body.accessToken) {
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
  register(username, email, password, role) {
    return axios.post(URL + "/signup", { username, email, password, role });
  }
}

export default new AuthService();
