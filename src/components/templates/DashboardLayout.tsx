import React, { ReactNode } from "react";
import { Layout, Typography, Divider } from "antd";

const { Header, Content, Footer } = Layout;
const { Title } = Typography;

interface DashboardLayoutProps {
  title: string;
  children: ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  title,
  children,
}) => {
  return (
    <Layout className="min-h-screen">
      <Header className="flex items-center bg-white shadow-md">
        <div className="container mx-auto px-4">
          <Title
            level={3}
            style={{
              color: "white",
              justifySelf: "center",
              marginTop: 10,
            }}
          >
            {title}
          </Title>
        </div>
      </Header>

      <Content className="container mx-auto px-4 py-6">{children}</Content>

      <Footer className="text-center">
        <Divider />
        <p>Stock Price Dashboard ©{new Date().getFullYear()}</p>
        <p className="text-xs">Powered by Finnhub API</p>
      </Footer>
    </Layout>
  );
};

export default DashboardLayout;
