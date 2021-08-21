import '@styles/index.scss';
import moment from 'moment';
import 'moment/locale/es';
import type { AppProps } from 'next/app';
import { addLocale, locale } from 'primereact/api';
import { useEffect } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { defaults } from 'react-sweet-state';
import { ToastProvider } from 'react-toast-notifications';

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
        {/* <ApolloProvider client={client}> */}
        {/* <Provider store={store}> */}
        <ToastProvider
          autoDismiss
          autoDismissTimeout={15000}
          placement="top-right"
        >
          <Component {...pageProps} />
        </ToastProvider>
        {/* </Provider> */}
        {/* </ApolloProvider> */}
      </QueryClientProvider>
    </SafeHydrate>
  );
}
export default MyApp;
