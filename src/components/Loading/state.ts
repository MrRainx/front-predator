import { createHook, createStore, StoreActionApi } from 'react-sweet-state';

export type LoadingStoreType = {
  isLoading: boolean;
  text?: string;
};

export const initialState: LoadingStoreType = {
  isLoading: true,
  text: 'Cargando...',
};

export type ActionType = StoreActionApi<LoadingStoreType>;

const LoadingStore = createStore({
  name: 'Loading',
  initialState,
  actions: {
    setState: (state) => {
      return ({ setState }) => {
        setState(state);
      };
    },
  },
});

export const hook = createHook(LoadingStore);

export const useLoading = () => {
  const [state, loadingActions] = hook();
  return { ...loadingActions, ...state };
};
