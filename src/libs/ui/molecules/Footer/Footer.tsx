import { footerContent } from '@whoiscoming-ui/contents/footer';
import { Text } from '@whoiscoming-ui/ui/atoms';
import { classNames } from '@whoiscoming-ui/utilities';

import styles from './Footer.module.css';

import type { CSSProperties } from 'react';

export type FooterProps = {
  style?: CSSProperties;
  className?: string;
};

export const Footer = ({ style, className }: FooterProps) => (
  <footer style={style} className={classNames([styles.footer, className])}>
    <Text as='p' className='mt-24 text-white prose-badge md:hidden'>
      {footerContent.copyRight}
    </Text>
  </footer>
);
