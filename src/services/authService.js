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
    sessionStorage.removeItem("user");
  }

  getCurrentUser() {
    const obj = JSON.parse(window.sessionStorage.getItem("user"));
    return obj.fullname;
  }
}

export default new AuthService();
