import AddProyectoContainer from '@containers/proyectos/form/add';
import PrivateLayout from '@layouts/PrivateLayout';
import React from 'react';

const AddProyectoPage = () => {
  return (
    <PrivateLayout
      head={{
        proyecto: 'Predator',
        title: 'Nuevo proyecto',
      }}
      breadCrumb={{
        title: 'Agregar proyecto',
        items: ['Nuevo'],
      }}
    >
      <main className="container">
        <AddProyectoContainer />
      </main>
    </PrivateLayout>
  );
};

export default AddProyectoPage;
