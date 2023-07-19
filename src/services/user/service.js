import axios from "axios";
import authHeader from "../dataService";

const API_URL = "http://localhost:8088/candidate-management/";

class UserService {
  getCandidate() {
    return axios.get(API_URL + "candidate", {
      headers: authHeader(),
    });
  }

  getParticipant() {
    return axios.get(API_URL + "participant", {
      headers: authHeader(),
    });
  }
}

export default new UserService();
