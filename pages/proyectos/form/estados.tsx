import ConfigEstadoContainer from '@containers/proyectos/form/estados';
import PrivateLayout from '@layouts/PrivateLayout';
import { NextPage } from 'next';
import React from 'react';

const ConfigEstadoPage: NextPage<any> = ({ id }) => {
  return (
    <PrivateLayout
      head={{
        title: 'Configuración de estados',
      }}
      breadCrumb={{
        title: 'Configuración de estados',
      }}
    >
      <main className="container">
        <ConfigEstadoContainer id={id} />
      </main>
    </PrivateLayout>
  );
};

ConfigEstadoPage.getInitialProps = ({ query }) => query;
export default ConfigEstadoPage;
