import React, { useEffect, useState } from "react";
import ChatInput from "../../components/ChatInput/ChatInput";
import ChatHeader from "../../components/ChatHeader/ChatHeader";
import cl from "./ChatPage.module.less";
import ChatWindow from "../../components/ChatWindow/ChatWindow";
import { useNavigate, useParams } from "react-router-dom";
import user from "../../store/user";
import message from "../../store/message";
import { v4 as uuidv4 } from "uuid";
import room from "../../store/room";
import { autorun } from "mobx";


const ChatPage = () => {
  const [members, setMembers] = useState<number>(0)
  const [roomTitle, setRoomTitle] = useState<string>('')
  const [inputValue, setInputValue] = useState<string>("");
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const navigate = useNavigate();
  const param = useParams();
  
  useEffect(() => {
    const roomId = param.id;
    autorun(() => {
      const roomId = param.id;
      if (room.rooms.length !== 0) {
        setRoomTitle(room.rooms.find((el) => el.id === roomId)!.name);
      } else {
        room.getRooms();
      }
    });
    const wsocket = new WebSocket(
      `ws:/localhost:8000/ws/socket-server/${roomId}/`
    );
    setSocket(wsocket);
    wsocket.onopen = () => {
      wsocket.onmessage = (e) => {
        const data = JSON.parse(e.data);
        if (data.type === "chat") {
          if (data.username !== user.user.username) {
            message.addMessage({
              body: data.message,
              username: data.username,
              date: data.date,
              userId: data.userId,
              id: data.id,
              status: "none",
            });
            setMembers(data.members);
          } else {
            message.recievedMessage(data.tempId, data.id, data.date);
            setMembers(data.members);
          }
        } else if (data.type === "join") {
          setMembers(data.members);
        }
      };
      wsocket.onclose = (e) => {
        navigate("/");
      };
    };
  }, [param.id, navigate]);

  const onSubmitHandler = () => {
    if(inputValue !== '' && socket){
      const tempId = uuidv4();
      socket.send(
        JSON.stringify({
          type: "send_message",
          message: inputValue,
          username: user.user.username,
          userId: user.user.userId,
          tempId: tempId,
        })
      )

      const date = new Date();   
      message.sendMessage({
        body: inputValue,
        username: user.user.username,
        date: date.toUTCString(),
        userId: user.user.userId,
        id: tempId,
        status: "transmitted",
      });
      
      setInputValue('')
    }
  }

  const onClickExit = () => {
    message.clearMessageList()
    socket?.close()
    navigate('/')
  }

  return (
    <div className={cl.chatPage}>
      <div className={cl.chatContainer}>
        <ChatHeader
          onClickExit={onClickExit}
          members={members}
          roomTitle={roomTitle}
        />
        <ChatWindow />
        <ChatInput
          value={inputValue}
          onPressEnter={onSubmitHandler}
          onChange={(e) => setInputValue(e.target.value)}
          onClick={onSubmitHandler}
        />
      </div>
    </div>
  );
};

export default ChatPage;
