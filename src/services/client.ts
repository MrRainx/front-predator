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
import { getItem, setItem } from '@utils/storage';
import { TokenRefreshLink } from 'apollo-link-token-refresh';
import { refreshTokenUrl, URL_BASE } from './urls';
import { onError } from '@apollo/client/link/error';

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

const refreshLink = new TokenRefreshLink({
  accessTokenField: 'access',
  isTokenValidOrUndefined: () => !global.isTokenExp(),
  fetchAccessToken: async () => {
    return fetch(`${URL_BASE}api/v1/${refreshTokenUrl}`, {
      method: 'POST',
      body: JSON.stringify({
        refresh: getItem(global.REFRESH_TOKEN),
      }),
      headers: {
        'content-type': 'application/json',
      },
    }).then((res) => res.json());
  },
  handleFetch: (response) => {
    console.log('TEST: ', response);
  },
  handleResponse: (operation, accessTokenField) => (response) => {
    global.setTokens(response[accessTokenField]);
  },
  handleError: (err: Error) => {},
});

const errorLink = onError(
  ({ graphQLErrors, networkError, operation, forward }) => {
    if (graphQLErrors) {
      graphQLErrors.forEach((error) => {
        console.log('ERROR: ', error);
      });

      // for (let err of graphQLErrors) {
      //   switch (err.extensions.code) {
      //     case 'UNAUTHENTICATED':
      //       // error code is set to UNAUTHENTICATED
      //       // when AuthenticationError thrown in resolver

      //       // modify the operation context with a new token
      //       const oldHeaders = operation.getContext().headers;
      //       operation.setContext({
      //         headers: {
      //           ...oldHeaders,
      //           authorization: getNewToken(),
      //         },
      //       });
      //       // retry the request, returning the new observable
      //       return forward(operation);
      //   }
      // }
    }
  },
);

//@ts-ignore
const finalLink = ApolloLink.from([refreshLink, encryptLink, authLink, link]);

const client = new ApolloClient({
  // link: encryptLink.concat(authLink).concat(link),
  //@ts-ignore
  link: finalLink,
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
