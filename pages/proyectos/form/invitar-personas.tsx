import { useQuery } from '@apollo/client';
import InvitarPersonasContainer from '@containers/proyectos/form/InvitarPersonas';
import { getInfoProyectoUsuario } from '@graphql/Proyectos/queries.gql';
import PrivateLayout from '@layouts/PrivateLayout';
import { NextPage } from 'next';
import React from 'react';
import Router from '@routes/proyectos.routes';

const InvitarPersonasPage: NextPage<any> = ({ id }) => {
  const { loading, data } = useQuery(getInfoProyectoUsuario, {
    variables: {
      pk: id,
    },
  });

  return (
    <PrivateLayout
      head={{
        title: 'Invitar personas',
        proyecto: data?.proyecto?.titulo,
      }}
      breadCrumb={{
        title: 'Invitar personas',
        items: [
          [data?.proyecto?.titulo || 'Proyecto', Router.update(id)],
          ['Config. estados', Router.configEstados(id)],
          ['Config. leads', Router.configLeadGroups(id)],
          ['Config. campos', Router.configLeadCampos(id)],
          ['Invitar personas'],
        ],
      }}
      loading={{ isLoading: loading }}
    >
      <InvitarPersonasContainer id={id} />
    </PrivateLayout>
  );
};

InvitarPersonasPage.getInitialProps = ({ query }) => query;

export default InvitarPersonasPage;
