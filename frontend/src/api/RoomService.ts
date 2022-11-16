import { AxiosResponse } from "axios";
import { $authHost } from ".";
import { IRoom } from "../types/IRoom";

export default class RoomService {
  static async getRooms(): Promise<AxiosResponse<IRoom[]>> {
    return await $authHost.get("/rooms");
  }
  
  static async createRoom(name: string): Promise<AxiosResponse<IRoom>> {
    const customConfig = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    return await $authHost.post("/rooms/create/", name, customConfig);
  }
}