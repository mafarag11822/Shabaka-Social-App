import axios from "axios";
import { loginUrl, profileDataUrl, registerUrl } from "../APIs/apis";
import type { RegisterData } from "../types/registerData";
import type { LoginData } from "../types/loginData";

class AuthServices {
  async signUp(registerData: RegisterData) {
    const { data } = await axios.post(registerUrl, registerData);
    return data;
  }
  async login(loginData: LoginData) {
    const { data } = await axios.post(loginUrl, loginData);
    return data;
  }
  async getProfileData() {
    const { data } = await axios.get(profileDataUrl, {
      headers: { token: localStorage.getItem("token") },
    });
    return data;
  }
}
const authServices = new AuthServices();
export default authServices;
