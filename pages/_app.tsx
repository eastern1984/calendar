import '../styles/globals.css'
import { useState, useEffect } from 'react';
import type { AppProps } from 'next/app'
import Layout from '../components/layout/Layout';
import { ThemeProvider } from "@mui/material/styles";
import getTheme from '../components/layout/theme';
import { IntlProvider } from "react-intl";
import { useRouter } from 'next/router';
import ru from "../lang/ru.json";
import en from "../lang/en.json";
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AxiosInstanceProvider } from '../requests/axios';
import { QueryClientProvider, QueryClient } from "react-query";
import 'moment/locale/ru';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      retry: false,
      cacheTime: Infinity,
    },
    mutations: {
      // mutation options
    },
  },
});

const messages: any = {
  ru,
  en,
};

export default function App({ Component, pageProps }: AppProps) {
  const { locale } = useRouter();
  const [isSSR, setIsSSR] = useState(true);

  useEffect(() => {
    setIsSSR(false);
  }, []);

  return (
    <>
      <IntlProvider locale={locale || "en"} messages={messages[locale || "en"]}>
        <QueryClientProvider client={queryClient}>
          <AxiosInstanceProvider>
            <LocalizationProvider dateAdapter={AdapterMoment} >
              <ThemeProvider theme={getTheme()}>
                {!isSSR &&
                  <Layout>
                    <Component {...pageProps} />
                  </Layout>
                }
              </ThemeProvider>
            </LocalizationProvider>
          </AxiosInstanceProvider>
        </QueryClientProvider>
      </IntlProvider>
    </>
  )
}
