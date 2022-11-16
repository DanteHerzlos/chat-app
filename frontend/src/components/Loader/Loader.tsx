import React from 'react'
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import cl from './Loader.module.less'

const Loader = () => {
  const antIcon = <LoadingOutlined className={cl.spinner} spin />
  return (
    <div className={cl.container}>
      <Spin indicator={antIcon} />
    </div>
  );
}

export default Loader