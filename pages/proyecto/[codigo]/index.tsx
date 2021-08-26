import { useQuery } from '@apollo/client';
import { getProyectoByUsuarioAndCodigo } from '@graphql/Proyectos/queries.gql';
import PrivateLayout from '@layouts/PrivateLayout';
import { NextPage } from 'next';
import React from 'react';

const ProyectoPage: NextPage<{ codigo?: string }> = ({ codigo }) => {
  const { data } = useQuery(getProyectoByUsuarioAndCodigo, {
    variables: {
      codigo,
    },
  });

  const proyecto = data?.proyecto;

  return (
    <PrivateLayout
      head={{
        proyecto: proyecto?.titulo,
      }}
    >
      <main className="container-fluid">
        <div className="grid">
          <div className="col-12">
            <h1 className="my-5 text-center">{proyecto?.titulo}</h1>
          </div>
        </div>
      </main>
    </PrivateLayout>
  );
};

ProyectoPage.getInitialProps = ({ query }) => query;

export default ProyectoPage;
