import UpdateProyectoContainer from '@containers/proyectos/form/update';
import PrivateLayout from '@layouts/PrivateLayout';
import { NextPage } from 'next';
import React from 'react';

const UpdateProyectoPage: NextPage<any> = ({ id }) => {
  return (
    <PrivateLayout>
      <main className="container">
        <UpdateProyectoContainer id={id} />
      </main>
    </PrivateLayout>
  );
};

UpdateProyectoPage.getInitialProps = ({ query }) => query;

export default UpdateProyectoPage;
