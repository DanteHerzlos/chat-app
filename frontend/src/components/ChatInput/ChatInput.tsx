import React from 'react'
import cl from './ChatInput.module.less'
import { Input } from "antd";
import SendBtn from '../UI/SendBtn/SendBtn';

interface ChatInputProps {
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  value?: string;
  onPressEnter?: React.KeyboardEventHandler<HTMLInputElement>
}

const ChatInput: React.FC<ChatInputProps> = ({ onPressEnter, onClick, onChange, value }) => {

  return (
    <div className={cl.container}>
      <Input
        onPressEnter={onPressEnter}
        onChange={onChange}
        value={value}
        className={cl.input}
        placeholder="Сообщение..."
        suffix={<SendBtn onClick={onClick} />}
      />
    </div>
  );
};

export default ChatInput