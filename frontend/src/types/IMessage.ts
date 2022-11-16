export interface IMessage {
  id: string;
  userId: string;
  username: string;
  date: string;
  body: string;
  status: "recieved" | "transmitted" | "none";
}
