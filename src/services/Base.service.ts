import global from '@constants/global';
import { getItem, setItem } from '@utils/storage';
import axios, { AxiosInstance, AxiosResponse } from 'axios';
import createAuthRefreshInterceptor from 'axios-auth-refresh';
import { refreshTokenUrl, URL_BASE } from './urls';

export type Pk = string | number;

export interface IWs {
  getUri: () => string;
  getPkUri: (pk: Pk) => string;
  privateApi?: AxiosInstance;
  publicApi?: AxiosInstance;
  api: AxiosInstance;
  getApi: () => AxiosInstance;
}

export interface IModel {
  createdAt?: string | Date;
  updatedAt?: string | Date;
}

export interface ICrud<T, P extends Pk> {
  create: (model: T) => Promise<AxiosResponse<T>>;
  update: (id: P, model: T) => Promise<AxiosResponse<T>>;
  delete: (id: P) => void;
}

export const privateApi = () => {
  return axios.create({
    baseURL: `${URL_BASE}api/v1/`,
    headers: {
      Authorization: `JWT ${getItem(global.TOKEN)}`,
    },
  });
};

const refreshAuthLogic = (failedRequest) =>
  axios
    .post(`${URL_BASE}api/v1/${refreshTokenUrl}`, {
      refresh: global.getRefrehsToken(),
    })
    .then(({ data }) => {
      setItem(global.TOKEN, data.access);
      failedRequest.response.config.headers['Authorization'] =
        'JWT ' + data.access;
      return Promise.resolve();
    });

export const publicApi = () => {
  return axios.create({
    baseURL: `${URL_BASE}api/v1/`,
  });
};

export abstract class AbstractWs implements IWs {
  uri?: string;
  api = null;
  constructor() {
    this.api = privateApi();
    createAuthRefreshInterceptor(this.api, refreshAuthLogic);
  }

  getUri() {
    return this.uri;
  }
  getPkUri(pk: Pk) {
    return this.getUri() + pk + '/';
  }
  getApi(): AxiosInstance {
    return this.api;
  }
}
