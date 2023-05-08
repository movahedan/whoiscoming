// import { classNames } from '@whoiscoming-ui/utilities';
import {   Layout as AntLayout, Menu } from 'antd';
import Link from 'next/link';

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
    >
        <Header>
        <Menu mode="horizontal" theme="dark"  defaultSelectedKeys={['home']}>
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
          <Menu.Item key="Overview" icon='user'>
            danjelashehi@gmail.com
          </Menu.Item>
        </Menu> 
      </Header>

      <Content style={{ padding: '0 50px' }}>
        {children}
        </Content>
        <Footer style={{ textAlign: 'center' }}> ©2023  {footer}</Footer>

    </AntLayout>
 
)};
