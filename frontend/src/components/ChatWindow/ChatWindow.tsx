import { autorun } from "mobx";
import { observer } from "mobx-react-lite";
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import message from "../../store/message";
import user from "../../store/user";
import { IMessage } from "../../types/IMessage";
import DateDivider from "../DateDivider/DateDivider";
import Message from "../UI/Message/Message";
import cl from "./ChatWindow.module.less";

const ChatWindow = observer(() => {
  const messagesEndRef = useRef<null | HTMLDivElement>(null);
  const messagesTopRef = useRef<null | HTMLDivElement>(null);
  const [holdScrollToBottom, setHoldScrollToBottom] = useState(true);
  const param = useParams();

  useEffect(() => {
    const roomId = param.id;
    message.getMessagesByRoom(roomId!);
  }, [param.id]);

  const handleScroll = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
    const roomId = param.id;
    const height = messagesTopRef.current!.scrollHeight;
    const top = messagesTopRef.current!.scrollTop;
    const client = messagesTopRef.current!.clientHeight;
    if (!message.isLoading && top <= 500) {
      message.getMessagesByRoom(roomId!);
    }
    if (height - top - client <= 500) {
      setHoldScrollToBottom(true);
    } else {
      setHoldScrollToBottom(false);
    }
  };

  autorun(() => {
    if (!message.isLoading && message.page === 2) {
      messagesEndRef.current?.scrollIntoView();
    }
    if (holdScrollToBottom || message.sendMessages.length !== 0) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  },{delay: 10});
  

  const messageElement = (el: IMessage) => {
    return (
      <Message
        key={el.id}
        time={new Date(el.date).toTimeString().slice(0, 5)}
        username={user.user.userId !== el.userId ? el.username : ""}
        position={user.user.userId !== el.userId ? "left" : "right"}
        status={user.user.userId === el.userId ? el.status : "none"}
        body={el.body}
      />
    );
  };

  return (
    <div
      ref={messagesTopRef}
      onScroll={(event) => handleScroll(event)}
      className={cl.container}
    >
      {message.messages.map((el, index, messages) => {       
        if (index !== 0) {
          const prevDate = new Date(messages[index - 1].date);
          const currentDate = new Date(el.date);
          if (
            currentDate.getDate() !== prevDate.getDate() ||
            currentDate.getMonth() !== prevDate.getMonth() ||
            currentDate.getFullYear() !== prevDate.getFullYear()
          ) {
            return (
              <>
                <DateDivider
                  key={new Date(el.date).getTime().toString()}
                  date={
                    prevDate.getDate() +
                    "." +
                    prevDate.getMonth() +
                    "." +
                    prevDate.getFullYear()
                  }
                />
                {messageElement(el)}
              </>
            );
          } else {
            return <>{messageElement(el)}</>;
          }
        }
        return <>{messageElement(el)}</>; 
      })}
      {message.sendMessages.map((el) => <>{messageElement(el)}</> )}
      <div ref={messagesEndRef}></div>
    </div>
  );
});

export default ChatWindow;
