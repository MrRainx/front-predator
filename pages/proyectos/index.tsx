import ProyectosContainer from '@containers/proyectos';
import PrivateLayout from '@layouts/PrivateLayout';
import { NextPage } from 'next';
import React from 'react';

const ProyectosPage: NextPage = () => {
  return (
    <PrivateLayout
      head={{ proyecto: 'Mis Proyectos' }}
      breadCrumb={{ title: 'Mis Proyectos', items: ['Mis proyectos'] }}
    >
      <ProyectosContainer />
    </PrivateLayout>
  );
};

export default ProyectosPage;
