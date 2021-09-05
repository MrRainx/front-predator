/* eslint-disable react-hooks/exhaustive-deps */
import { useQuery } from '@apollo/client';
import HrefButton from '@components/Buttons/HrefButton';
import Form from '@components/Form';
import LoadingSpinner from '@components/LoadingSpinner';
import { getProyectoAndLeadGroupConfigs } from '@graphql/Proyectos/queries.gql';
import useAxios from '@hooks/useAxios';
import useToasts from '@hooks/useToasts';
import { useLayoutActions } from '@layouts/layout.store';
import Router from '@routes/proyectos.routes';
import { PrimeIcons } from 'primereact/api';
import { confirmPopup } from 'primereact/confirmpopup';
import { Dialog } from 'primereact/dialog';
import React, { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import {
  createConfigGrupoLeadUrl,
  deleteConfigGrupoLeadUrl,
  updateConfigGrupoLeadUrl,
} from 'src/services/urls';
import FooterButtons from './components/FooterButtons';

export interface IGrupo {
  id?: string | number;
  titulo?: string;
  codigo?: string;
  descripcion?: string;
  orden?: number;
}

const LeadsGroupsContainer = ({ id }) => {
  const layout = useLayoutActions();

  const { loading, data, refetch } = useQuery(getProyectoAndLeadGroupConfigs, {
    variables: { pk: id },
    onCompleted: ({ proyecto }) => {
      setGrupos(proyecto?.grupos || []);
    },
    notifyOnNetworkStatusChange: true,
  });

  const methods = useForm({ mode: 'onChange' });

  const [isShowingDialog, setShowingDialog] = useState(false);

  const [grupos, setGrupos] = useState<IGrupo[]>([]);

  const [isUpdate, setIsUpdate] = useState(false);

  const { privateApi } = useAxios();

  const { addApiErrorToast } = useToasts();

  const addMutation = useMutation((formData) =>
    privateApi.post(createConfigGrupoLeadUrl, formData),
  );

  const updateMutation = useMutation((formData: IGrupo) =>
    privateApi.put(updateConfigGrupoLeadUrl(formData?.id), formData),
  );

  const deleteMutation = useMutation((id: string | number) =>
    privateApi.delete(deleteConfigGrupoLeadUrl(id)),
  );

  useEffect(() => {
    layout.setLayout({
      head: {
        proyecto: data?.proyecto?.titulo,
      },
      breadCrumb: {
        items: [
          [data?.proyecto?.titulo || 'Proyecto', Router.update(id)],
          ['Config. estados', Router.configEstados(id)],
          ['Config. leads'],
        ],
      },
    });
  }, [loading]);

  const onClickRefresh = () => {
    refetch();
  };

  const onHideModal = () => {
    setShowingDialog(false);
  };

  const onSubmitConfig = async (formData) => {
    formData.proyecto = id;
    try {
      if (isUpdate) {
        await updateMutation.mutateAsync(formData);
      } else {
        await addMutation.mutateAsync(formData);
      }
    } catch (error) {
      return addApiErrorToast(error);
    }

    await refetch();
    setShowingDialog(false);
  };

  const onClickUpdate = (grupo: IGrupo) => () => {
    methods.reset(grupo);
    setShowingDialog(true);
    setIsUpdate(true);
  };

  const onConfirmDelete = (grupo: IGrupo) => async () => {
    await deleteMutation.mutateAsync(grupo.id);
    await refetch();
  };

  const onClickDelete = (grupo: IGrupo) => async (event) => {
    confirmPopup({
      target: event.target,
      message: 'Esta seguro de eliminar esta configuración?',
      icon: PrimeIcons.EXCLAMATION_TRIANGLE,
      accept: onConfirmDelete(grupo),
      acceptLabel: 'SI',
      acceptClassName: 'p-button-danger',
      acceptIcon: PrimeIcons.TRASH,
      rejectIcon: PrimeIcons.TIMES,
    });
  };

  const renderFooter = () => {
    return (
      <React.Fragment>
        <HrefButton
          outlined
          variant="danger"
          label="Cancelar"
          icon={PrimeIcons.TIMES}
          onClick={onHideModal}
          loading={addMutation.isLoading || updateMutation.isLoading}
        />
        <HrefButton
          outlined
          label="Guardar"
          icon={PrimeIcons.SAVE}
          onClick={methods.handleSubmit(onSubmitConfig)}
          loading={addMutation.isLoading || updateMutation.isLoading}
        />
      </React.Fragment>
    );
  };
  const onClickAdd = () => {
    setShowingDialog(true);
    methods.reset({});
  };

  return (
    <React.Fragment>
      <div className="d-flex flex-row justify-content-between">
        <HrefButton
          outlined
          icon={PrimeIcons.PLUS}
          label="Crear Grupo"
          loading={loading || addMutation.isLoading || updateMutation.isLoading}
          onClick={onClickAdd}
        />
        <HrefButton
          outlined
          icon={PrimeIcons.REFRESH}
          variant="info"
          label="Recargar"
          onClick={onClickRefresh}
          loading={loading || addMutation.isLoading || updateMutation.isLoading}
        />
      </div>
      <div className="grid">
        <div className="col-12">
          <h1 className=" text-center my-3">Grupos de campos</h1>
          <ul className="list-group">
            {!loading &&
              !deleteMutation.isLoading &&
              grupos.map((grupo) => (
                <li
                  className="list-group-item d-flex justify-content-between align-items-start cursor-pointer list-group-item-action"
                  key={grupo.codigo}
                >
                  <div className="ms-2 me-auto">
                    <div className="d-flex flex-wrap mb-2">
                      <h5 className="mr-1">
                        <strong className="mr-1">{grupo.orden}. </strong>
                        {grupo.titulo}
                      </h5>
                      <strong>({grupo.codigo})</strong>
                    </div>
                    <p className="text-left">{grupo.descripcion}</p>
                  </div>
                  <span className="badge rounded-pill d-flex flex-column">
                    <HrefButton
                      outlined
                      rounded
                      variant="danger"
                      icon={PrimeIcons.TRASH}
                      onClick={onClickDelete(grupo)}
                    />
                    <HrefButton
                      className="mt-1"
                      outlined
                      rounded
                      variant="info"
                      icon={PrimeIcons.PENCIL}
                      onClick={onClickUpdate(grupo)}
                    />
                  </span>
                </li>
              ))}
          </ul>

          {(loading || deleteMutation.isLoading) && <LoadingSpinner />}

          {!loading && grupos.length < 1 && (
            <h3 className="text-center">No tienes ninguna configuración</h3>
          )}
        </div>
      </div>

      <FormProvider {...methods}>
        <Dialog
          header="Formulario de configuración"
          visible={isShowingDialog}
          className="w-100 sm:w-8 xl:w-5"
          footer={renderFooter()}
          onHide={onHideModal}
          maximizable
          draggable={false}
          closable={!addMutation.isLoading && !updateMutation.isLoading}
        >
          {/* Titulo */}
          <Form.FieldWrapper name="titulo" label="Título">
            <Form.ControlledWrapper
              defaultValue=""
              rules={{
                required: 'Este campo es obligatorio',
                maxLength: {
                  value: 155,
                  message: 'Solo se puede ingresar máximo 155 caracteres',
                },
              }}
            >
              <Form.TextInput maxLength={155} minLength={5} />
            </Form.ControlledWrapper>
            <Form.ErrorMessage />
          </Form.FieldWrapper>
          {/* Codigo */}
          <Form.FieldWrapper name="codigo" label="Código">
            <Form.ControlledWrapper
              defaultValue=""
              rules={{
                required: 'Este campo es obligatorio',
                maxLength: {
                  value: 155,
                  message: 'Solo se puede ingresar máximo 155 caracteres',
                },
              }}
            >
              <Form.TextInput maxLength={155} minLength={5} keyfilter="alpha" />
            </Form.ControlledWrapper>
            <Form.ErrorMessage />
          </Form.FieldWrapper>
          {/* Descripcion */}
          <Form.FieldWrapper name="descripcion" label="Descripción">
            <Form.ControlledWrapper
              defaultValue=""
              rules={{
                required: 'Este campo es obligatorio',
                maxLength: {
                  value: 255,
                  message: 'Solo se puede ingresar máximo 255 caracteres',
                },
              }}
            >
              <Form.TextArea maxLength={255} minLength={5} />
            </Form.ControlledWrapper>
            <Form.ErrorMessage />
          </Form.FieldWrapper>
          {/* Orden */}
          <Form.FieldWrapper name="orden" label="Orden">
            <Form.ControlledWrapper
              defaultValue=""
              rules={{
                required: 'Este campo es obligatorio',
                min: {
                  value: 1,
                  message: 'El valor mínimo es 1',
                },
              }}
            >
              <Form.NumberInput
                showButtons
                decrementButtonClassName="p-button-outlined"
                incrementButtonClassName="p-button-outlined"
                min={1}
              />
            </Form.ControlledWrapper>
            <Form.ErrorMessage />
          </Form.FieldWrapper>
        </Dialog>
      </FormProvider>

      <FooterButtons
        backHref={Router.configEstados(id)}
        backLabel="Regresar"
        backIsLoading={
          loading ||
          addMutation.isLoading ||
          updateMutation.isLoading ||
          deleteMutation.isLoading
        }
        nextHref={Router.configLeadCampos(id)}
        nextIsLoading={
          loading ||
          addMutation.isLoading ||
          updateMutation.isLoading ||
          deleteMutation.isLoading
        }
        nextLabel="Configuración de campos"
        nextIsDisabled={grupos.length === 0}
      />
    </React.Fragment>
  );
};

export default LeadsGroupsContainer;
