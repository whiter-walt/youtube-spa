import { Alert } from "antd";

export const ErrorAlert = ({ errorMessage }) => {
  return (
    <div className="error-alert">
      <Alert message={errorMessage} type={"error"} />
    </div>
  );
};
