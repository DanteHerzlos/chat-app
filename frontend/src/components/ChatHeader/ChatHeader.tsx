import React from "react";
import ExitBtn from "../UI/ExitBtn/ExitBtn";
import cl from "./ChatHeader.module.less";

interface ChatHeaderProps {
  roomTitle?: string;
  members?: number;
  onClickExit?: React.MouseEventHandler<HTMLDivElement>;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({
  roomTitle,
  members,
  onClickExit,
}) => {

  let membersTitle = "";
  if (members) {
    if (members % 10 === 1) {
      membersTitle = members + " участник";
    } else if (members % 10 >= 2 && members % 10 <= 4) {
      membersTitle = members + " участникa";
    } else {
      membersTitle = members + " участников";
    }
  }

  return (
    <div className={cl.header}>
      <div className={cl.title}>
        <span className={cl.roomTitle}>{roomTitle}</span>
        <span className={cl.members}>{membersTitle}</span>
      </div>
      <ExitBtn onClick={onClickExit} className={cl.exitBtn} />
    </div>
  );
};

export default ChatHeader;
