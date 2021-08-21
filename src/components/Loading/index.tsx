import React from 'react';
import { LoadingContainer } from './styleds';

export interface LoadingProps {
  isLoading?: boolean;
  text?: string;
}

const initialState: LoadingProps = {
  isLoading: false,
  text: 'Cargando...',
};

const Loading: React.FC<LoadingProps> = (props = initialState) => {
  if (!props?.isLoading) {
    return <React.Fragment>{props.children}</React.Fragment>;
  }

  return (
    <LoadingContainer className="container-grid h-100 align-items-center animated fadeIn">
      <div className="text-center">
        <div className="loader" />
        <h1>{props.text || 'Cargando...'}</h1>
      </div>
    </LoadingContainer>
  );
};

export default Loading;
