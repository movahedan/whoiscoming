<<<<<<< HEAD
import "../globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { DefaultSeo } from "next-seo";

import { getDefaultNextSeoConfig } from "@whoiscoming-ui/constants";
import { ErrorBoundary } from "@whoiscoming-ui/ui/utilities";

import type { AppProps, NextWebVitalsMetric } from "next/app";

const isWebVitalsEnabled = false;
=======
import '../globals.css';
import { DefaultSeo } from 'next-seo';

import { getDefaultNextSeoConfig } from '@whoiscoming-ui/constants';
import { ErrorBoundary } from '@whoiscoming-ui/ui/utilities';

import type { AppProps, NextWebVitalsMetric } from 'next/app';

const isWebVitalsEnabled = true;
>>>>>>> 78634c5 (Basic setup:)
export const reportWebVitals = (metric: NextWebVitalsMetric): void => {
  if (isWebVitalsEnabled) {
    console.log(metric);
  }
};

<<<<<<< HEAD
const queryClient = new QueryClient();

=======
>>>>>>> 78634c5 (Basic setup:)
export default function App({ Component, pageProps }: AppProps) {
  return (
    <ErrorBoundary>
      <DefaultSeo
        {...getDefaultNextSeoConfig({
          noIndex: false,
        })}
      />
<<<<<<< HEAD
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
=======
      <Component {...pageProps} />
>>>>>>> 78634c5 (Basic setup:)
    </ErrorBoundary>
  );
}
