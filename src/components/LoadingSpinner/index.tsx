import { ProgressSpinner } from 'primereact/progressspinner';
import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="text-center">
      <ProgressSpinner />
      <h5>Cargando...</h5>
    </div>
  );
};

export default LoadingSpinner;
