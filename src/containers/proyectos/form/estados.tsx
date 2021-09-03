/* eslint-disable react-hooks/exhaustive-deps */
import { useQuery } from '@apollo/client';
import BaseButton from '@components/Buttons/BaseButton';
import HrefButton from '@components/Buttons/HrefButton';
import Form from '@components/Form';
import { getProyectoAndEstadosById } from '@graphql/Proyectos/queries.gql';
import useAxios from '@hooks/useAxios';
import useCustomForm from '@hooks/useCustomForm';
import useToasts from '@hooks/useToasts';
import { useLayoutActions } from '@layouts/layout.store';
import Router from '@routes/proyectos.routes';
import { Accordion, AccordionTab } from 'primereact/accordion';
import { PrimeIcons } from 'primereact/api';
import { Dialog } from 'primereact/dialog';
import { ProgressSpinner } from 'primereact/progressspinner';
import React, { useEffect, useMemo, useState } from 'react';
import { FormProvider, useWatch } from 'react-hook-form';
import { useMutation } from 'react-query';
import {
  createEstadoProyectoUrl,
  deleteEstadoProyectoUrl,
  updateEstadoProyectoUrl,
} from 'src/services/urls';

const ConfigEstadoContainer = ({ id }) => {
  const [estados, setEstados] = useState([]);

  const [isUpdate, setIsUpdate] = useState(false);

  const { loading, data, refetch } = useQuery(getProyectoAndEstadosById, {
    variables: { pk: id },
    onCompleted: ({ proyecto }) => {
      setEstados(proyecto?.estados || []);
    },
    notifyOnNetworkStatusChange: true,
  });

  const [showModal, setShowModal] = useState(false);

  const methods = useCustomForm({ mode: 'onChange' });

  const estadoForm = useWatch({
    control: methods.control,
  });

  const { setLayout } = useLayoutActions();

  const { privateApi } = useAxios();

  const mutation = useMutation((formData) =>
    privateApi.post(createEstadoProyectoUrl, formData),
  );

  const updateMutation = useMutation((formData: any) =>
    privateApi.put(updateEstadoProyectoUrl(formData?.id), formData),
  );

  const { addWarningToast } = useToasts();

  useEffect(() => {
    setLayout({
      head: {
        proyecto: data?.proyecto?.titulo,
      },
      breadCrumb: {
        items: [
          [data?.proyecto?.titulo, Router.update(id)],
          ['Configuración de estados'],
        ],
      },
    });
  }, [loading]);

  const headerTemplate = (estado) => {
    return (
      <React.Fragment>
        <h5
          style={{
            backgroundColor: estado.colorFondo,
            color: estado.color,
          }}
          className="px-3 py-1 m-0"
        >
          {estado.orden}. {estado.titulo}
        </h5>
      </React.Fragment>
    );
  };
  const previewEstadoForm = useMemo(() => {
    return headerTemplate(estadoForm);
  }, [estadoForm]);

  const onHideModal = () => {
    setShowModal(false);
    methods.reset();
    methods.clearErrors();
  };

  const renderFooter = () => {
    return (
      <React.Fragment>
        <BaseButton
          variant="danger"
          label="Cancelar"
          icon={PrimeIcons.TIMES}
          onClick={onHideModal}
          loading={mutation.isLoading}
        />
        <BaseButton
          label="Guardar"
          icon={PrimeIcons.SAVE}
          onClick={methods.handleSubmit(onSubmitEstado)}
          loading={mutation.isLoading}
        />
      </React.Fragment>
    );
  };

  const validarColor = (color: string) => {
    if (color.startsWith('#')) {
      return color;
    }
    return `#${color}`;
  };

  const onSubmitEstado = async (formData) => {
    formData.proyecto = id;
    formData.color = validarColor(formData.color);
    formData.colorFondo = validarColor(formData.colorFondo);
    formData.estadoPadre = formData?.estadoPadre || null;
    if (isUpdate) {
      await updateMutation.mutateAsync(formData);
    } else {
      await mutation.mutateAsync(formData);
    }

    await refetch();
    methods.reset();
    setShowModal(false);
    setIsUpdate(false);
  };

  const selectTemplate = (item?: any) => (
    <strong
      className="m-0 p-0 px-3 text-lg"
      style={{
        color: item?.color,
        backgroundColor: item?.colorFondo,
      }}
    >
      {item?.titulo}
    </strong>
  );

  const onDeleteEstado = (estado: any) => async () => {
    await privateApi.delete(deleteEstadoProyectoUrl(estado?.id));
    await refetch();

    addWarningToast(`Se ha borrado el estado: ${estado.titulo}`);
  };

  const onClickEdit = (estado: any) => () => {
    setIsUpdate(true);
    methods.reset({
      ...estado,
      estadoPadre: estado?.estadoPadre?.id,
    });
    setShowModal(true);
  };

  return (
    <React.Fragment>
      <div className="d-flex flex-wrap justify-content-between mb-3">
        <BaseButton
          label="Agregar nuevo estado"
          className="rounded-0"
          icon={PrimeIcons.PLUS}
          onClick={() => setShowModal(true)}
        />
        <BaseButton
          variant="info"
          label="Recargar estados"
          className="rounded-0"
          icon={PrimeIcons.REFRESH}
          onClick={() => refetch()}
          loading={loading}
        />
      </div>

      {!loading && (
        <Accordion>
          {estados.map((estado) => (
            <AccordionTab
              key={estado.id}
              headerClassName="border"
              headerTemplate={headerTemplate(estado)}
            >
              <div className="d-flex justify-content-between">
                <div className="border-right border-end w-100">
                  <h5>Descripción:</h5>
                  <p>{estado.descripcion}</p>
                </div>
                <div className="align-self-center justify-content-center d-flex flex-wrap">
                  <BaseButton
                    variant="danger"
                    icon={PrimeIcons.TRASH}
                    sm
                    onClick={onDeleteEstado(estado)}
                  />
                  <BaseButton
                    variant="info"
                    icon={PrimeIcons.PENCIL}
                    sm
                    onClick={onClickEdit(estado)}
                  />
                </div>
              </div>
              <h5>Sub estados:</h5>
              <ul className="list-group w-100">
                {estado.estados.map((subEstado) => (
                  <li className="list-group-item py-0 px-0" key={subEstado.id}>
                    <div className="d-flex w-100 justify-content-between">
                      <div className="border-end w-100">
                        {headerTemplate({
                          ...subEstado,
                          orden: `${estado.orden}.${subEstado.orden}`,
                        })}

                        <p className="pl-3 text-justify pr-3">
                          {subEstado.descripcion}
                        </p>
                      </div>
                      <div className="align-self-center mx-3 ml-md-3 d-flex flex-column">
                        <BaseButton
                          variant="danger"
                          icon={PrimeIcons.TRASH}
                          className="my-2"
                          sm
                          onClick={onDeleteEstado(subEstado)}
                        />
                        <BaseButton
                          variant="info"
                          sm
                          icon={PrimeIcons.PENCIL}
                          onClick={onClickEdit(subEstado)}
                        />
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </AccordionTab>
          ))}
        </Accordion>
      )}
      {loading && (
        <div className="col-12 text-center my-7">
          <ProgressSpinner />
          <h5>Buscando estados...</h5>
        </div>
      )}

      <FormProvider {...methods}>
        <Dialog
          header="Configuración de estado"
          visible={showModal}
          className="w-100 sm:w-8 xl:w-5"
          footer={renderFooter()}
          onHide={onHideModal}
          maximizable
          draggable={false}
          closable={!mutation.isLoading}
        >
          {/* Estado Padre */}
          <Form.FieldWrapper name="estadoPadre" label="Estado padre (Opcional)">
            <Form.ControlledWrapper>
              <Form.Select
                options={estados.filter((item) => item?.id != estadoForm.id)}
                optionLabel="titulo"
                itemTemplate={selectTemplate}
                showClear
                optionValue="id"
                placeholder="Seleccione un estado padre"
              />
            </Form.ControlledWrapper>
          </Form.FieldWrapper>
          {/* Titulo */}
          <Form.FieldWrapper name="titulo" label="Título">
            <Form.ControlledWrapper
              defaultValue=""
              rules={{ required: 'Este campo es obligatorio' }}
            >
              <Form.TextInput />
            </Form.ControlledWrapper>
            <Form.ErrorMessage />
          </Form.FieldWrapper>
          {/* Descripcion */}
          <Form.FieldWrapper name="descripcion" label="Descripción">
            <Form.ControlledWrapper
              defaultValue=""
              rules={{ required: 'Este campo es obligatorio' }}
            >
              <Form.TextArea />
            </Form.ControlledWrapper>
            <Form.ErrorMessage />
          </Form.FieldWrapper>

          <div className="md:w-2">
            <Form.FieldWrapper name="orden" label="Orden">
              <Form.ControlledWrapper
                defaultValue={1}
                rules={{ required: 'Este campo es obligatorio' }}
              >
                <Form.NumberInput showButtons min={1} />
              </Form.ControlledWrapper>
              <Form.ErrorMessage />
            </Form.FieldWrapper>
          </div>

          <div className="d-flex justify-content-between">
            {/* Color */}
            <Form.FieldWrapper
              name="color"
              label="Seleccione un color de letra"
            >
              <Form.ControlledWrapper
                defaultValue="000000"
                rules={{
                  required: 'Este campo es obligatorio',
                }}
              >
                <input type="color" id="color" />
              </Form.ControlledWrapper>
              <Form.ErrorMessage />
            </Form.FieldWrapper>
            {/* Color Fondo */}
            <Form.FieldWrapper
              name="colorFondo"
              label="Seleccione un color de fondo de letra"
            >
              <Form.ControlledWrapper
                defaultValue="ffffff"
                rules={{
                  required: 'Este campo es obligatorio',
                }}
              >
                <input type="color" id="colorFondo" />
              </Form.ControlledWrapper>
              <Form.ErrorMessage />
            </Form.FieldWrapper>
          </div>
          {/* PREVIEW */}
          <div className="d-flex text-center justify-content-center">
            {previewEstadoForm}
          </div>
        </Dialog>
      </FormProvider>

      <div className="col-12 card pt-4 pb-3 px-4 md:mt-4">
        <div className="grid justify-content-around">
          <HrefButton
            className="col-12 md:col-3 my-1"
            href={Router.update(id)}
            variant="danger"
            label="Regresar"
          />
          <BaseButton
            className="col-12 md:col-3 my-1"
            label="Configurar grupos de leads"
          />
        </div>
      </div>
    </React.Fragment>
  );
};

export default ConfigEstadoContainer;
