<<<<<<< HEAD
import React from "react";
import { Layout, Menu } from "antd";
import {
  HomeOutlined,
  AppstoreOutlined,
  SettingOutlined,
  UserOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import { useRouter } from "next/router";

const { Header } = Layout;

interface NavbarProps {
  userEmail: string | null;
  onLogout: () => void;
}
const NavigationBar = ({ userEmail, onLogout }: NavbarProps) => {
  const router = useRouter();

  const getSelectedKey = () => {
    switch (router.pathname) {
      case "/":
        return "1";
      case "/overview":
        return "2";
      case "/preferences":
        return "3";
      default:
        return "1";
    }
  };

  return (
    <Header>
      <Menu
        theme="dark"
        mode="horizontal"
        selectedKeys={[getSelectedKey()]}
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <div>
          <Menu.Item key="1" icon={<HomeOutlined />}>
            <Link href="/">Home</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<AppstoreOutlined />}>
            <Link href="/overview">Overview</Link>
          </Menu.Item>
          <Menu.Item key="3" icon={<SettingOutlined />}>
            <Link href="/preferences">Preferences</Link>
          </Menu.Item>
        </div>
        <div>
          <Menu.Item key="4" icon={<UserOutlined />} disabled>
            {userEmail}
          </Menu.Item>
          <Menu.Item
            key="5"
            icon={<LogoutOutlined />}
            onClick={onLogout}
          ></Menu.Item>
        </div>
      </Menu>
    </Header>
  );
};

export default NavigationBar;
=======
import { classNames } from '@whoiscoming-ui/utilities';

import type { CSSProperties } from 'react';

export type NavbarProps = {
  style?: CSSProperties;
  className?: string;
};

export const Navbar = ({ style, className }: NavbarProps) => (
  <nav
    style={style}
    className={classNames(['flex items-center', className])}
  ></nav>
);
>>>>>>> 78634c5 (Basic setup:)
