import LeadsGroupsContainer from '@containers/proyectos/form/leadsGroups';
import PrivateLayout from '@layouts/PrivateLayout';
import { NextPage } from 'next';
import React from 'react';

const LeadGroupsPage: NextPage<any> = ({ id }) => {
  return (
    <PrivateLayout
      breadCrumb={{
        title: 'Configuración de leads',
      }}
    >
      <main className="container">
        <LeadsGroupsContainer id={id} />
      </main>
    </PrivateLayout>
  );
};

LeadGroupsPage.getInitialProps = ({ query }) => query;

export default LeadGroupsPage;
