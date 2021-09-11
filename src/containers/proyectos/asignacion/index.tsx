import { useQuery } from '@apollo/client';
import HrefButton from '@components/Buttons/HrefButton';
import Form from '@components/Form';
import BaseDataTable from '@components/Table/BaseDataTable';
import { IndexColumn } from '@components/Table/IndexColumn';
import { getDataTableLeads, getLeadGroups } from '@graphql/Leads/queries.gql';
import useWS from '@hooks/useWS';
import { PrimeIcons } from 'primereact/api';
import { Column } from 'primereact/column';
import React, { useMemo } from 'react';
import { useMutation } from 'react-query';
import { SeguimientoWS } from 'src/services/seguimiento.services';

const AsignacionContainer: React.FC<any> = ({ codigo }) => {
  const { loading, data, refetch } = useQuery(getLeadGroups, {
    variables: { codigo },
    notifyOnNetworkStatusChange: true,
  });
  const {
    loading: loadingParams,
    data: dataParams,
    refetch: refetchParams,
  } = useQuery(getDataTableLeads, {
    variables: { codigo },
  });

  const seguimientoWS = useWS<SeguimientoWS>(SeguimientoWS);

  const reasignarMutation = useMutation((dataRequest: any) =>
    seguimientoWS.reasignar(dataRequest),
  );

  const header = useMemo(
    () => (
      <div className="d-flex flex-wrap justify-content-between">
        <HrefButton
          loading={loading}
          label="Recargar"
          outlined
          sm
          icon={PrimeIcons.REFRESH}
        />
      </div>
    ),
    [loading],
  );

  const onChangeIntegrante = (rowData) => async (evt) => {
    await reasignarMutation.mutateAsync({
      idUsuario: evt?.value?.id,
      idGrupo: rowData?.id,
      proyectoCodigo: codigo,
      idEstado: rowData?.lastSeguimiento?.estado?.id,
    });
    await refetch();
  };

  return (
    <main className="container-fluid">
      <BaseDataTable
        value={data?.grupos}
        tableClassName="p-inputtext-sm"
        header={header}
        paginatorClassName="text-sm"
      >
        {IndexColumn(null)}
        <Column
          header="Identificador"
          field="identificador"
          filter
          sortable
          bodyClassName="text-sm"
        />
        <Column
          header="Enviado por"
          field="credencial.nombre"
          filter
          sortable
          bodyClassName="text-sm"
        />
        <Column
          header="Proceso actual"
          field="lastSeguimiento.estado.titulo"
          sortable
          filter
          style={{ width: '300px' }}
          body={(rowData) => (
            <p
              className="p-0 m-0"
              style={{
                backgroundColor: rowData?.lastSeguimiento?.estado?.colorFondo,
                width: '300px',
              }}
            >
              {rowData?.lastSeguimiento?.estado?.titulo && (
                <small
                  className="mx-2 text-sm"
                  style={{ color: rowData?.lastSeguimiento?.estado?.color }}
                >
                  {rowData?.lastSeguimiento?.estado?.titulo}
                </small>
              )}
              {!rowData?.lastSeguimiento?.estado?.titulo && (
                <small className="text-center">SIN ASIGNACIÓN</small>
              )}
            </p>
          )}
        />
        <Column
          filter
          sortable
          header="Asignado a"
          field="asignadoA.username"
          bodyClassName="text-sm"
          body={(rowData) => (
            <div>
              <Form.Select
                className="p-inputtext-sm"
                resetFilterOnHide
                filter
                filterMatchMode="contains"
                filterInputAutoFocus
                showFilterClear
                emptyFilterMessage="Sin resultados"
                options={dataParams?.integrantes || []}
                value={rowData?.asignadoA}
                optionLabel="username"
                onChange={onChangeIntegrante(rowData)}
                loading={
                  (reasignarMutation.isLoading || loading) &&
                  rowData?.id === reasignarMutation?.variables?.idGrupo
                }
              />
            </div>
          )}
        />
        <Column
          header="Estado"
          sortable
          filter
          style={{ width: '120px' }}
          body={(rowData) => (
            <div style={{ width: '120px' }}>
              <Form.SwitchButton
                value={rowData.isActive}
                offstyle="dark"
                offlabel="Inactivo"
                onlabel="Activo"
                size="sm"
                style="w-100"
              />
            </div>
          )}
        />
        <Column
          header="Fecha/Hora ingreso"
          sortable
          filter
          field="createdAtStr"
          style={{ width: '200px' }}
          body={(rowData) => (
            <div style={{ width: '200px' }}>
              <small>{rowData?.createdAtStr}</small>
            </div>
          )}
        />
        <Column
          header="Opciones"
          style={{ width: '90px' }}
          body={(rowData) => (
            <div className="d-flex flex-wrap justify-content-between">
              <HrefButton sm outlined icon={PrimeIcons.USER_EDIT} />
              <HrefButton sm outlined variant="help" icon={PrimeIcons.INFO} />
            </div>
          )}
        />
      </BaseDataTable>
    </main>
  );
};

export default AsignacionContainer;
