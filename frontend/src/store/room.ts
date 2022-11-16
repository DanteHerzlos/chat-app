import { makeAutoObservable, runInAction } from "mobx";
import RoomService from "../api/RoomService";
import { IRoom } from "../types/IRoom";

export class Room {
  rooms: IRoom[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  async getRooms() {
    try {
      
      const response = await RoomService.getRooms();
      runInAction(() => {
        this.rooms = response.data;
      });
    } catch (error) {
      console.log(error);
    }
  }

  async addRoom(name: string) {
    try {
      const {data} = await RoomService.createRoom(name);
      runInAction(() => {
        this.rooms.push(data);
      });
    } catch (error: Error | any) {
      console.log(error.message);
    }
  }
}

export default new Room();
