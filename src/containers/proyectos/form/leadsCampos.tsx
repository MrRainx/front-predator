/* eslint-disable react-hooks/exhaustive-deps */
import { useLazyQuery, useQuery } from '@apollo/client';
import HrefButton from '@components/Buttons/HrefButton';
import Form from '@components/Form';
import LoadingSpinner from '@components/LoadingSpinner';
import {
  getCamposByGroupId,
  getProyectoAndLeadGroupConfigsCampos,
} from '@graphql/Proyectos/queries.gql';
import useAxios from '@hooks/useAxios';
import { useLayoutActions } from '@layouts/layout.store';
import Router from '@routes/proyectos.routes';
import { PrimeIcons } from 'primereact/api';
import { confirmPopup } from 'primereact/confirmpopup';
import { Dialog } from 'primereact/dialog';
import { TabPanel, TabView } from 'primereact/tabview';
import { Tooltip } from 'primereact/tooltip';
import React, { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import {
  createConfigCamposLeadUrl,
  deleteConfigCamposLeadUrl,
  updateConfigCamposLeadUrl,
} from 'src/services/urls';
import FooterButtons from './components/FooterButtons';

const ConfigCamposLead: React.FC<{ id: string }> = ({ id }) => {
  const [fetchCampos, { loading: loadingCampos }] = useLazyQuery(
    getCamposByGroupId,
    {
      onCompleted: (data) => {
        setCamposPadre(data?.camposPadre);
        setCampos(data?.campos);
      },
    },
  );
  const { loading, data, refetch } = useQuery(
    getProyectoAndLeadGroupConfigsCampos,
    {
      variables: {
        pk: id,
      },
      onCompleted: ({ proyecto }) => {
        setGrupos(proyecto.grupos);
        const grupoUno = proyecto.grupos[activedTab];
        setGrupo(grupoUno);
        fetchCampos({
          variables: { groupId: grupoUno.id },
        });
      },
      notifyOnNetworkStatusChange: true,
    },
  );

  const methods = useForm({ mode: 'onChange' });

  const layout = useLayoutActions();

  const [grupos, setGrupos] = useState([]);
  const [grupo, setGrupo] = useState(null);
  const [camposPadre, setCamposPadre] = useState([]);
  const [campos, setCampos] = useState([]);

  const [activedTab, setActivedTab] = useState(0);

  const [isShowing, setShowing] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const { privateApi } = useAxios();

  const addMutation = useMutation((formData) =>
    privateApi.post(createConfigCamposLeadUrl, formData),
  );

  const updateMutation = useMutation((formData: any) =>
    privateApi.put(updateConfigCamposLeadUrl(formData?.id), formData),
  );

  const deleteMutation = useMutation((id: any) =>
    privateApi.delete(deleteConfigCamposLeadUrl(id)),
  );
  const idGrupo = methods.watch('id', 'ID_POR_DEFECTO');

  const isLoading =
    loading ||
    loadingCampos ||
    addMutation.isLoading ||
    updateMutation.isLoading ||
    deleteMutation.isLoading;

  useEffect(() => {
    layout.setLayout({
      head: {
        proyecto: data?.proyecto?.titulo,
        title: 'Config. campos',
      },
      breadCrumb: {
        items: [
          [data?.proyecto?.titulo || 'Proyecto', Router.update(id)],
          ['Config. estados', Router.configEstados(id)],
          ['Config. leads', Router.configLeadGroups(id)],
          ['Config. campos'],
        ],
      },
    });
  }, [loading]);

  const camposMapper = (grupo) => (campo) => {
    return (
      <React.Fragment key={campo.id}>
        <Tooltip target={`.campo__${campo.id}`} mouseTrack mouseTrackLeft={10}>
          <h6>{campo.titulo}</h6>
          <p className="m-0 p-0">{campo.descripcion}</p>
        </Tooltip>
        <li key={campo.nombre} className="d-flex">
          <HrefButton
            className="align-self-center"
            text
            sm
            outlined
            rounded
            variant="danger"
            icon={PrimeIcons.TRASH}
            onClick={onClickDelete(campo)}
          />
          <HrefButton
            className="align-self-center"
            text
            sm
            outlined
            rounded
            icon={PrimeIcons.COG}
            onClick={onClickUpdate(grupo, campo)}
          />

          <strong
            className={`campo__${campo.id} align-self-center cursor-pointer `}
          >
            {campo.nombre}
          </strong>
        </li>
        {campo.subCampos?.length > 0 && (
          <ul className="list-none ml-0 pl-5">
            {campo.subCampos?.map?.(camposMapper(grupo))}
          </ul>
        )}
      </React.Fragment>
    );
  };

  const onSubmitConfig = async (formData) => {
    formData.configuracion = grupo.id;
    if (isUpdate) {
      await updateMutation.mutateAsync(formData);
    } else {
      await addMutation.mutateAsync(formData);
    }
    await refetch();
    setShowing(false);
    setIsUpdate(false);
  };

  const onClickAdd = (config) => () => {
    setShowing(true);
    setCamposPadre(config?.camposPadre || []);
    setGrupo(config);
    methods.reset({});
  };

  const onHide = () => {
    setShowing(false);
    methods.reset({});
  };

  const onClickUpdate = (grupo, campo) => () => {
    setIsUpdate(true);
    setGrupo(grupo);
    setShowing(true);
    console.log(campo);
    methods.reset({
      ...campo,
      padre: campo?.padreId,
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
          onClick={onHide}
          loading={isLoading}
        />
        <HrefButton
          outlined
          label="Guardar"
          icon={PrimeIcons.SAVE}
          onClick={methods.handleSubmit(onSubmitConfig)}
          loading={isLoading}
        />
      </React.Fragment>
    );
  };

  const onConfirmDelete = (campo) => async () => {
    await deleteMutation.mutateAsync(campo.id);
    await refetch();
  };

  const onClickDelete = (campo) => (event) => {
    confirmPopup({
      target: event.target,
      message: 'Esta seguro de eliminar este campo?',
      icon: PrimeIcons.EXCLAMATION_TRIANGLE,
      accept: onConfirmDelete(campo),
      acceptLabel: 'SI',
      acceptClassName: 'p-button-danger',
      acceptIcon: PrimeIcons.TRASH,
      rejectIcon: PrimeIcons.TIMES,
    });
  };
  return (
    <React.Fragment>
      <HrefButton
        icon={PrimeIcons.REFRESH}
        label="Recargar"
        outlined
        onClick={() => refetch()}
        loading={loading}
      />
      <div className="col-12">
        {!loading && (
          <TabView
            activeIndex={activedTab}
            onTabChange={(e) => {
              fetchCampos({
                variables: {
                  groupId: grupos[e.index].id,
                },
              });
              setActivedTab(e.index);
            }}
            className="border mt-2"
          >
            {!loading &&
              grupos.map((grupo) => (
                <TabPanel key={grupo.label} header={grupo.label}>
                  <div className="grid">
                    <div className="col-12 d-flex flex-wrap justify-content-between mt-2">
                      <h6 className="font-bold align-self-center">
                        {grupo.label}
                      </h6>
                      <div className="p-buttonset">
                        <HrefButton
                          outlined
                          label="Recargar campos"
                          sm
                          icon={PrimeIcons.REFRESH}
                          loading={isLoading}
                          onClick={() =>
                            fetchCampos({ variables: { groupId: grupo.id } })
                          }
                        />
                        <HrefButton
                          outlined
                          label="Agregar campo"
                          sm
                          icon={PrimeIcons.PLUS}
                          loading={isLoading}
                          onClick={onClickAdd(grupo)}
                        />
                      </div>
                    </div>
                    <div className="col-12">
                      <h5 className="w-100">Campos configurados:</h5>
                      {!loadingCampos && campos?.map?.(camposMapper(grupo))}
                      {loadingCampos && <LoadingSpinner />}
                    </div>
                  </div>
                </TabPanel>
              ))}
          </TabView>
        )}
      </div>
      {loading && (
        <div className="col-12 text-center">
          <LoadingSpinner />
        </div>
      )}

      <FormProvider {...methods}>
        <Dialog
          header="Formulario de configuración"
          visible={isShowing}
          className="w-100 sm:w-8 xl:w-5"
          footer={renderFooter()}
          onHide={onHide}
          maximizable
          draggable={false}
          closable={!isLoading}
        >
          {/* Titulo */}
          <Form.FieldWrapper name="titulo" label="Título">
            <Form.ControlledWrapper
              rules={{ required: 'Este campo es obligatorio' }}
            >
              <Form.TextInput />
            </Form.ControlledWrapper>
            <Form.ErrorMessage />
          </Form.FieldWrapper>
          {/* Titulo */}
          <Form.FieldWrapper name="nombre" label="Código">
            <Form.ControlledWrapper>
              <Form.TextInput keyfilter="alpha" />
            </Form.ControlledWrapper>
            <Form.ErrorMessage />
          </Form.FieldWrapper>
          {/* Titulo */}
          <Form.FieldWrapper name="descripcion" label="Descripción">
            <Form.ControlledWrapper>
              <Form.TextArea />
            </Form.ControlledWrapper>
            <Form.ErrorMessage />
          </Form.FieldWrapper>
          {/* Titulo */}
          <Form.FieldWrapper name="tipo" label="Tipo de campo">
            <Form.ControlledWrapper>
              <Form.Select
                options={[
                  {
                    label: 'Texto',
                    value: 'string',
                  },
                  {
                    label: 'Número entero',
                    value: 'entero',
                  },
                  {
                    label: 'Número decimal',
                    value: 'decimal',
                  },
                  {
                    label: 'Texto numerico',
                    value: 'string-number',
                  },
                  {
                    label: 'Lista de textos',
                    value: 'string-list',
                  },
                  {
                    label: 'Lista de numeros enteros',
                    value: 'int-list',
                  },
                  {
                    label: 'Lista de numeros decimales',
                    value: 'decimal-list',
                  },
                  {
                    label: 'Lista de objetos',
                    value: 'object-list',
                  },
                  {
                    label: 'Objeto',
                    value: 'object',
                  },
                ]}
              />
            </Form.ControlledWrapper>
            <Form.ErrorMessage />
          </Form.FieldWrapper>
          {/* Campo Padre */}
          <Form.FieldWrapper name="padre" label="Campo padre">
            <Form.ControlledWrapper>
              <Form.Select
                options={camposPadre.filter(
                  (item) => item.id !== idGrupo && item.padreId !== idGrupo,
                )}
                optionLabel="nombre"
                optionValue="id"
                showClear
              />
            </Form.ControlledWrapper>
          </Form.FieldWrapper>
        </Dialog>
      </FormProvider>

      <FooterButtons
        backHref={Router.configLeadGroups(id)}
        backLabel="Regresar"
        backIsLoading={isLoading}
        nextHref={Router.configLeadCampos(id)}
        nextIsLoading={isLoading}
        nextLabel="Invitar personas al proyecto"
        nextIsDisabled={grupos.length === 0}
      />
    </React.Fragment>
  );
};

export default ConfigCamposLead;
