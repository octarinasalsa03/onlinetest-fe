import axios from "axios";

const API_URL = "http://8088/api/user-management/";

class AuthService {
  //   login(inputData) {
  //     axios
  //       .post(API_URL + "authentication", inputData)
  //       .then((response) => {
  //         console.log(JSON.stringify(response.data.data));
  //         sessionStorage.setItem("user", JSON.stringify(response.data.data));
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   }

  logout() {
    localStorage.removeItem("user");
  }

  getCurrentUser() {
    return JSON.parse(window.localStorage.getItem("user"));
  }
}

export default new AuthService();
