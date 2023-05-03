import { classNames } from '@whoiscoming-ui/utilities';

import styles from './Text.module.css';

import type { CSSProperties, ReactNode } from 'react';

type TextProps = {
  as?: keyof HTMLElementTagNameMap;
  hover?: boolean;
  inline?: boolean;
  dataTestId?: string;
  style?: CSSProperties;
  className?: string;
  children: ReactNode;
};

export const Text = ({
  as: As = 'p',
  hover = false,
  inline = false,
  dataTestId,
  style,
  className,
  children,
}: TextProps) => (
  <As
    data-testid={dataTestId}
    style={style}
    className={classNames([
      'prose',
      styles.text,
      hover ? styles.hover : undefined,
      inline ? 'inline-flex items-center' : 'flex items-center',
      className || '',
    ])}
  >
    {children}
  </As>
);
