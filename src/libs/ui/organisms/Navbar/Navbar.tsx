import { classNames } from '@whoiscoming-ui/utilities';

import type { CSSProperties } from 'react';

export type NavbarProps = {
  style?: CSSProperties;
  className?: string;
};

export const Navbar = ({ style, className }: NavbarProps) => (
  <nav
    style={style}
    className={classNames(['flex items-center', className])}
  ></nav>
);
