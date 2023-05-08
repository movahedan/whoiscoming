import { classNames } from '@whoiscoming-ui/utilities';

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
  <>
    <div
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
    </div>
  </>
);
