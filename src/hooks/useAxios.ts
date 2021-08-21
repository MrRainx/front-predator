import global from '@constants/global';
import { getItem } from '@utils/storage';
import Axios, { AxiosInstance } from 'axios';
import { useMemo } from 'react';
import { URL_BASE } from 'src/services/urls';

const useAxios = () => {
  const privateApi: AxiosInstance = useMemo(() => {
    const instance = Axios.create({
      baseURL: `${URL_BASE}api/v1/`,
      headers: {
        Authorization: `JWT ${getItem(global.TOKEN)?.access}`,
      },
    });
    instance.interceptors.request.use(
      (config) => {
        // if (
        //   (config.data instanceof Object || validator.isJSON(config?.data)) &&
        //   global.ENCRYPT
        // ) {
        //   config.data = objectToB64(config.data);
        // }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      },
    );
    instance.interceptors.response.use(
      (value) => {
        // if (value?.data && valu) {
        //   value.data = b64ToObject(value.data);
        // }
        return value;
      },
      (error) => Promise.reject(error),
    );
    return instance;
  }, []);

  const publicApi: AxiosInstance = useMemo(() => {
    return Axios.create({
      baseURL: `${URL_BASE}api/v1/`,
    });
  }, []);

  // const getReporte = async (uri: string, body: any = {}) => {
  //   try {
  //     const { data } = await privateApi.post(uri, body, {
  //       responseType: 'blob',
  //     });

  //     window.open(window.URL.createObjectURL(data));
  //   } catch (error) {
  //     addWarningToast(
  //       error?.response?.data ||
  //         'Ha ocurrido un problema al generar el reporte',
  //     );
  //   }
  // };

  return { privateApi, publicApi };
};

export default useAxios;
