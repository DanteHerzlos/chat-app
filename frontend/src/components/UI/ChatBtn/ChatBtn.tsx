import React from 'react'
import cl from './ChatBtn.module.less'
import { RightCircleOutlined } from "@ant-design/icons";

interface ChatBtnProps {
  onClick?: React.MouseEventHandler<HTMLDivElement>
  Title?: string
}

const ChatBtn:React.FC<ChatBtnProps> = ({onClick, Title}) => {
  return (
    <div onClick={onClick} className={cl.btn}>
      <span>{Title}</span>
      <span className={cl.icon}>
        <RightCircleOutlined />
      </span>
    </div>
  );
}

export default ChatBtn