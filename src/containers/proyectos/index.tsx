import { useQuery } from '@apollo/client';
import HrefButton from '@components/Buttons/HrefButton';
import BaseDataTable from '@components/Table/BaseDataTable';
import { IndexColumn } from '@components/Table/IndexColumn';
import { getMisProyectos } from '@graphql/Proyectos/queries.gql';
import Router from '@routes/proyectos.routes';
import { PrimeIcons } from 'primereact/api';
import { Column } from 'primereact/column';
import React from 'react';

const ProyectosContainer = () => {
  const { loading, data, refetch } = useQuery(getMisProyectos, {
    notifyOnNetworkStatusChange: true,
  });

  const header = () => {
    return (
      <div>
        <HrefButton
          loading={loading}
          icon={PrimeIcons.REFRESH}
          label="Recargar"
          sm
          outlined
          onClick={() => refetch()}
        />
      </div>
    );
  };

  return (
    <main className="container">
      <BaseDataTable
        value={data?.proyectos}
        className="p-inputtext-sm"
        paginatorClassName="p-inputtext-sm"
        loading={loading}
        header={header()}
      >
        {IndexColumn(null)}
        <Column
          header="Código"
          field="codigo"
          className="text-center"
          filter
          sortable
        />
        <Column
          header="Nombre"
          field="titulo"
          className="text-center"
          filter
          sortable
        />
        <Column
          header="Categoria"
          field="categoria.nombre"
          className="text-center"
          filter
          sortable
        />
        <Column
          header="Opciones"
          body={(rowData) => {
            console.log(rowData);
            return (
              <React.Fragment>
                <div className="d-flex flex-row justify-content-around">
                  <HrefButton
                    icon={PrimeIcons.COG}
                    sm
                    outlined
                    href={Router.update(rowData.id)}
                    tooltip="Editar"
                  />
                  <HrefButton
                    icon={PrimeIcons.INFO}
                    sm
                    outlined
                    variant="info"
                    tooltip="Mas información"
                    href={Router.detalle(rowData.codigo)}
                  />
                  <HrefButton
                    icon={PrimeIcons.TRASH}
                    variant="danger"
                    sm
                    outlined
                    tooltip="Eliminar"
                  />
                </div>
              </React.Fragment>
            );
          }}
        />
      </BaseDataTable>
    </main>
  );
};

export default ProyectosContainer;
