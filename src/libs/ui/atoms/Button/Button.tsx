import { classNames } from '@whoiscoming-ui/utilities';

import styles from './Button.module.css';

import type { CSSProperties, ReactNode } from 'react';

type ButtonProps = {
  icon?: ReactNode;
  dataTestId?: string;
  style?: CSSProperties;
  className?: string;
  children: ReactNode;
};

export const Button = ({
  icon,
  dataTestId,
  style,
  className,
  children,
}: ButtonProps) => (
  <button
    data-testid={dataTestId}
    style={style}
    className={classNames([styles.button, className || ''])}
  >
    {icon && <span className='mr-20'>{icon}</span>}
    {children}
  </button>
);
