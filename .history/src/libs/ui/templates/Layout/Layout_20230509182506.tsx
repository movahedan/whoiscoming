// import { classNames } from '@whoiscoming-ui/utilities';
import { UserOutlined } from "@ant-design/icons";
import { Layout as AntLayout, Menu } from "antd";
import Link from "next/link";

import type { CSSProperties, FC, ReactNode } from "react";

const { Header, Content } = AntLayout;

export type LayoutProps = {
  footer?: ReactNode;
  style?: CSSProperties;
  className?: string;
  children?: ReactNode;
};

export const Layout: FC<LayoutProps> = ({
  // footer,
  // style,
  // className,
  children,
}) => {
  const user = localStorage?.getItem("email") || "";
  return (
    <AntLayout className="layout" suppressHydrationWarning>
      <Header>
        <Menu mode="horizontal" theme="dark" defaultSelectedKeys={["home"]}>
          <Menu.Item key="home">
            <Link href="/">Home</Link>
          </Menu.Item>
          <Menu.Item key="Overview">
            <Link href="/overview">Overview</Link>
          </Menu.Item>
          <Menu.Item
            key="user"
            icon={<UserOutlined />}
            style={{ float: "right" }}
            disabled
          >
            {user}
          </Menu.Item>
        </Menu>
      </Header>

      <Content style={{ padding: "20px", background: "white" }}>
        {children}
      </Content>
      {/* <Footer style={{ textAlign: 'center', marginTop:'80px' }}> ©2023  {footer}</Footer> */}
    </AntLayout>
  );
};
