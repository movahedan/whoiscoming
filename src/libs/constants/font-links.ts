import type { LinkHTMLAttributes } from 'react';

export const fontLinks: Array<LinkHTMLAttributes<HTMLLinkElement>> = [
  {
    rel: 'preconnect',
    href: 'https://css.gstatic.com/',
    crossOrigin: '',
  },
  {
    rel: 'preload',
    as: 'style',
    href: '/css/font.css',
  },
  {
    rel: 'stylesheet',
    href: '/css/font.css',
  },
];
