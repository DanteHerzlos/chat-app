import { makeAutoObservable, runInAction } from "mobx";
import MessageService from "../api/MessageService";
import { IMessage } from "../types/IMessage";

export class Message {
  messages: IMessage[];
  sendMessages: IMessage[];
  page: number;
  maxPage: number;
  isLoading: boolean;
  lastMessageId: string;

  constructor() {
    this.messages = [];
    this.sendMessages = [];
    this.page = 1;
    this.maxPage = 1;
    this.isLoading = false;
    this.lastMessageId = "";
    makeAutoObservable(this);
  }

  *getMessagesByRoom(id: string) {
    if (this.page > this.maxPage) return undefined;
    try {
      this.isLoading = true;
      const { data } = yield MessageService.getMessagesByRoom(
        id,
        this.page,
        this.lastMessageId
      );
      this.maxPage = data.maxPage;

      this.page += 1;
      const newMessages = data.items.map((el: any) => {
        return {
          id: el.id.toString(),
          userId: el.user.id.toString(),
          username: el.user.username,
          date: el.created,
          body: el.body,
          status: "recieved",
        };
      }) as IMessage[];
      this.lastMessageId = newMessages[0].id;
      this.messages = [...newMessages, ...this.messages];
    } catch (error) {
      console.log(error);
    } finally {
      this.isLoading = false;
    }
  }

  addMessage(message: IMessage) {
    runInAction(() => {
      this.messages.push(message);
    })
  }

  sendMessage(message: IMessage) {
    runInAction(() => {
      this.sendMessages.push(message);
    });
  }

  recievedMessage(tempId: string, DBid: string, date: string) {
    const message = this.sendMessages.find((el) => el.id === tempId);
    if (message) {
      message.status = "recieved";
      message.id = DBid;
      message.date = date;
    } else {
      throw new Error("can't find a message with this id: " + tempId);
    }
    runInAction(() => {
      this.sendMessages = this.sendMessages.filter((el) => el !== message);
      this.messages.push(message);
    });
  }

  clearMessageList() {
    runInAction(() => {
      this.messages = [];
      this.sendMessages = [];
      this.page = 1;
      this.maxPage = 1;
      this.lastMessageId = "";
    });
  }
}

export default new Message();
