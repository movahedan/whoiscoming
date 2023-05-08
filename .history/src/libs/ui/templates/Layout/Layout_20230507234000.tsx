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
      // className={classNames([
      //   'flex flex-col flex-1 w-full min-h-screen overflow-hidden',
      // ])}
      className="layout"
    >
        <Header>
        <Menu mode="horizontal">
          <Menu.Item key="home">
            <Link href="/">
              <a>Home</a>
            </Link>
          </Menu.Item>
          <Menu.Item key="Overview">
            <Link href="/overview">
              <a>Overview</a>
            </Link>
          </Menu.Item>
        </Menu> 
      </Header>

      <Content style={{ padding: '0 50px' }}>
        {children}
        </Content>
        <Footer style={{ textAlign: 'center' }}> ©2023  {footer}</Footer>

    </AntLayout>
 
)};
