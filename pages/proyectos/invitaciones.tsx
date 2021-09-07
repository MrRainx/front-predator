import InvitacionesContainer from '@containers/proyectos/invitaciones';
import PrivateLayout from '@layouts/PrivateLayout';
import { NextPage } from 'next';
import React from 'react';

const InvitacionesPage: NextPage = () => {

  return (
    <PrivateLayout
      head={{ proyecto: 'Invitaciones' }}
      breadCrumb={{ title: 'Invitaciones', items: ['Invitaciones'] }}
    >
      <InvitacionesContainer />
    </PrivateLayout>
  );
};

export default InvitacionesPage;
