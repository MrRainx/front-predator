import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
} from '@apollo/client';
import { BatchHttpLink } from '@apollo/client/link/batch-http';
import { setContext } from '@apollo/client/link/context';
import global from '@constants/global';
import B64 from '@utils/b64';
import { getItem } from '@utils/storage';
import { URL_BASE } from './urls';

export const isSsr = () => {
  try {
    return !window && typeof window === 'undefined';
  } catch (error) {
    return true;
  }
};

export const cache = new InMemoryCache({});

//@ts-ignore
const encryptLink = new ApolloLink((operation, forward) => {
  return forward(operation).map((response) => {
    if (global.ENCRYPT) {
      return B64.encode(response.data);
    }
    return response;
  });
});
const link = new HttpLink({
  uri: `${URL_BASE}graphql`,
  fetch: (uri, options) => {
    if (global.ENCRYPT) {
      options.body = B64.jsonEncode(options.body);
    }
    return fetch(uri, options);
  },
});

const batchLink = new BatchHttpLink({
  uri: `${URL_BASE}graphql`,
  batchMax: 10, // No more than 5 operations per batch
  batchInterval: 50, // Wait no more than 20ms after first batched operation
  fetch: (uri, options) => {
    if (global.ENCRYPT) {
      options.body = B64.jsonEncode(options.body);
    }
    return fetch(uri, options);
  },
});

const authLink = setContext((_, { headers }) => {
  const token = getItem(global.TOKEN);

  return {
    headers: {
      ...headers,
      authorization: token ? `JWT ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  // link: encryptLink.concat(authLink).concat(link),
  link: encryptLink.concat(authLink).concat(link),
  ssrMode: isSsr(),
  cache: cache,
  uri: `${URL_BASE}graphql`,
  defaultOptions: {
    query: { fetchPolicy: 'no-cache' },
    watchQuery: {
      fetchPolicy: 'no-cache',
    },
    mutate: { errorPolicy: 'all' },
  },
});

export default client;
