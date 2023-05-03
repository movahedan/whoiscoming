import { classNames } from '@whoiscoming-ui/utilities';

import styles from './Button.module.css';

import type { CSSProperties, ReactNode } from 'react';

type ButtonProps = {
<<<<<<< HEAD
=======
  outline?: boolean;
>>>>>>> 78634c5 (Basic setup:)
  icon?: ReactNode;
  dataTestId?: string;
  style?: CSSProperties;
  className?: string;
  children: ReactNode;
};

export const Button = ({
<<<<<<< HEAD
=======
  outline = false,
>>>>>>> 78634c5 (Basic setup:)
  icon,
  dataTestId,
  style,
  className,
  children,
}: ButtonProps) => (
  <button
    data-testid={dataTestId}
    style={style}
<<<<<<< HEAD
    className={classNames([styles.button, className || ''])}
=======
    className={classNames([
      styles.button,
      outline ? styles.outline : styles.default,
      className || '',
    ])}
>>>>>>> 78634c5 (Basic setup:)
  >
    {icon && <span className='mr-20'>{icon}</span>}
    {children}
  </button>
);
