import { makeAutoObservable, runInAction } from "mobx";
import AuthService from "../api/AuthService";
import { LoginDto } from "../dto/LoginDto";
import { IUser } from "../types/IUser";
import jwt_decode from "jwt-decode";
import { JWTPayload } from "../types/JWTPayload.";

class User {
  user: IUser = {} as IUser;
  isLoading: boolean = false;
  constructor() {
    makeAutoObservable(this);
  }

  async login(dto: LoginDto) {
    this.isLoading = true;
    try {
      const { data } = await AuthService.login(dto);
      const { user_id, username } = jwt_decode<JWTPayload>(data.access);
      runInAction(() => {
        this.user = {
          userId: user_id.toString(),
          isAuth: true,
          username: username,
        };
      });
      localStorage.setItem("token", data.access);
      localStorage.setItem("refresh", data.refresh);
    } catch (e: any) {
      console.log("Неверное имя пользователя и/или пароль");
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  }

  async checkAuth() {
    this.isLoading = true;
    try {
      const response = await AuthService.refresh();
      if(response !== null) {
        const { user_id, username } = jwt_decode<JWTPayload>(
          response.data.access
        );
        runInAction(() => {
          this.user = { 
            userId: user_id.toString(),
            isAuth: true,
            username: username,
          };
        });

        localStorage.setItem("token", response.data.access);
      }else {
        this.user.isAuth = false
      }

    } catch (e: any) {
      console.log("Неверный token");
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  }

  async logout() {
    this.isLoading = true;
    try {
      localStorage.clear();
      runInAction(() => {
        this.user = { userId: '', isAuth: false, username: '' };
      });
    } catch (e: any) {
      console.log("Ошибка сервера");
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  }
}

export default new User();
