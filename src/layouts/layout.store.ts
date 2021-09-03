import { HeadBreadCrumbProps } from '@components/BreadCrumbs/HeadBreadCrumb';
import { HtmlHeadProps } from '@components/HtmlHead';
import {
  createHook,
  createStore,
  defaults,
  StoreActionApi,
} from 'react-sweet-state';

defaults.devtools = true;

export interface LayoutProps {
  head?: HtmlHeadProps;
  breadCrumb?: HeadBreadCrumbProps;
}

export const initialState: LayoutProps = {
  head: null,
  breadCrumb: null,
};

export type ActionType = StoreActionApi<LayoutProps>;

const actions = {
  setHead(head: HtmlHeadProps) {
    return ({ setState }) => setState({ head });
  },
  setBreadCrumb(breadCrumb: HeadBreadCrumbProps) {
    return ({ setState }) => setState({ breadCrumb });
  },
  setLayout(state: LayoutProps) {
    return ({ setState }) => setState(state);
  },
  resetState() {
    return ({ setState }) => setState(initialState);
  },
  resetLayoutState() {
    return ({ setState }) => setState(initialState);
  },
};

type Action = typeof actions;

const LayoutStore = createStore({
  name: 'layout',
  initialState,
  actions,
});

export const hook = createHook<LayoutProps, Action, any, void>(LayoutStore);

export const useLayout = (): LayoutProps => {
  const [state, _] = hook();
  return state;
};

export const useLayoutActions = () => {
  return hook()[1];
};
