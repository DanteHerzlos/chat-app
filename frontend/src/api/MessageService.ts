import { AxiosResponse } from "axios";
import { $authHost } from ".";
import { MessagesDto } from "../dto/MessagesDto";

export default class MessageService {
  static async getMessagesByRoom(
    id: string,
    page: number,
    lastMessageId: string
  ): Promise<AxiosResponse<MessagesDto[]>> {
    return await $authHost.get(
      `messages/room?id=${id}&page=${page}&lastMessageId=${lastMessageId}`
    );
  }
}
