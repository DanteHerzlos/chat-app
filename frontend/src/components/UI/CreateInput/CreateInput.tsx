import React from "react";
import { Input, Button } from "antd";
import cl from "./CreateInput.module.less";

interface CreateInputProps {
  onClick?: React.MouseEventHandler<HTMLElement>;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  value?: string;
}

const CreateInput: React.FC<CreateInputProps> = ({
  onClick,
  onChange,
  value,
}) => {
  return (
    <Input.Group>
      <Input
        onChange={onChange}
        value={value}
        className={cl.input}
        placeholder="Введите название чата"
        suffix={
          <Button className={cl.btn} type="primary" onClick={onClick}>
            Создать
          </Button>
        }
      />
    </Input.Group>
  );
};

export default CreateInput;
