import { Modal, Input, Form, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getUserAPI } from "../actions/actions";
import { ErrorAlert } from "./ErrorAlert";

export const Auth = () => {
  const errorMessage = useSelector((state) => state.authReducer.errorMessage);
  const dispatch = useDispatch();

  const authHandler = (e) => {
    if (e.email && e.password) {
      dispatch(getUserAPI(e.email, e.password));
    }
  };

  return (
    <Modal title="Enter the realm..." visible closable={false} footer={false}>
      <Form onFinish={authHandler}>
        <Form.Item label="E-mail" name="email">
          <Input />
        </Form.Item>
        <Form.Item required label="Password" name="password">
          <Input.Password visibilityToggle />
        </Form.Item>
        <Form.Item>
          <Button block type="primary" htmlType="submit">
            Log In
          </Button>
        </Form.Item>
      </Form>
      {errorMessage && <ErrorAlert errorMessage={errorMessage} />}
    </Modal>
  );
};
