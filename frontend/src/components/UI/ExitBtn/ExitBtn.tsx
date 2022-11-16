import React from 'react'
import { ImportOutlined } from '@ant-design/icons'
import cl from './ExitBtn.module.less'

interface ExitBtnProps {
  onClick?: React.MouseEventHandler<HTMLDivElement> 
  className?: string
}

const ExitBtn:React.FC<ExitBtnProps> = ({onClick, className}) => {
  return (
    <div className={cl.btn +  ' ' + className}>
      <ImportOutlined onClick={onClick} />
    </div>
  )
}

export default ExitBtn