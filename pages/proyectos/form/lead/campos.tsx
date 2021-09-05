import ConfigCamposLead from '@containers/proyectos/form/leadsCampos';
import PrivateLayout from '@layouts/PrivateLayout';
import { NextPage } from 'next';
import React from 'react';

const ConfiguracionCamposLeadPage: NextPage<any> = ({ id }) => {
  return (
    <PrivateLayout
      breadCrumb={{
        title: 'Confirguración de campos',
        items: [],
      }}
    >
      <main className="container">
        <ConfigCamposLead id={id} />
      </main>
    </PrivateLayout>
  );
};

ConfiguracionCamposLeadPage.getInitialProps = ({ query }) => query;

export default ConfiguracionCamposLeadPage;
