import React from "react";
import { Button } from "antd";
import type { ButtonProps } from "antd";
import { PlusOutlined, SyncOutlined } from "@ant-design/icons";

type IconType = "plus" | "sync" | null;

interface ActionButtonProps extends ButtonProps {
  label: string;
  iconType?: IconType;
}

const iconMap = {
  plus: <PlusOutlined />,
  sync: <SyncOutlined />,
};

const ActionButton: React.FC<ActionButtonProps> = ({
  label,
  iconType = null,
  ...rest
}) => {
  return (
    <Button
      type="primary"
      icon={iconType ? iconMap[iconType] : undefined}
      {...rest}
    >
      {label}
    </Button>
  );
};

export default ActionButton;
