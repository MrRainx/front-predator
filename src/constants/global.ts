import moment from 'moment';
import { getItem, removeItem, setItem } from '../utils/storage';

export const PROJECT_PREFIX = 'KAMARIA-';

const TOKEN = `${PROJECT_PREFIX}TOKEN`;
const REFRESH_TOKEN = `${PROJECT_PREFIX}REFRESH-TOKEN`;
const TOKEN_EXP_AT = `${PROJECT_PREFIX}TOKEN_EXP_AT`;
const TOKENS = `${PROJECT_PREFIX}TOKENS`;
const reduxState = `${PROJECT_PREFIX}REDUX`;
const DEBUG = false;
const ENCRYPT = false;

const getToken = () => {
  return getItem(TOKEN);
};

const getRefrehsToken = () => {
  return getItem(REFRESH_TOKEN);
};

const removeToken = () => {
  removeItem(TOKEN);
  removeItem(REFRESH_TOKEN);
};
const getTokenExp = () => {
  return moment(getItem(TOKEN_EXP_AT));
};
const setTokens = (access: string, refresh?: string) => {
  setItem(TOKEN, access);
  setItem(TOKEN_EXP_AT, moment().add(19, 'minutes').toISOString());
  if (refresh) {
    setItem(REFRESH_TOKEN, refresh);
  }
};

const isTokenExp = () => {
  return moment().isSameOrAfter(getTokenExp());
};
const global = {
  TOKEN,
  REFRESH_TOKEN,
  TOKEN_EXP_AT,
  TOKENS,
  reduxState,
  DEBUG,
  ENCRYPT,
  getToken,
  getRefrehsToken,
  removeToken,
  setTokens,
  isTokenExp,
};
export default global;
