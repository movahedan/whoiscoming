import { siteDescription, siteName } from '@whoiscoming-ui/contents/website';

import type { NextSeoProps } from 'next-seo';

export const getDefaultNextSeoConfig = ({
  noIndex = false,
} = {}): NextSeoProps => ({
  noindex: noIndex,
  nofollow: noIndex,

  titleTemplate: `%s | ${siteName}`, // Replaces %s with your title string
  defaultTitle: siteName,
  description: siteDescription,

  openGraph: {
    type: 'website',
    locale: 'en_IE',
    site_name: siteName,
  },

  additionalMetaTags: [
    {
      name: 'viewport',
      content:
        'width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=5,user-scalable=yes,viewport-fit=cover',
    },
    {
      httpEquiv: 'x-ua-compatible',
      content: 'IE=edge',
    },
  ],
});
