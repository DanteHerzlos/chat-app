import React from 'react'
import AuthForm from '../../components/AuthForm/AuthForm'
import cl from './AuthPage.module.less'


const AuthPage = () => {
  return (
    <div className={cl.background}>
      <div className={cl.container}>
        <div className={cl.auth}>
          <AuthForm />     
        </div>
      </div>
    </div>
  )
}

export default AuthPage