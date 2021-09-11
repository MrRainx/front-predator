import { useQuery } from '@apollo/client';
import AsignacionContainer from '@containers/proyectos/asignacion';
import { getProyectoByUsuarioAndCodigo } from '@graphql/Proyectos/queries.gql';
import PrivateLayout from '@layouts/PrivateLayout';
import Router from '@routes/proyectos.routes';
import { NextPage } from 'next';
import React from 'react';

const AsignacionPage: NextPage<any> = ({ codigo }) => {
  const { data } = useQuery(getProyectoByUsuarioAndCodigo, {
    variables: {
      codigo,
    },
  });
  return (
    <PrivateLayout
      head={{
        proyecto: data?.proyecto?.titulo,
        title: 'Asignación de trabajo',
      }}
      breadCrumb={{
        title: 'Asignación de trabajo',
        items: [
          [data?.proyecto?.titulo || '', Router.detalle(codigo)],
          'Asignación',
        ],
      }}
    >
      <AsignacionContainer codigo={codigo} />
    </PrivateLayout>
  );
};

AsignacionPage.getInitialProps = ({ query }) => query;
export default AsignacionPage;
