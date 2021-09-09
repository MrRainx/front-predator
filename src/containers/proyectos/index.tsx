import { useQuery } from '@apollo/client';
import HrefButton from '@components/Buttons/HrefButton';
import BaseDataTable from '@components/Table/BaseDataTable';
import { IndexColumn } from '@components/Table/IndexColumn';
import { getMisProyectos } from '@graphql/Proyectos/queries.gql';
import Router from '@routes/proyectos.routes';
import Link from 'next/link';
import { PrimeIcons } from 'primereact/api';
import { Column } from 'primereact/column';
import { OverlayPanel } from 'primereact/overlaypanel';
import React, { CSSProperties, useRef, useState } from 'react';
import { ListGroup } from 'react-bootstrap';

const ProyectosContainer = () => {
  const { loading, data, refetch } = useQuery(getMisProyectos, {
    notifyOnNetworkStatusChange: true,
  });

  const op = useRef(null);
  const [selectedItem, setSelectedItem] = useState(null);
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
            return (
              <React.Fragment>
                <div className="d-flex flex-row justify-content-around">
                  <HrefButton
                    icon={PrimeIcons.COG}
                    sm
                    outlined
                    // href={Router.update(rowData.id)}
                    tooltip="Opciones"
                    onClick={(evt) => {
                      setSelectedItem(rowData);
                      op.current.toggle(evt);
                    }}
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
      <OverlayPanel ref={op} style={{ minWidth: '350px' } as CSSProperties}>
        <h5 className="text-center">
          <i className={PrimeIcons.LIST} /> Opciones
        </h5>

        <ListGroup className="nav__user__menu">
          <Link href={Router.update(selectedItem?.id)}>
            <button>
              <i className={PrimeIcons.PENCIL} />
              Editar información general
            </button>
          </Link>
        </ListGroup>

        <ListGroup className="nav__user__menu">
          <Link href={Router.configEstados(selectedItem?.id)}>
            <button>
              <i className={PrimeIcons.COG} />
              Configuración de estados
            </button>
          </Link>
        </ListGroup>

        <ListGroup className="nav__user__menu">
          <Link href={Router.configLeadGroups(selectedItem?.id)}>
            <button>
              <i className={PrimeIcons.COG} />
              Configuración de grupos de información
            </button>
          </Link>
        </ListGroup>

        <ListGroup className="nav__user__menu">
          <Link href={Router.configLeadCampos(selectedItem?.id)}>
            <button>
              <i className={PrimeIcons.COG} />
              Configuración de campos por grupo
            </button>
          </Link>
        </ListGroup>

        <ListGroup className="nav__user__menu">
          <Link href={Router.invitarPersonas(selectedItem?.id)}>
            <button>
              <i className={PrimeIcons.SEND} />
              Invitar personas
            </button>
          </Link>
        </ListGroup>

        <ListGroup className="nav__user__menu">
          <Link href={Router.credencialesExternas(selectedItem?.id)}>
            <button>
              <i className={PrimeIcons.LIST} />
              Credenciales externas
            </button>
          </Link>
        </ListGroup>
      </OverlayPanel>
    </main>
  );
};

export default ProyectosContainer;
