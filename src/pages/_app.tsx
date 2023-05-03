import '../globals.css';
import { DefaultSeo } from 'next-seo';

import { getDefaultNextSeoConfig } from '@whoiscoming-ui/constants';
import { ErrorBoundary } from '@whoiscoming-ui/ui/utilities';

import type { AppProps, NextWebVitalsMetric } from 'next/app';

const isWebVitalsEnabled = true;
export const reportWebVitals = (metric: NextWebVitalsMetric): void => {
  if (isWebVitalsEnabled) {
    console.log(metric);
  }
};

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ErrorBoundary>
      <DefaultSeo
        {...getDefaultNextSeoConfig({
          noIndex: false,
        })}
      />
      <Component {...pageProps} />
    </ErrorBoundary>
  );
}
