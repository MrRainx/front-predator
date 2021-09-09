import { useQuery } from '@apollo/client';
import CredencialExternaContainer from '@containers/proyectos/form/CredencialExterna';
import { getInfoProyectoUsuario } from '@graphql/Proyectos/queries.gql';
import PrivateLayout from '@layouts/PrivateLayout';
import Router from '@routes/proyectos.routes';
import { NextPage } from 'next';
import React from 'react';

const CredencialExternaPage: NextPage<any> = ({ id, credencial }) => {
  const { loading, data } = useQuery(getInfoProyectoUsuario, {
    variables: {
      pk: id,
    },
  });
  return (
    <PrivateLayout
      head={{
        title: 'Credenciales externa',
        proyecto: data?.proyecto?.titulo,
      }}
      breadCrumb={{
        title: 'Credenciales externa',
        items: [
          ['Proyectos', Router.listado],
          data?.proyecto?.titulo || 'Proyecto',
          ['Credenciales externas', Router.credencialesExternas(id)],
          'Credencial externa',
        ],
      }}
      loading={{ isLoading: loading }}
    >
      <CredencialExternaContainer id={credencial} />
    </PrivateLayout>
  );
};

CredencialExternaPage.getInitialProps = ({ query }) => query;

export default CredencialExternaPage;
