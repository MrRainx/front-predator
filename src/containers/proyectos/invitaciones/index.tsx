import { useQuery } from '@apollo/client';
import HrefButton from '@components/Buttons/HrefButton';
import LoadingSpinner from '@components/LoadingSpinner';
import { EstadoInvitacion } from '@graphql/Proyectos/enums';
import { getMisInvitaciones } from '@graphql/Proyectos/queries.gql';
import { PrimeIcons } from 'primereact/api';
import React, { useMemo } from 'react';
import { useMutation } from 'react-query';
import { IInvitacion, InvitacionesWS } from 'src/services/Invitaciones';

const InvitacionesContainer = () => {
  const { loading, data, refetch } = useQuery(getMisInvitaciones, {
    notifyOnNetworkStatusChange: true,
  });

  const ws = useMemo(() => new InvitacionesWS(), []);

  const updateMutation = useMutation((model: IInvitacion) =>
    ws.update(model.id, model),
  );

  const onClickRefresh = () => refetch();

  const onClickUpdateEstado = (invite, estado) => async () => {
    await updateMutation.mutateAsync({
      id: invite.id,
      estado: estado,
      proyecto: invite.proyecto.id,
      usuario: invite.usuario.id,
    });
    refetch();
  };

  return (
    <main className="container">
      <div className="row">
        <div className="col-12">
          <HrefButton
            icon={PrimeIcons.REFRESH}
            label="Recargar"
            outlined
            sm
            onClick={onClickRefresh}
          />
        </div>
        <div className="col-12">
          {!loading && (
            <table className="table table-bordered table-responsive border table-striped">
              <thead className="table-dark bg-primary text-center">
                <th scope="col">#</th>
                <th scope="col">Proyecto</th>
                <th scope="col">Administrador</th>
                <th scope="col" style={{ width: '200px' }}>
                  Opciones
                </th>
              </thead>
              <tbody className="text-center">
                {data?.misInvitaciones?.map?.((invite, index) => (
                  <tr key={invite.id}>
                    <td scope="row">{index + 1}</td>
                    <td>{invite.proyecto.titulo}</td>
                    <td>{invite.proyecto.administrador.username}</td>
                    <td className="d-flex flex-wrap justify-content-around">
                      <HrefButton
                        label="Rechazar"
                        variant="danger"
                        outlined
                        sm
                        loading={updateMutation.isLoading}
                        onClick={onClickUpdateEstado(
                          invite,
                          EstadoInvitacion.RECHAZADA,
                        )}
                      />
                      <HrefButton
                        label="Aceptar"
                        outlined
                        sm
                        loading={updateMutation.isLoading}
                        onClick={onClickUpdateEstado(
                          invite,
                          EstadoInvitacion.ACEPTADA,
                        )}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          {loading && <LoadingSpinner />}
        </div>
      </div>
    </main>
  );
};

export default InvitacionesContainer;
