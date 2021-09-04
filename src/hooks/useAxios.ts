import global from '@constants/global';
import { getItem, setItem } from '@utils/storage';
import Axios, { AxiosInstance } from 'axios';
import createAuthRefreshInterceptor from 'axios-auth-refresh';
import { useEffect } from 'react';
import { refreshTokenUrl, URL_BASE } from 'src/services/urls';

// Function that will be called to refresh authorization
const refreshAuthLogic = (failedRequest) =>
  Axios.post(`${URL_BASE}api/v1/${refreshTokenUrl}`, {
    refresh: global.getRefrehsToken(),
  }).then(({ data }) => {
    setItem(global.TOKEN, data.access);
    failedRequest.response.config.headers['Authorization'] =
      'JWT ' + data.access;
    return Promise.resolve();
  });

const useAxios = () => {
  const privateApi: AxiosInstance = Axios.create({
    baseURL: `${URL_BASE}api/v1/`,
    headers: {
      Authorization: `JWT ${getItem(global.TOKEN)}`,
    },
  });

  const publicApi: AxiosInstance = Axios.create({
    baseURL: `${URL_BASE}api/v1/`,
  });

  useEffect(() => {
    createAuthRefreshInterceptor(privateApi, refreshAuthLogic);
    // privateApi.interceptors.request.use(
    //   (config) => {
    //     // if (
    //     //   (config.data instanceof Object || validator.isJSON(config?.data)) &&
    //     //   global.ENCRYPT
    //     // ) {
    //     //   config.data = objectToB64(config.data);
    //     // }
    //     return config;
    //   },
    //   (error) => {
    //     return Promise.reject(error);
    //   },
    // );
    // privateApi.interceptors.response.use(
    //   (value) => {
    //     // if (value?.data && valu) {
    //     //   value.data = b64ToObject(value.data);
    //     // }
    //     return value;
    //   },
    //   (error) => Promise.reject(error),
    // );
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
