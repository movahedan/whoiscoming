import { classNames } from '@whoiscoming-ui/utilities';
import { Breadcrumb, Layout as AntLayout, Menu, theme } from 'antd';

const { Header, Content, Footer } = Layout;

import type { CSSProperties, FC, ReactNode } from 'react';

export type LayoutProps = {
  footer?: ReactNode;
  style?: CSSProperties;
  className?: string;
  children?: ReactNode;
};
 

export const Layout: FC<LayoutProps> = ({
  footer,
  style,
  className,
  children,
}) => (
   
    <AntLayout
      // className={classNames([
      //   'flex flex-col flex-1 w-full min-h-screen overflow-hidden',
      // ])}
      className="layout"
    >
        <Header>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['2']}
          items={new Array(3).fill(null).map((_, index) => {
            const key = index + 1;
            return {
              key,
              label: `nav ${key}`,
            };
          })}
        />
      </Header>

      <main
        style={style}
        className={[
          'relative flex-1 w-full mx-auto px-16 lg:max-w-7xl md:px-32',
          className,
        ]
          .filter(Boolean)
          .join(' ')}
      >
        {children}
      </main>
      {footer}
    </AntLayout>
 
);
