import { useQuery } from '@apollo/client';
import CredencialesExternasContainer from '@containers/proyectos/form/CredencialesExternas';
import { getInfoProyectoUsuario } from '@graphql/Proyectos/queries.gql';
import PrivateLayout from '@layouts/PrivateLayout';
import Router from '@routes/proyectos.routes';
import { NextPage } from 'next';
import React from 'react';

const CredencialesExternasPage: NextPage<any> = ({ id }) => {
  const { loading, data } = useQuery(getInfoProyectoUsuario, {
    variables: {
      pk: id,
    },
  });
  return (
    <PrivateLayout
      head={{
        title: 'Credenciales externas',
        proyecto: data?.proyecto?.titulo,
      }}
      breadCrumb={{
        title: 'Credenciales externas',
        items: [
          [data?.proyecto?.titulo || 'Proyecto', Router.update(id)],
          ['Config. estados', Router.configEstados(id)],
          ['Config. leads', Router.configLeadGroups(id)],
          ['Config. campos', Router.configLeadCampos(id)],
          ['Invitar personas', Router.invitarPersonas(id)],
          ['Credenciales externas'],
        ],
      }}
      loading={{ isLoading: loading }}
    >
      <CredencialesExternasContainer id={id} />
    </PrivateLayout>
  );
};

CredencialesExternasPage.getInitialProps = ({ query }) => query;

export default CredencialesExternasPage;
