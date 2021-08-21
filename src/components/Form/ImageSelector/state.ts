import { uniqueId } from 'lodash';
import { createHook, createStore, defaults } from 'react-sweet-state';
import { setState } from 'utils/state';

defaults.devtools = true;

export interface ImageSelectorStoreProps {
  preview?: boolean;
  isVisible?: boolean;
  uuid?: string;
}

export const initialState: ImageSelectorStoreProps = {
  preview: true,
  isVisible: false,
  uuid: uniqueId('Image-selector'),
};

export const ImageSelectorStore = createStore({
  name: 'ImageSelector',
  initialState,
  actions: {
    setState: setState<ImageSelectorStoreProps>(),
    toggleDialog: (isVisible: boolean = false) => {
      return ({ setState: setter }) => {
        setter({
          isVisible,
        });
      };
    },
  },
});

const hook = createHook(ImageSelectorStore);

export interface UseImageSelectorProps extends ImageSelectorStoreProps {
  setState: (state: ImageSelectorStoreProps) => void;
  toggleDialog: (isVisible?: boolean) => void;
}
export const useImageSelector = (): UseImageSelectorProps => {
  const [state, actions] = hook();
  return { ...state, ...actions };
};
