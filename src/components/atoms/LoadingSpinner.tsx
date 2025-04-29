import React from "react";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

interface LoadingSpinnerProps {
  size?: number;
  tip?: string;
  className?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 24,
  tip = "Loading...",
  className = "",
}) => {
  const antIcon = <LoadingOutlined style={{ fontSize: size }} spin />;

  return (
    <div className={`flex justify-center items-center py-8 ${className}`}>
      <Spin indicator={antIcon} tip={tip} />
    </div>
  );
};

export default LoadingSpinner;
