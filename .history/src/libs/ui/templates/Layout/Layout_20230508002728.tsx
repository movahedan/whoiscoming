// import { classNames } from '@whoiscoming-ui/utilities';
import {   Layout as AntLayout, Menu } from 'antd';
import Link from 'next/link';
import {
 UserOutlined
} from '@ant-design/icons';

const { Header, Content, Footer } = AntLayout;

import type { CSSProperties, FC, ReactNode } from 'react';

export type LayoutProps = {
  footer?: ReactNode;
  style?: CSSProperties;
  className?: string;
  children?: ReactNode;
};
 

export const Layout: FC<LayoutProps> = ({
  footer,
  // style,
  // className,
  children,
}) => {
  
 
  return(
   
    <AntLayout
      className="layout"
      suppressHydrationWarning
      theme="dark"  
    >
        <Header>
        <Menu mode="horizontal" defaultSelectedKeys={['home']}>
          <Menu.Item key="home"> 
            <Link href="/">
              Home
            </Link>
          </Menu.Item>
          <Menu.Item key="Overview">
            <Link href="/overview">
               Overview
            </Link>
          </Menu.Item>
          <Menu.Item key="user" icon={<UserOutlined/>} style={{ float: 'right'}} disabled>
            danjelashehi@gmail.com
          </Menu.Item>
        </Menu> 
      </Header>

      <Content style={{ padding: '50px' }}>
        {children}
        </Content>
        {/* <Footer style={{ textAlign: 'center', marginTop:'80px' }}> ©2023  {footer}</Footer> */}

    </AntLayout>
 
)};
