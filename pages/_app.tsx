import { ApolloProvider } from '@apollo/client';
import '@styles/index.scss';
import moment from 'moment';
import 'moment/locale/es';
import type { AppProps } from 'next/app';
import Router from 'next/router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { addLocale, locale } from 'primereact/api';
import { useEffect } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { defaults } from 'react-sweet-state';
import { ToastProvider } from 'react-toast-notifications';
import client from 'src/services/client';

NProgress.configure({ showSpinner: false });
Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

const setLocale = () => {
  addLocale('es', {
    firstDayOfWeek: 1,
    dayNames: [
      'Domingo',
      'Lunes',
      'Martes',
      'Miércoles',
      'Jueves',
      'Viernes',
      'Sábado',
    ],
    dayNamesShort: ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'],
    dayNamesMin: ['D', 'L', 'M', 'X', 'J', 'V', 'S'],
    monthNames: [
      'Enero',
      'Febrero',
      'Marzo',
      'Abril',
      'Mayo',
      'Junio',
      'Julio',
      'Agosto',
      'Septiembre',
      'Octubre',
      'Noviembre',
      'Diciembre',
    ],
    monthNamesShort: [
      'Ene',
      'Feb',
      'Nar',
      'Abr',
      'May',
      'Jun',
      'Jul',
      'Ago',
      'Sep',
      'Oct',
      'Nov',
      'Dic',
    ],
    today: 'Hoy',
    clear: 'Limpiar',
  });
  locale('es');
  moment.locale('es');
};

const SafeHydrate: React.FC = ({ children }) => {
  return (
    <div suppressHydrationWarning>
      {typeof window === 'undefined' ? null : children}
    </div>
  );
};

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    defaults.devtools = true;
    setLocale();
  }, []);

  return (
    <SafeHydrate>
      <QueryClientProvider client={new QueryClient()}>
        <ApolloProvider client={client}>
          <ToastProvider
            autoDismiss
            autoDismissTimeout={15000}
            placement="top-right"
          >
            <Component {...pageProps} />
          </ToastProvider>
        </ApolloProvider>
      </QueryClientProvider>
    </SafeHydrate>
  );
}
export default MyApp;
