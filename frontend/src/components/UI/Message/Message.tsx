import React from 'react'
import cl from './Message.module.less'
import LeftMessageArrow from '../../SVG/LeftMessageArrow';
import RigthMessageArrow from '../../SVG/RigthMessageArrow';
import CheckedStatus from '../CheckedStatus/CheckedStatus';


interface MessageProps {
  body?: string;
  position: "right" | "left";
  username?: string;
  status?: "transmitted" | "recieved" | "none";
  time: string
}

const Message: React.FC<MessageProps> = ({
  body,
  position,
  username,
  time,
  status = "none",
}) => {
  return (
    <div
      className={
        position === "right"
          ? [cl.messageBox, cl.right].join(" ")
          : [cl.messageBox, cl.left].join(" ")
      }
    >
      <div className={cl.leftArrow}>
        <LeftMessageArrow />
      </div>
      <div className={cl.body}>
        <div className={cl.username}>{username}</div>
        {body}
        <div className={cl.time}>
          {time}
          <CheckedStatus status={status} />
        </div>
      </div>
      <div className={cl.rightArrow}>
        <RigthMessageArrow />
      </div>
    </div>
  );
};

export default Message