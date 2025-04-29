import React from "react";
import HomePage from "./components/pages/HomePage";
import { ConfigProvider } from "antd";

const App: React.FC = () => {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#1890ff",
        },
      }}
    >
      <HomePage />
    </ConfigProvider>
  );
};

export default App;
