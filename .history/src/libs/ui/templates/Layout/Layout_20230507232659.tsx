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

const { Header, Footer, Sider, Content } = AntLayout;

export const Layout: FC<LayoutProps> = ({
  footer,
  style,
  className,
  children,
}) => (
  <Space direction="vertical" style={{ width: '100%' }} size={[0, 48]}>
    <AntLayout
      className={classNames([
        'flex flex-col flex-1 w-full min-h-screen overflow-hidden',
      ])}
    >
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
  </Space>
);
