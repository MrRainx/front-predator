/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import { useLazyQuery, useQuery } from '@apollo/client';
import HrefButton from '@components/Buttons/HrefButton';
import Form from '@components/Form';
import { searchUsuarios } from '@graphql/auth/queries.gql';
import { EstadoInvitacionStr } from '@graphql/Proyectos/enums';
import { getInvitacionesProyecto } from '@graphql/Proyectos/queries.gql';
import { estadoInvitacionPredicate } from '@graphql/Proyectos/utils';
import Router from '@routes/proyectos.routes';
import { PrimeIcons } from 'primereact/api';
import { TabPanel, TabView } from 'primereact/tabview';
import React, { useMemo, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import DetailUser from './components/DetailUser';
import FooterButtons from './components/FooterButtons';

const InvitarPersonasContainer: React.FC<any> = ({ id }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const methods = useForm({ mode: 'onChange' });

  const { loading: loadingIntegrantes, data: dataIntegrantes } = useQuery(
    getInvitacionesProyecto,
    {
      variables: {
        proyectoId: id,
      },
    },
  );

  const [fetchUsuarios, { loading: loadingUsuarios, data: dataUsuarios }] =
    useLazyQuery(searchUsuarios, {
      notifyOnNetworkStatusChange: true,
    });

  const isLoading = loadingUsuarios || loadingIntegrantes;

  const integrantes = useMemo(
    () =>
      dataIntegrantes?.invitaciones?.filter?.(
        estadoInvitacionPredicate(EstadoInvitacionStr.ACEPTADA),
      ),
    [dataIntegrantes],
  );

  const invitaciones = useMemo(
    () =>
      dataIntegrantes?.invitaciones?.filter?.(
        estadoInvitacionPredicate(EstadoInvitacionStr.PENDIENTE),
      ),
    [dataIntegrantes],
  );

  const onSubmitSearch = (formData) => {
    fetchUsuarios({
      variables: {
        search: formData.usuario,
        proyectoId: id,
      },
    });
  };

  return (
    <main className="container">
      <div className="col-12">
        <TabView
          activeIndex={activeIndex}
          onTabChange={(e) => setActiveIndex(e.index)}
          className="border"
        >
          <TabPanel header="Integrantes">
            <div className="grid">
              {integrantes?.map((integrante) => (
                <div
                  key={integrante.id}
                  className="col-12 md:col-4 text-center"
                >
                  <DetailUser usuario={integrante.usuario} />
                </div>
              ))}
            </div>
            {integrantes?.length === 0 && (
              <div className="text-center mb-4 mt-5">
                <h4>Su proyecto no tiene integrantes</h4>
              </div>
            )}
          </TabPanel>

          <TabPanel header="Invitar usuarios">
            <div className="p-grid">
              <div className="col-12">
                <FormProvider {...methods}>
                  <form onSubmit={methods.handleSubmit(onSubmitSearch)}>
                    <Form.FieldWrapper name="usuario" label="Buscar usuarios">
                      <Form.Group>
                        <Form.ControlledWrapper defaultValue="">
                          <Form.TextInput
                            placeholder="Escriba el nombre de un usuario para buscarlo"
                            disabled={isLoading}
                            autoFocus
                            autoCapitalize="on"
                            onKeyDown={(evt) => {
                              if (evt.keyCode === 13) {
                                onSubmitSearch({
                                  usuario: evt.currentTarget.value,
                                });
                              }
                            }}
                          />
                        </Form.ControlledWrapper>
                        <HrefButton
                          outlined
                          label="Buscar"
                          type="submit"
                          loading={isLoading}
                        />
                      </Form.Group>
                      <Form.ErrorMessage />
                    </Form.FieldWrapper>
                  </form>
                </FormProvider>
              </div>
            </div>
            <div className="grid text-center">
              {dataUsuarios?.search?.map?.((usuario) => (
                <div
                  className="col-12 md:col-4 text-center mb-5"
                  key={usuario.id}
                >
                  <DetailUser usuario={usuario} />
                  <HrefButton
                    className="mt-auto"
                    icon={PrimeIcons.SEND}
                    label="Invitar"
                    sm
                    outlined
                  />
                </div>
              ))}
            </div>
          </TabPanel>

          <TabPanel header="Invitaciones enviadas">
            <div className="grid">
              {invitaciones?.map?.((invitacion) => (
                <div
                  key={invitacion.id}
                  className="col-12 md:col-4 text-center"
                >
                  <DetailUser usuario={invitacion.usuario} />
                  <h6>{invitacion.estadoStr}</h6>
                </div>
              ))}
            </div>
            {invitaciones?.length === 0 && (
              <div className="text-center mb-4 mt-5">
                <h4>Su proyecto no tiene invitaciones enviadas</h4>
              </div>
            )}
          </TabPanel>
        </TabView>
      </div>

      <FooterButtons
        backHref={Router.configLeadCampos(id)}
        backLabel="Config. campos"
        backIsLoading={isLoading}
        nextHref={Router.invitarPersonas(id)}
        nextIsLoading={isLoading}
        nextLabel="Detalle del proyecto"
      />
    </main>
  );
};

export default InvitarPersonasContainer;