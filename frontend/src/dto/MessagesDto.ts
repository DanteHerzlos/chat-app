export interface MessagesDto {
  id: number
  body: string
  room: string
  created: string
  user: {
    id: number
    username: string
  }
}
