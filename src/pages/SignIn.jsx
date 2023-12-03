import {  Form, Input, message } from "antd";
import { useState } from "react";
import { useMainContext } from "../contexts/MainContextProvider";
import { useNavigate } from "react-router-dom";
import useSignIn from "../hooks/authHooks";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setAdminStatus } = useMainContext();
  const navigate = useNavigate();
  const { loading, error, signIn } = useSignIn();

  const onFinish = async (values) => {
    try {
      const { admin, user } = await signIn(values.email, values.password);

      if (admin) {
        setAdminStatus(true);
        message.success("User logged in as Admin");
        navigate("/LunchMenu");
      } else {
        setAdminStatus(false);
        message.warning("User is not an Admin");
      }
    } catch (error) {
      console.error("onFinish error:", error.message);
      message.error(error.message);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("onFinishFailed called");
    console.error("Failed:", errorInfo);
    message.error("Please fill all  the fields.");
  };

  return (
    <div className="h-screen w-full flex flex-col justify-center items-center gap-5 p-5">
      <img alt="restaurant logo" src="/kasthamandap.jpeg" className="h-2/6" />
      <h2 className="my-6 text-center text-3xl font-extrabold text-gray-900">
        Admin Dashboard
      </h2>
      <Form
        className="flex flex-col gap-5 w-full"
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 8,
        }}
        style={{
          maxWidth: 600,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          className="w-full"
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your email!",
            },
          ]}
          wrapperCol={{
            span: 9,
          }}
        >
          <Input onChange={(e) => setEmail(e.target.value)} />
        </Form.Item>

        <Form.Item
          className="w-full"
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
          wrapperCol={{
            span: 9,
          }}
        >
          <Input.Password onChange={(e) => setPassword(e.target.value)} />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <button className=" bg-blue-950 text-white py-2 px-10 rounded-3xl md:ml-12">
            Login
          </button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default SignIn;
