import { Form, Input, Button } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import React, { Fragment } from "react";
import axios from "axios";
import "./Login.css";

const Login = () => {
  const onFinish = (values) => {
    // console.log('Received values of form: ', values);
    axios
      .post("http://localhost:5000/api/users/login", {
        email: values.username,
        password: values.password,
      })
      .then(function (response) {
        localStorage.setItem("usertoken", response.data.token);
        // use => localStorage.getItem('usertoken') for accessing usertoken

        // code - when login is successful
        window.location = "/";
      })
      .catch(function (error) {
        console.log(error);

        // code - display error on screen when error occurs
      });
  };

  return (
    <Fragment>
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your Username!",
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Username"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your Password!",
            },
          ]}
        >
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <a className="login-form-forgot" href="https://fcrit.ac.in">
            Forgot password
          </a>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Log in
          </Button>
          &nbsp; Or <a href="/register">register now!</a>
        </Form.Item>
      </Form>
    </Fragment>
  );
};

export default Login;
