import { $authHost, $host } from ".";
import { LoginDto } from "../dto/LoginDto";

export default class AuthService {
  static async login(dto: LoginDto) {
    return await $host.post("/token/", dto);
  }

  static async logout() {
    return await $authHost.post("/auth/logout/");
  }

  static async refresh() {
    const refresh = localStorage.getItem('refresh')
    if(refresh) return await $host.post("/token/refresh/", {refresh});
    return null
  }
}