import { Button, Form, Input } from "antd";
import { observer } from "mobx-react-lite";
import React from "react";
import user from "../../store/user";
import cl from './AuthForm.module.less'

const AuthForm: React.FC = observer(() => {
  const [form] = Form.useForm();

  const onFinish = async () => {
    await user.login(form.getFieldsValue());  
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      form={form}
      name="basic"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item className={cl.authTitle}>
        <span>Авторизация</span>
      </Form.Item>
      <Form.Item
        name="username"
        rules={[{ required: true, message: "Пожалуйста введите логин!" }]}
      >
        <Input className={cl.input} placeholder="Логин" />
      </Form.Item>

      <Form.Item
        name="password"
        rules={[{ required: true, message: "Пожалуйста введите пароль!" }]}
      >
        <Input.Password className={cl.input} placeholder="Пароль" />
      </Form.Item>

      <Form.Item className={cl.authBtn}>
        <Button className={cl.btn} type="primary" htmlType="submit">
          Войти
        </Button>
      </Form.Item>
    </Form>
  );
});


export default AuthForm;
