import React from 'react'
import cl from './DateDivider.module.less'

interface DateDividerProps {
  date: string
}

const DateDivider:React.FC<DateDividerProps> = ({date}) => {
  return (
    <div className={cl.date}>
      {date}
    </div>
  );
}

export default DateDivider