import "../globals.css";
import { DefaultSeo } from "next-seo";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

import { getDefaultNextSeoConfig } from "@whoiscoming-ui/constants";
import { ErrorBoundary } from "@whoiscoming-ui/ui/utilities";

import type { AppProps, NextWebVitalsMetric } from "next/app";

const isWebVitalsEnabled = true;
export const reportWebVitals = (metric: NextWebVitalsMetric): void => {
  if (isWebVitalsEnabled) {
    console.log(metric);
  }
};

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ErrorBoundary>
      <DefaultSeo
        {...getDefaultNextSeoConfig({
          noIndex: false,
        })}
      />
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </ErrorBoundary>
  );
}
