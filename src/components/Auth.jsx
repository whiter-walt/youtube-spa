import { Modal, Input, Form, Button } from "antd";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserAPI } from "../actions/actions";
import { ErrorAlert } from "./ErrorAlert";

export const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const errorMessage = useSelector((state) => state.authReducer.errorMessage);
  const dispatch = useDispatch();

  const authHandler = () => {
    if (email && password) {
      dispatch(getUserAPI(email, password));
      setEmail("");
      setPassword("");
    }
  };

  return (
    <Modal title="Enter the realm..." visible closable={false} footer={false}>
      <Form>
        <Form.Item label="E-mail">
          <Input value={email} onChange={(e) => setEmail(e.target.value)} />
        </Form.Item>
        <Form.Item required label="Password">
          <Input.Password
            value={password}
            visibilityToggle
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Item>
      </Form>
      {errorMessage && <ErrorAlert errorMessage={errorMessage} />}
      <Button block type="primary" onClick={authHandler}>
        Log In
      </Button>
    </Modal>
  );
};
