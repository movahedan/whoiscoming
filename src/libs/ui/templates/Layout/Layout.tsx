// import { classNames } from '@whoiscoming-ui/utilities';
import React, { useEffect } from "react";
import { Layout as AntLayout } from "antd";

import type { CSSProperties, FC, ReactNode } from "react";
import NavigationBar from "@whoiscoming-ui/ui/organisms/Navbar/Navbar";
import { UserInfoModal } from "@whoiscoming-ui/ui/molecules";
import { useQuery } from "@tanstack/react-query";
import { BASE_URL } from "@whoiscoming-ui/constants";

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

  const campusesQuery = useQuery({
    queryKey: ["campuses"],
    queryFn: async () => {
      const URL = `${BASE_URL}/campuses`;
      const options = {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      };

      const response = await fetch(URL, options);
      const jsonData = await response.json();

      if (jsonData) {
        return jsonData;
      } else {
        throw new Error("Data property not found in the response");
      }
    },
  });

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
      <UserInfoModal
        dataTestId={"user"}
        isLoading={campusesQuery.isLoading}
        campuses={campusesQuery.data}
      />
      {/* <Footer style={{ textAlign: 'center', marginTop:'80px' }}> ©2023  {footer}</Footer> */}
    </AntLayout>
  );
};
