// import { classNames } from '@whoiscoming-ui/utilities';
import React, { useEffect } from "react";
import { Layout as AntLayout } from "antd";

import type { CSSProperties, FC, ReactNode } from "react";
import NavigationBar from "@whoiscoming-ui/ui/organisms/Navbar/Navbar";
import { UserInfoModal } from "@whoiscoming-ui/ui/molecules";

const { Content } = AntLayout;

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
  const [email, setEmail] = React.useState("");

  useEffect(() => {
    setEmail(localStorage.getItem("email") || "");
  }, []);

  const onLogout = () => {
    localStorage.setItem("email", "");
    window.location.reload();
  };
  return (
    <AntLayout className="layout" suppressHydrationWarning>
      <NavigationBar userEmail={email} onLogout={onLogout} />

      <Content style={{ padding: "20px", background: "white" }}>
        {children}
      </Content>
      <UserInfoModal dataTestId={"user"} />
      {/* <Footer style={{ textAlign: 'center', marginTop:'80px' }}> ©2023  {footer}</Footer> */}
    </AntLayout>
  );
};
