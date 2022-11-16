import React from 'react'
import { CheckOutlined } from "@ant-design/icons"
import cl from './CheckedStatus.module.less'

interface CheckedStatusProps {
  status: "transmitted" | "recieved" | "none";
}

const CheckedStatus:React.FC<CheckedStatusProps> = ({status}) => {
  return (
    <>
      {status === 'none' ? <></> :
      <span className={cl.container}>
        <span className={cl.rightCheck}>
          <CheckOutlined />
        </span>
        <span className={status === "recieved" ? '' : cl.hide}>
          <CheckOutlined />
        </span>
      </span>
      }
    </>
  );
}

export default CheckedStatus