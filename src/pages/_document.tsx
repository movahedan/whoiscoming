import { Html, Head, Main, NextScript } from 'next/document';

import { fontLinks } from '@whoiscoming-ui/constants/font-links';

export default function Document() {
  return (
    <Html lang='en'>
      <Head>
        <link rel='shortcut icon' href='/favicon.ico' />
        <link rel='apple-touch-icon' sizes='180x180' href='/favicon.ico' />
        <link rel='icon' type='image/png' sizes='32x32' href='/favicon.ico' />
        <link rel='icon' type='image/png' sizes='16x16' href='/favicon.ico' />

        {fontLinks.map((props, index) => (
          <link key={index} {...props} />
        ))}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
